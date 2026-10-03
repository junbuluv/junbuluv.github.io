# Session log — 2026-10-03 — new headshot

## Goal
Swap the homepage portrait for the new outdoor photo
(`~/Downloads/headshot_outdoor_no_glare.png`) at the same on-page size.

## Decisions
- No interview needed: the source is 2540×3176, which is 4:5 to within one pixel,
  so it fills the existing 280×350 box without any extra cropping.
- Same file name (`public/headshot.jpg`), so the portrait, `og:image`, and
  JSON-LD `image` all update with no markup change.
- The source PNG has no color profile, so the JPEG is tagged sRGB. The old
  file was tagged Display P3.

## Shipped (main ffd8eac; site deployed to gh-pages)
- ffd8eac Center-crop to 2540×3175, Lanczos to 800×1000, JPEG q88
  progressive with an sRGB ICC profile (90 KB; the old file was 225 KB).

## Verification
typecheck 0 errors; build clean; preview at 1280×900: the box is still
280×350 and the image's natural size is 800×1000; the live
`/headshot.jpg` SHA-1 matched the local file about 30 s after deploy.

## Follow-up
- Social previews (LinkedIn etc.) cache `og:image` by URL. Re-scrape with
  LinkedIn Post Inspector if an old preview shows up.
