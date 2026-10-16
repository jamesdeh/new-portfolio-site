# subsets the geist fonts from handoff/fonts into public/fonts
# latin, latin extended-a (te reo macrons), punctuation, arrows and the command key
# run: python -m pip install fonttools brotli, then python scripts/subset-fonts.py
from fontTools import subset

UNICODES = "U+0020-007E,U+00A0-00FF,U+0100-017F,U+2010-2027,U+2030-203A,U+20AC,U+2122,U+2190-21BB,U+2318"
FONTS = ["Geist-Variable.woff2", "GeistMono-Variable.woff2", "GeistPixel-Square.woff2"]

for name in FONTS:
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    font = subset.load_font(f"handoff/fonts/{name}", opts)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(UNICODES))
    sub.subset(font)
    subset.save_font(font, f"public/fonts/{name}", opts)
    print("subset", name)
