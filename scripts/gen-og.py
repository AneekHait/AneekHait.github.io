"""
Generates assets/og.png — the 1200x630 Open Graph / Twitter card for the portfolio.
Run from repo root:  python scripts/gen-og.py
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "og.png"
PHOTO = ROOT / "assets" / "pp.png"

W, H = 1200, 630

# Portfolio palette
BG_TOP = (252, 247, 239)         # #fcf7ef
BG_BOT = (235, 223, 203)         # #ebdfcb
ACCENT = (213, 103, 67)          # #d56743
ACCENT_DEEP = (159, 61, 33)      # #9f3d21
TEXT = (23, 19, 17)              # #171311
MUTED = (77, 70, 64)             # #4d4640

# Windows-resident substitutes (Fraunces -> Georgia, Space Grotesk -> Segoe UI)
FONT_DISPLAY_BOLD = "C:/Windows/Fonts/georgiab.ttf"
FONT_BODY_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_BODY = "C:/Windows/Fonts/segoeui.ttf"


def gradient_bg() -> Image.Image:
    """Vertical warm cream gradient + soft terracotta radial glow top-left."""
    img = Image.new("RGB", (W, H), BG_TOP)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        r = int(BG_TOP[0] * (1 - t) + BG_BOT[0] * t)
        g = int(BG_TOP[1] * (1 - t) + BG_BOT[1] * t)
        b = int(BG_TOP[2] * (1 - t) + BG_BOT[2] * t)
        for x in range(W):
            px[x, y] = (r, g, b)

    # Soft radial accent glow — terracotta in top-left, teal hint in bottom-right
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-280, -300, 520, 500), fill=(213, 103, 67, 38))
    gd.ellipse((W - 480, H - 360, W + 240, H + 360), fill=(14, 123, 114, 28))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    return img


def circular_photo(size: int) -> Image.Image:
    """Crop pp.png into a circle of given diameter with a soft ring."""
    src = Image.open(PHOTO).convert("RGBA")
    # Square-crop centered
    s = min(src.size)
    src = src.crop(((src.width - s) // 2, (src.height - s) // 2,
                    (src.width + s) // 2, (src.height + s) // 2))
    src = src.resize((size, size), Image.LANCZOS)

    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)

    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(src, (0, 0), mask)
    return out


def draw_card() -> Image.Image:
    img = gradient_bg().convert("RGBA")
    d = ImageDraw.Draw(img)

    f_eyebrow = ImageFont.truetype(FONT_BODY_BOLD, 24)
    f_name = ImageFont.truetype(FONT_DISPLAY_BOLD, 104)
    f_tagline = ImageFont.truetype(FONT_DISPLAY_BOLD, 56)
    f_footer = ImageFont.truetype(FONT_BODY, 22)
    f_url = ImageFont.truetype(FONT_BODY_BOLD, 22)

    pad_x = 80
    text_top = 150

    # Eyebrow: accent bar + label
    bar_w, bar_h = 56, 4
    bar_y = text_top + 12
    d.rectangle((pad_x, bar_y, pad_x + bar_w, bar_y + bar_h),
                fill=ACCENT)
    d.text((pad_x + bar_w + 18, text_top), "DATA & BI ANALYST",
           font=f_eyebrow, fill=MUTED, spacing=4)

    # Name
    d.text((pad_x, text_top + 60), "Aneek Hait", font=f_name, fill=TEXT)

    # Tagline (two lines)
    tagline_y = text_top + 220
    d.text((pad_x, tagline_y),
           "From noisy datasets to",
           font=f_tagline, fill=TEXT)
    d.text((pad_x, tagline_y + 70),
           "stories people can trust.",
           font=f_tagline, fill=ACCENT_DEEP)

    # Footer: URL on left, role line on right
    foot_y = H - 70
    d.text((pad_x, foot_y), "aneekhait.github.io",
           font=f_url, fill=TEXT)
    skills = "Tableau  ·  Power BI  ·  Python  ·  SQL"
    sw = d.textlength(skills, font=f_footer)
    d.text((W - pad_x - sw, foot_y + 1), skills,
           font=f_footer, fill=MUTED)

    # Circular profile photo — right side, vertically centered
    photo_d = 360
    photo = circular_photo(photo_d)
    px = W - pad_x - photo_d
    py = (H - photo_d) // 2 - 10

    # Soft drop-shadow under photo
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.ellipse((px + 8, py + 14, px + photo_d + 8, py + photo_d + 14),
               fill=(72, 45, 11, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    img = Image.alpha_composite(img, shadow)

    # White / surface ring around the photo
    ring = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    ring_pad = 8
    rd.ellipse((px - ring_pad, py - ring_pad,
                px + photo_d + ring_pad, py + photo_d + ring_pad),
               fill=(253, 247, 236, 255))
    img = Image.alpha_composite(img, ring)

    img.paste(photo, (px, py), photo)

    return img.convert("RGB")


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    card = draw_card()
    card.save(OUT, format="PNG", optimize=True)
    size_kb = OUT.stat().st_size / 1024
    print(f"Wrote {OUT.relative_to(ROOT)}  {W}x{H}  {size_kb:.1f} KB")


if __name__ == "__main__":
    main()
