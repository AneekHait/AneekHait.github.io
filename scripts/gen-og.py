"""Generate the 1200x630 Open Graph card at public/og.png.

Run from the repository root:
    python scripts/gen-og.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og.png"

WIDTH = 1200
HEIGHT = 630

# Terminal Ledger palette, kept in sync with src/styles/tokens.css.
BG = (10, 11, 10)
FG = (230, 233, 225)
FG_MUTED = (168, 173, 161)
FG_DIM = (118, 123, 112)
RULE = (38, 42, 36)
ACCENT = (255, 176, 0)

# Candidates are tried in order; the first file that exists wins.
SANS_BOLD_CANDIDATES = (
    "C:/Windows/Fonts/segoeuib.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
)
SANS_CANDIDATES = (
    "C:/Windows/Fonts/segoeui.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
)
MONO_CANDIDATES = (
    "C:/Windows/Fonts/consola.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    "/System/Library/Fonts/Menlo.ttc",
)


def load_font(candidates: tuple[str, ...], size: int) -> ImageFont.FreeTypeFont:
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    raise FileNotFoundError(
        f"No usable font found. Tried: {', '.join(candidates)}. "
        "Add a path for this platform to the candidate list."
    )


def draw_card() -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(image)

    mono_sm = load_font(MONO_CANDIDATES, 20)
    mono_xs = load_font(MONO_CANDIDATES, 17)
    name_font = load_font(SANS_BOLD_CANDIDATES, 96)
    tagline_font = load_font(SANS_BOLD_CANDIDATES, 46)
    body_font = load_font(SANS_CANDIDATES, 24)

    left = 72
    right = WIDTH - 72

    draw.rectangle((0, 0, WIDTH, 6), fill=ACCENT)

    draw.text((left, 66), "DATA & BI ANALYST", font=mono_sm, fill=ACCENT)
    draw.text((right - 200, 66), "KOLKATA, INDIA", font=mono_sm, fill=FG_DIM)
    draw.line((left, 108, right, 108), fill=RULE, width=1)

    draw.text((left, 142), "Aneek Hait", font=name_font, fill=FG)
    draw.text((left, 272), "Complex data, made", font=tagline_font, fill=FG)
    draw.text((left, 328), "clear enough to act on.", font=tagline_font, fill=ACCENT)

    # Static rendering of the hero's blinking caret.
    caret_x = left + draw.textlength("clear enough to act on.", font=tagline_font) + 12
    draw.rectangle((caret_x, 330, caret_x + 13, 372), fill=ACCENT)

    draw.text((left, 418), "Dashboards / Analysis / Reporting", font=body_font, fill=FG_MUTED)

    draw.line((left, 496, right, 496), fill=RULE, width=1)
    entries = (("01", "SELECTED WORK"), ("02", "EXPERIENCE"), ("03", "TOOLKIT"), ("04", "NOTES"))
    column_x = left
    for index, label in entries:
        draw.text((column_x, 524), index, font=mono_xs, fill=ACCENT)
        draw.text((column_x, 552), label, font=mono_xs, fill=FG_DIM)
        column_x += 235

    return image


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    card = draw_card()
    card.save(OUT, format="PNG", optimize=True)
    print(f"Wrote {OUT.relative_to(ROOT)} {card.width}x{card.height} {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()