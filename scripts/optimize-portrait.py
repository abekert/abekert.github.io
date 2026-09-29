"""Regenerate responsive portrait assets with ImageMagick (AVIF/WebP support)."""
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
with tempfile.TemporaryDirectory(prefix="portrait-") as temporary:
    for size in (320, 640, 960, 1600):
        source = Path(temporary) / f"{size}.png"
        subprocess.run(["magick", str(ROOT / "images/alexander-bekert.jpg"),
                        "-auto-orient", "-resize", f"{size}x{size}", "-strip", str(source)], check=True)
        for extension, quality in (("avif", "55"), ("webp", "82")):
            output = ROOT / f"images/alexander-bekert-{size}.{extension}"
            subprocess.run(["magick", str(source), "-quality", quality, str(output)], check=True)
            print(f"{output.name}: {output.stat().st_size} bytes")
