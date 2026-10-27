# The English Circle — Practice pages

Static website prepared for https://github.com/giucin/TheEnglishCircleGB

## Publish on GitHub Pages

1. Extract TheEnglishCircleGB_website.zip on your computer.
2. Open your repository: https://github.com/giucin/TheEnglishCircleGB
3. Choose **Add file → Upload files** (on an empty repository, use **uploading an existing file**).
4. Upload the CONTENTS of the extracted website folder: index.html, assets, foundations, README.md and .nojekyll. Keep the folders intact. Do not upload the ZIP itself, and do not wrap everything in another folder. index.html must be at the repository root.
5. Click **Commit changes**.
6. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then branch **main**, folder **/(root)**, and **Save**.
7. Wait for GitHub to show the published site link. Expected URL after successful deployment: https://giucin.github.io/TheEnglishCircleGB/

Direct Nouns practice link after deployment:
https://giucin.github.io/TheEnglishCircleGB/foundations/nouns.html

## What is included

- index.html: homepage with a collapsed Foundations Boot Camp course menu and future level sections.
- foundations/nouns.html: video and interactive practice based on U02_L01_Nouns_Practice.pdf.
- assets/style.css: shared visual design.
- assets/nouns.js: immediate feedback, progress, score, answer key, reset and browser-local persistence.
- assets/*.webp: optimized supplied branding and illustrations extracted from the source worksheet.
- assets/home.js: homepage course-menu behavior.
- assets/video.js: hosted YouTube embed and local-file watch-link fallback.

The 10 scored questions follow the source PDF. The personal activity is adapted for typing, speaking and optional drawing on paper; it is not automatically scored. No registration, data submission, analytics or teacher dashboard is included. Browser storage saves answers only on the current browser/device, where permitted. The YouTube embed loads third-party content and requires internet access.

## Add another lesson

Create a new HTML file in foundations/ using the Nouns page as a layout reference. Give it its own activity script and unique browser-storage key. Add a lesson card inside #foundations-course .course-content in index.html and update the available-lesson count. There are 72 planned Foundations lessons in total. As the collection grows, group lesson links inside additional unit menus rather than rendering all 72 full cards. Other levels have their own future sections; turn each into a course menu when its first lesson is ready. Add previous/next links once both lessons exist. Use relative paths so this site works beneath /TheEnglishCircleGB/.

## Update existing pages

Upload only changed files and any new assets to the SAME repository and paths, then commit. Keep lesson filenames unchanged to preserve shared links. Changes publish through GitHub Pages once enabled.

## Video previews

YouTube error 153 indicates missing client identification (HTTP Referer). A local file preview has no HTTP(S) page origin, so it shows a direct YouTube watch link instead of attempting an unsupported embed. Published HTTP(S) pages load the embedded player with strict-origin-when-cross-origin referrer policy. The direct YouTube link is always available if browser privacy settings or another restriction prevents playback. Do not use the local-file preview to verify embedded playback; test on the GitHub Pages URL after publishing.

## Updating from the first version

Upload these new files over the old ones in the same repository. The PDF and its download links have been removed from this package. If you already uploaded the previous version to GitHub, uploading alone does not delete old files: remove downloads/U02_L01_Nouns_Practice.pdf from the repository to reclaim its space. The old assets/*.png are also no longer referenced and can be removed; keep the new WebP files.
