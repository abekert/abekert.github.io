"""Check local HTML/SVG links, fragments, CSS assets, manifests and sitemaps.

No network is required. Use --external for a separate, live check of outgoing
HTML links (third-party availability and anti-bot responses can vary).
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urljoin, urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

ORIGIN = "https://abekert.github.io"
ROOT = Path(__file__).resolve().parents[1]
IGNORED = {".git", "node_modules", "test-results", "playwright-report"}


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.references = []
        self.ids = set()
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for key in ("href", "src", "poster", "xlink:href"):
            if attrs.get(key):
                self.references.append((attrs[key], tag == "a"))
        if attrs.get("srcset"):
            self.references.extend((item.strip().split()[0], False)
                                   for item in attrs["srcset"].split(",") if item.strip())


def check(root):
    files = {p.relative_to(root).as_posix(): p for p in root.rglob("*")
             if p.is_file() and not IGNORED.intersection(p.relative_to(root).parts)}
    documents = {name: Document(path.read_text()) for name, path in files.items()
                 if path.suffix in (".html", ".svg")}
    errors, external = [], set()
    count = 0
    for name, path in files.items():
        references = []
        if name in documents:
            references = documents[name].references
        elif path.suffix == ".css":
            references = [(m.group(1).strip("\"' "), False)
                          for m in re.finditer(r"url\(\s*([^)]*?)\s*\)", path.read_text())]
        elif path.suffix == ".webmanifest":
            manifest = json.loads(path.read_text())
            references = [(item["src"], False) for item in manifest.get("icons", [])]
            if "start_url" in manifest:
                references.append((manifest["start_url"], False))
        elif path.name == "sitemap.xml":
            references = [(node.text, False) for node in ET.parse(path).iter()
                          if node.tag.endswith("}loc") and node.text]

        for value, is_link in references:
            if value.startswith("#") and path.suffix == ".css":
                continue  # SVG filter/paint IDs belong to the containing document.
            url = urlsplit(urljoin(ORIGIN + "/" + name, value))
            if url.scheme not in ("http", "https"):
                continue
            if url.netloc != urlsplit(ORIGIN).netloc:
                if is_link:
                    external.add(url.geturl())
                continue
            target = unquote(url.path).lstrip("/")
            if not target or target.endswith("/"):
                target += "index.html"
            count += 1
            if target not in files:
                errors.append(f"{name}: missing file or incorrect case: {value}")
            elif url.fragment and target in documents and not url.fragment.startswith(":~:text="):
                if unquote(url.fragment) not in documents[target].ids:
                    errors.append(f"{name}: missing fragment: {value}")
    return count, errors, external


def check_external(url):
    try:
        with urlopen(Request(url, headers={"User-Agent": "Site-link-check/1.0"}), timeout=15) as response:
            if "suspendedpage.cgi" in response.url:
                return f"{url}: redirects to a suspended hosting page"
    except Exception as error:
        return f"{url}: {error}"
    return None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--external", action="store_true")
    options = parser.parse_args()
    count, errors, external = check(ROOT)
    print(f"Checked {count} internal references (including srcset, CSS and fragments).")
    if options.external:
        with ThreadPoolExecutor(max_workers=4) as pool:
            errors.extend(filter(None, pool.map(check_external, sorted(external))))
    for error in errors:
        print(error, file=sys.stderr)
    sys.exit(bool(errors))
