# Maximiliano Sá - Portfolio

A lightweight, responsive personal portfolio built with HTML, CSS, and vanilla JavaScript. It is designed to publish directly from GitHub Pages without a build step or API token.

## Project structure

```text
index.html                  Main page and semantic section structure
css/style.css               Theme, responsive layout, and interactions
js/profile.js               Editable personal profile and portfolio content
js/main.js                  Page rendering, navigation, and theme preference
js/github.js                Public GitHub repository integration
assets/CV_ Maximiliano_Sá.pdf  Downloadable CV
assets/favicon.svg           Small SVG site icon
.nojekyll                   Disables Jekyll processing on Pages
.gitignore                  Keeps local secrets and development artifacts out of Git
```

## Edit your information

Most content is in `js/profile.js`. Update the name, location, headline, biography, education, certifications, experience, activities, and skill groups there. Education includes the Information Security MSc (expected July 2028) and the Computer Science BSc, based on the supplied CV. The Pedagogical Department activity end date can also be edited there.

The `linkedinUrl` and `email` fields contain your configured public links. Edit them in `profile.js` if either changes.

The theme follows each browser/device's `prefers-color-scheme` setting by default and updates when that setting changes. The theme control can switch to a manual override; pressing it again restores system-following mode. Manual preference is stored only in that browser's local storage, while automatic mode adapts independently on each device.

## CV

The download button uses `cvPath` in `js/profile.js`. Replace the supplied file at `assets/CV_ Maximiliano_Sá.pdf`, or update `cvPath` to the relative path of your replacement. Spaces and accented characters are URL encoded in the configured value.

## Projects

LookoutIDS is the sole featured project in `featuredProjects`. AgentOps Playground is selected for the automatically generated repository section. Add any future featured entries to that array. The certifications section lists the CV's Dale Carnegie Generation.Next and Cisco Networking Academy training and links to your Credly profile.

The repository browser calls GitHub's unauthenticated public endpoint for `MaxSa2004`, excludes forks, archived/disabled repositories and the featured project's source, then orders results by latest update. AgentOps Playground is selected and has a maintained description and live-demo link in `profile.js`. Other repositories are filtered to those with a description and a language or stars by default. Set `github.showAllEligible` to `true` to display all remaining repositories, or add repository names to `github.selectedRepositories` to curate the display. The requests use no token. If GitHub is unavailable or rate-limited, the section displays a fallback link to your profile.

## Decorative arcade animation

The fixed Pac-Man and ghost watermark is marked up in `index.html` and styled in `css/style.css`. Its position stays at the viewport's vertical center while scrolling, and its layer ignores pointer input. The five-dot trail and ground line change from white in dark mode to black in light mode. Ghost feet animate and the group gently changes its distance from Pac-Man while remaining inside the ground line. Adjust `.pacman-background` opacity or the `pacman-crossing` duration to tune it. The reduced-motion media query centers the characters and disables movement, chomping, and the moving dot trail.

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
