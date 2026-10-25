# Maximiliano Sá — Portfolio

A responsive personal portfolio built with HTML, CSS, and vanilla JavaScript. It presents my background, projects, experience, and ways to get in touch. The site is static and deploys directly to GitHub Pages without a build step or backend.

**Live site:** [maxsa2004.github.io/Portfolio_Maximiliano_Sa](https://maxsa2004.github.io/Portfolio_Maximiliano_Sa/)

## Project structure

```text
index.html                    Portfolio page and content structure
privacy.html                  Privacy notice and analytics preferences
css/style.css                 Layout, themes, responsive styles, animations
js/profile.js                 Editable profile and portfolio content
js/main.js                    Page rendering, navigation, theme controls
js/github.js                  Public GitHub repository integration
js/analytics.js               GA4 consent and page-view logic
assets/CV_ Maximiliano_Sá.pdf Downloadable CV
assets/og-image.png            Social-sharing preview (1200 × 630)
assets/favicon.svg             Site icon
```

## Edit profile information

Most portfolio content is defined in `js/profile.js`. Update the profile, headline, biography, education, experience, activities, skills, certifications, featured projects, and public contact links there. The same file configures the CV path and GitHub repository display.

The color theme follows the visitor's system preference by default. The theme control can switch to a manual dark or light theme, saved in that browser's local storage.

## Social-sharing preview

The homepage Open Graph and Twitter metadata point to `assets/og-image.png` at the canonical GitHub Pages URL. To replace it, use a PNG that is exactly 1200 × 630 pixels and save it at the same path. The asset is served directly from this repository; no external image host or build step is needed.

## CV

The download link uses `cvPath` in `js/profile.js`. Replace `assets/CV_ Maximiliano_Sá.pdf` or update that setting to point to another relative asset path. URL-encode spaces and accented characters in the configured path.

## Projects and GitHub integration

Featured projects are configured in `featuredProjects` in `js/profile.js`. The repository section requests public repository data from GitHub's unauthenticated API for `MaxSa2004`, then filters and sorts the results for display. It uses no token. Repository selection and display options can be adjusted in the `github` settings in `profile.js`. If the API is unavailable or rate-limited, the page provides a link to the GitHub profile instead.

The GitHub API request is independent of analytics consent. The public [privacy notice](privacy.html) describes this request and the site's optional analytics.

## Pac-Man background animation

The decorative Pac-Man and ghost animation is marked up in `index.html` and styled in `css/style.css`. It ignores pointer input, and the reduced-motion preference disables the moving animation.

## Google Analytics and consent

The site uses Google Analytics 4 (GA4) with Measurement ID `G-8SV2XYRRH7`. The ID is public configuration, not an API secret. The tag loads only after a visitor explicitly accepts analytics. Visitors can reject analytics or reopen **Cookie preferences** in the footer to withdraw consent; withdrawal blocks further analytics collection. The choice is stored locally in the browser under `portfolio-analytics-consent-v1`.

The implementation keeps advertising-related consent denied and sends one explicit `page_view` after acceptance (`send_page_view: false` prevents the tag config from sending an automatic initial page view). In the GA4 web stream, review the **Page views** option under Enhanced Measurement if it is enabled, because it can provide another source of page-view events. Outbound-click and file-download measurement are separate Enhanced Measurement options; their settings do not control this site's explicit page-view event.

Before consent, this integration does not load the Google tag or send Google Analytics requests. The public GitHub API request described above may still occur. See [`privacy.html`](privacy.html) for the visitor-facing notice and the available consent controls. This documentation describes the implementation and is not a legal compliance determination.

## Run locally

Serve the project over HTTP so browser JavaScript modules work. From the repository root, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. The repository cards require an internet connection; the rest of the site is static.

## Deploy with GitHub Pages

In the GitHub repository, open **Settings → Pages**. Select **Deploy from a branch**, choose the `main` branch and the `/(root)` folder, then save. GitHub Pages will publish the site at:

<https://maxsa2004.github.io/Portfolio_Maximiliano_Sa/>

The site uses relative asset paths and supports the repository-specific URL. After committing and pushing changes to the configured branch, GitHub Pages updates the published site.
