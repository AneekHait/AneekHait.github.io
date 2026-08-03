"""Generate the 1200x630 Open Graph card at assets/og.png.

Run from the repository root:
    python scripts/gen-og.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "og.png"

WIDTH = 1200
HEIGHT = 630

INK = (21, 23, 22)
PAPER = (243, 240, 232)
MUTED = (194, 196, 188)
CORAL = (240, 100, 69)
TEAL = (25, 167, 155)
CHARTREUSE = (199, 223, 62)
GRID = (255, 255, 255, 24)

FONT_DISPLAY_BOLD = "C:/Windows/Fonts/georgiab.ttf"
FONT_BODY_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_BODY = "C:/Windows/Fonts/segoeui.ttf"


def draw_card() -> Image.Image:
    image = Image.new("RGB", (WIDTH, HEIGHT), INK)
    draw = ImageDraw.Draw(image, "RGBA")

    for x in range(700, WIDTH, 48):
        draw.line((x, 0, x, HEIGHT), fill=GRID, width=1)
    for y in range(0, HEIGHT, 48):
        draw.line((700, y, WIDTH, y), fill=GRID, width=1)

    draw.rectangle((1178, 0, 1200, 226), fill=CHARTREUSE)
    draw.rectangle((822, 608, 1200, 630), fill=CORAL)
    draw.text((742, 48), "SIGNAL MAP / 2026", font=ImageFont.truetype(FONT_BODY_BOLD, 18), fill=MUTED)
    chart_left, chart_top, chart_right, chart_bottom = 756, 116, 1138, 500
    draw.line((chart_left, chart_top, chart_left, chart_bottom), fill=(255, 255, 255, 105), width=2)
    draw.line((chart_left, chart_bottom, chart_right, chart_bottom), fill=(255, 255, 255, 105), width=2)

    bar_heights = (108, 214, 166, 292, 246, 356)
    bar_colors = (CORAL, TEAL, CHARTREUSE, CORAL, TEAL, CHARTREUSE)
    for index, (bar_height, color) in enumerate(zip(bar_heights, bar_colors)):
        bar_left = chart_left + 34 + index * 56
        bar_right = bar_left + 28
        bar_top = chart_bottom - bar_height
        draw.rectangle((bar_left, bar_top, bar_right, chart_bottom), fill=(255, 255, 255, 24))
        draw.line((bar_left - 8, bar_top, bar_right + 8, bar_top), fill=color, width=5)
        marker_x = (bar_left + bar_right) // 2
        draw.rectangle((marker_x - 7, bar_top - 7, marker_x + 7, bar_top + 7), fill=color, outline=INK, width=2)

    legend_font = ImageFont.truetype(FONT_BODY_BOLD, 15)
    legend_items = (("ANALYSIS", CORAL), ("SYSTEMS", TEAL), ("ACTION", CHARTREUSE))
    legend_x = chart_left
    for label, color in legend_items:
        draw.rectangle((legend_x, 532, legend_x + 10, 542), fill=color)
        draw.text((legend_x + 18, 526), label, font=legend_font, fill=MUTED)
        legend_x += 122

    eyebrow_font = ImageFont.truetype(FONT_BODY_BOLD, 22)
    name_font = ImageFont.truetype(FONT_DISPLAY_BOLD, 86)
    statement_font = ImageFont.truetype(FONT_DISPLAY_BOLD, 48)
    body_font = ImageFont.truetype(FONT_BODY, 23)
    metric_font = ImageFont.truetype(FONT_BODY_BOLD, 19)

    left = 68
    draw.rectangle((left, 72, left + 52, 77), fill=CORAL)
    draw.text((left + 70, 58), "DATA & BI ANALYST", font=eyebrow_font, fill=MUTED)
    draw.text((left, 116), "Aneek Hait", font=name_font, fill=PAPER)

    draw.text((left, 238), "Complex data, made", font=statement_font, fill=PAPER)
    draw.text((left, 294), "clear enough to act on.", font=statement_font, fill=CHARTREUSE)

    draw.text((left, 382), "Dashboards  /  Analysis  /  Reporting", font=body_font, fill=MUTED)
    draw.text((left, 422), "Kolkata, India", font=body_font, fill=MUTED)

    metric_y = 526
    draw.line((left, metric_y - 24, 650, metric_y - 24), fill=(255, 255, 255, 70), width=1)
    metrics = (("4+", "YEARS"), ("100+", "DATASETS"), ("7", "CREDENTIALS"))
    metric_x = left
    for value, label in metrics:
        draw.text((metric_x, metric_y), value, font=metric_font, fill=PAPER)
        draw.text((metric_x + 54, metric_y + 2), label, font=metric_font, fill=MUTED)
        metric_x += 190

    return image


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    card = draw_card()
    card.save(OUT, format="PNG", optimize=True)
    print(f"Wrote {OUT.relative_to(ROOT)} {card.width}x{card.height} {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()