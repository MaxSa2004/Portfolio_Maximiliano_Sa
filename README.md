# Maximiliano Sá - Portfolio

A lightweight, responsive personal portfolio built with HTML, CSS, and vanilla JavaScript. It is designed to publish directly from GitHub Pages without a build step or API token.

## Project structure

```text
index.html                  Main page and semantic section structure
privacy.html                Standalone privacy notice and consent controls
css/style.css               Theme, responsive layout, and interactions
js/profile.js               Editable personal profile and portfolio content
js/main.js                  Page rendering, navigation, and theme preference
js/github.js                Public GitHub repository integration
assets/CV_ Maximiliano_Sá.pdf  Downloadable CV
assets/favicon.svg           Small SVG site icon
assets/og-image.png          1200 × 630 social sharing preview image
.nojekyll                   Disables Jekyll processing on Pages
.gitignore                  Keeps local secrets and development artifacts out of Git
```

## Edit your information

Most content is in `js/profile.js`. Update the name, location, headline, biography, education, certifications, experience, activities, and skill groups there. Education includes the Information Security MSc (expected July 2028) and the Computer Science BSc, based on the supplied CV. The Pedagogical Department activity end date can also be edited there.

The `linkedinUrl` and `email` fields contain your configured public links. Edit them in `profile.js` if either changes.

## Social sharing preview

The homepage Open Graph and Twitter metadata use `assets/og-image.png` (1200 × 630 pixels) at the canonical GitHub Pages URL. To replace the preview, overwrite that PNG with a new image at the same path and dimensions; the absolute image URL in `index.html` will continue to work at the repository-specific Pages address. The image is served as a static project asset, with no external image host or build step.

The theme follows each browser/device's `prefers-color-scheme` setting by default and updates when that setting changes. The theme control can switch to a manual override; pressing it again restores system-following mode. Manual preference is stored only in that browser's local storage, while automatic mode adapts independently on each device.

## CV

The download button uses `cvPath` in `js/profile.js`. Replace the supplied file at `assets/CV_ Maximiliano_Sá.pdf`, or update `cvPath` to the relative path of your replacement. Spaces and accented characters are URL encoded in the configured value.

## Projects

LookoutIDS is the sole featured project in `featuredProjects`. AgentOps Playground is selected for the automatically generated repository section. Add any future featured entries to that array. The certifications section lists the CV's Dale Carnegie Generation.Next and Cisco Networking Academy training and links to your Credly profile.

The repository browser calls GitHub's unauthenticated public endpoint for `MaxSa2004`, excludes forks, archived/disabled repositories and the featured project's source, then orders results by latest update. AgentOps Playground is selected and has a maintained description and live-demo link in `profile.js`. Other repositories are filtered to those with a description and a language or stars by default. Set `github.showAllEligible` to `true` to display all remaining repositories, or add repository names to `github.selectedRepositories` to curate the display. The requests use no token. If GitHub is unavailable or rate-limited, the section displays a fallback link to your profile.

## Decorative arcade animation

The fixed Pac-Man and ghost watermark is marked up in `index.html` and styled in `css/style.css`. Its position stays at the viewport's vertical center while scrolling, and its layer ignores pointer input. The five-dot trail and ground line change from white in dark mode to black in light mode. Ghost feet animate and the group gently changes its distance from Pac-Man while remaining inside the ground line. Adjust `.pacman-background` opacity or the `pacman-crossing` duration to tune it. The reduced-motion media query centers the characters and disables movement, chomping, and the moving dot trail.

## Google Analytics, privacy and consent

`js/analytics.js` uses Google's gtag.js for Measurement ID `G-8SV2XYRRH7`. The ID is public and is not an API key. This is a consent-first, Basic Consent Mode-style implementation: before an affirmative choice, the Google tag is absent and the site makes no Google Analytics request or consent ping. The independent GitHub repository API request described below still occurs before analytics consent.

The explicit choice is saved in local storage at `portfolio-analytics-consent-v1` as `{version, choice, updatedAt}`. Missing, malformed, unsupported-version, or timestamp-less entries fail closed and show the banner. Acceptance only activates analytics after that record is successfully written. Rejection is also kept in session storage as a tab-scoped revocation fallback if persistent storage cannot be updated. If browser storage is unavailable, acceptance leaves analytics off and displays a status message; rejection leaves the portfolio usable. Choices are local to that browser and are not a centralized or independently auditable consent register.

After acceptance, the page queues denied defaults for `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization`, loads gtag.js once per page document, grants only `analytics_storage`, and configures `G-8SV2XYRRH7`. The config sets `send_page_view: false`; the code queues one `page_view` after the tag is ready and consent is granted. An initial short network check did not wait long enough after an accepted reload. Extended Chrome Network capture observed one `page_view` collection request on each of three actual reloads; in one timed run it appeared about five seconds after the `load` event. This is a browser-observed request, not proof Google processed or retained the event. The implementation keeps explicit page-view tracking; turn off GA property's Enhanced Measurement page-view collection to avoid a second source. After a same-page withdrawal, the internal permission gate closes first, the GA disable flag is set, consent is updated to denied, accessible `_ga` cookies are expired, and app-originated gtag events are blocked. The loaded script cannot be removed. `allow_google_signals` and `allow_ad_personalization_signals` are disabled in the config; no ads or remarketing are implemented.

The standalone notice is `privacy.html` and is published at `https://maxsa2004.github.io/Portfolio_Maximiliano_Sa/privacy.html`. Its stylesheet, favicon, and consent script use relative paths. The footer's **Cookie preferences** control reopens the banner from both `index.html` and `privacy.html`; it does not depend on visiting the privacy page. The notice identifies the controller and contact, analytics purpose and consent basis, data categories, Google as provider, retention, choices and withdrawal, rights and CNPD, and the separate GitHub API request. It is technical information, not a legal determination.

### GA4 property settings to review

The owner reports that the GA4 property is set to retain event-level data for 2 months and user-level data for 14 months, with user-level retention reset on new activity. Verify these values in **Admin → Data collection and modification → Data retention**. Google says these controls affect user/event-level data in Explorations and funnel reports, not standard aggregated reports.

Review **Admin → Data streams → Web → Enhanced measurement** and disable its Page views measurement (including page loads and browser-history changes), scrolls, outbound clicks, site search, video engagement, file downloads, and form interactions. The code sends an explicit `page_view` event, so GA's own page-view collection must be off to avoid duplicates. Also review Google Signals, ads personalization, data sharing, whether this property is linked to Google Ads, and whether any advertising-related functionality is enabled. The code disables Google Signals and ads personalization at tag configuration; the property settings must still be checked manually. GA4 automatically collects standard events such as `session_start`, `first_visit`, and `user_engagement` in addition to `page_view`; decide whether those defaults are acceptable for the stated purpose. Update the notice if the actual property configuration makes its current descriptions inaccurate.

### GitHub API legal-basis decision

The public notice explains that the site requests public repository information from GitHub to display projects, and that the request is independent of analytics consent. The appropriate legal basis for this separate processing has not been selected or assessed here. Decide and document the basis that applies to your circumstances; do not assume legitimate interests. If you select legitimate interests, assess and record the balancing of that interest against visitors' rights and freedoms, and update the notice with the selected basis and any transparency information required for it. Seek qualified advice if needed.

### International-transfer and contract questions

Google's public documentation describes global processing and general transfer frameworks, but this README and the public notice do not assert which transfer mechanism applies to this specific property. Check the Google Analytics account's applicable data-processing terms, the contracting Google entity, any transfer terms accepted for the account, and whether an adequacy decision, the EU-U.S. Data Privacy Framework, standard contractual clauses, or another mechanism applies to this particular arrangement. For the transparency information in GDPR Article 13(1)(f), establish which safeguards apply and how visitors can obtain information about or a copy of them, where required. Confirm the data-controller/provider roles and document the outcome before publication; seek qualified legal advice if needed.

### Browser audit and repeatable checks

The latest isolated headless Chrome test used CDP Network events and browser storage inspection at `/Portfolio_Maximiliano_Sa/`. First visit: banner shown, no tag, collection request, GA cookie, or `dataLayer`; the independent GitHub API request still occurred. Acceptance: one tag, one config, one `page_view` command, and one observed `page_view` collection request. Three actual `Page.reload` tests after acceptance each loaded one tag, issued one config and queued one `page_view`; an extended Network observation recorded one `page_view` collection request per reload, with observed latency of about five seconds after `load` in one run. Rejection on first visit and its reload produced no tag or collection request. Withdrawing consent from the footer denied consent, disabled the tag, removed accessible `_ga` cookies, and blocked a probe event; after reload the rejected preference remained blocked. Reaccepting on the same page reused the existing tag/config and produced one additional page-view collection request. The existing tests also verified invalid storage and simulated storage exceptions fail closed; browser-blocked Google services leave the site usable; mobile/tablet/desktop layouts, keyboard focus, reduced motion, and core feature links continue working. These local browser requests do not establish production collection or legal compliance.

To repeat: serve locally as described below, start a clean browser profile, and inspect the Network panel for `googletagmanager`, `google-analytics` and `collect`. Verify a first visit and rejection have no Google requests, accept once and check one `page_view`, then reload and keep Network capture running for at least 10 seconds because the request may appear several seconds after `load`. Use footer preferences to reject and check the network again before reloading. Try accept after rejection, invalid/corrupted local storage, and blocked/throwing storage. After deployment, check GA4 **Reports → Realtime** for your own live site test; this only verifies production traffic if you actually see the event there.

### Privacy/legal references reviewed

- [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj), including Articles 5–7, 12–14, 25, 30 and 44–49.
- [Portuguese Law No. 41/2004, consolidated text](https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2004-106523049), Article 5 (last consolidated amendment shown as 16 August 2022).
- [CNPD information note on cookies (25 June 2021)](https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf), which identifies analytics cookies as requiring prior consent under Article 5.
- [EDPB Guidelines 05/2020 on consent](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_en.pdf).
- Google: [Basic consent setup](https://developers.google.com/tag-platform/security/guides/consent), [Consent Mode concepts](https://developers.google.com/tag-platform/security/concepts/consent-mode), [GA4 page views](https://developers.google.com/analytics/devguides/collection/ga4/views), [Enhanced Measurement settings](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/EnhancedMeasurementSettings), [retention](https://support.google.com/analytics/answer/7667196), [Analytics data safeguards and IP-address use](https://support.google.com/analytics/answer/6004245), [EU, UK and Switzerland data and privacy information](https://support.google.com/analytics/answer/12017362), [information from partner sites](https://policies.google.com/technologies/partner-sites), and [transfer frameworks](https://policies.google.com/privacy/frameworks).

Technical tests cannot establish a binding legal conclusion. GDPR concepts needing a decision include whether the Article 30 small-organization exception applies (the processing is ongoing rather than occasional), whether a DPO is required, the exact Google/GitHub roles and transfer mechanism, and how to handle data-subject requests. A static GitHub Pages deployment has no server-side consent ledger; browser storage is not proof of identity, a durable audit record, or a record that survives clearing/browser changes. Do not treat these changes as a compliance certification.

## Run locally

ES modules require a local web server; opening `index.html` as a `file:` URL is not supported. From the project root, run one of:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. The GitHub project cards need an internet connection. The rest of the site is static.

## Publish with GitHub Pages

1. The configured remote is `MaxSa2004/Portfolio_Maximiliano_Sa`. Ensure that repository exists under your account and matches the configured remote and publishing URL.
2. From the project root, stage and push the site files:

   ```sh
   git add .gitignore .nojekyll README.md index.html css js assets
   git commit -m "Prepare portfolio for GitHub Pages"
   git push -u origin main
   ```

3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Set the branch to **main** and the folder to **/(root)**, then click **Save**.
6. Wait for the Pages deployment shown in the repository's **Actions** tab. The site URL will be `https://maxsa2004.github.io/Portfolio_Maximiliano_Sa/`.

This site uses relative asset paths and works at either root or repository paths. To update the published portfolio, edit files, commit, and push to the configured branch; Pages redeploys automatically.
