import { profile } from "./profile.js";
import "./analytics.js";

const $ = (selector, root = document) => root.querySelector(selector);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function externalLink(label, href, className = "") {
  const a = el("a", className, label);
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}

function fillProfile() {
  document.querySelectorAll("[data-name]").forEach(node => node.textContent = profile.name);
  document.querySelectorAll("[data-location]").forEach(node => node.textContent = profile.location);
  document.querySelectorAll("[data-headline]").forEach(node => node.textContent = profile.headline);
  document.querySelectorAll("[data-bio]").forEach(node => node.textContent = profile.biography);
  document.querySelectorAll("[data-github]").forEach(node => { node.href = profile.githubUrl; });
  document.querySelectorAll("[data-credly]").forEach(node => { node.href = profile.certifications.credlyUrl; });
  document.querySelectorAll("[data-linkedin]").forEach(node => {
    if (profile.linkedinUrl) { node.href = profile.linkedinUrl; node.hidden = false; }
    else node.hidden = true;
  });
  document.querySelectorAll("[data-email]").forEach(node => {
    if (profile.email) { node.href = `mailto:${profile.email}`; node.hidden = false; }
    else node.hidden = true;
  });
  const cv = $("#cv-link");
  cv.href = profile.cvPath;
  $("#linkedin-note").hidden = Boolean(profile.linkedinUrl);
  $("#email-note").hidden = Boolean(profile.email);
  document.title = `${profile.name} - Information Security Student & Developer`;

  const expRoot = $("#experience-list");
  profile.experience.forEach(item => {
    const article = el("article", "timeline-card");
    const meta = el("div", "timeline-meta");
    meta.append(el("span", "eyebrow", item.dates), el("span", "location", item.location));
    article.append(meta, el("h3", "", item.role), el("p", "organization", item.organization));
    const responsibilities = el("ul", "experience-points");
    item.responsibilities.forEach(point => responsibilities.append(el("li", "", point)));
    article.append(responsibilities);
    const tags = el("div", "tag-list");
    item.technologies.forEach(t => tags.append(el("span", "tag", t)));
    article.append(tags);
    expRoot.append(article);
  });
  profile.activities.forEach(item => {
    const article = el("article", "timeline-card activity-card");
    article.append(el("span", "eyebrow", item.dates), el("h3", "", item.role), el("p", "organization", item.organization), el("p", "", item.summary));
    expRoot.append(article);
  });

  const skills = $("#skills-grid");
  profile.skills.forEach(group => {
    const card = el("article", "skill-group");
    card.append(el("h3", "", group.title));
    const tags = el("div", "tag-list");
    group.items.forEach(item => tags.append(el("span", "tag", item)));
    card.append(tags); skills.append(card);
  });

  const featuredRoot = $("#featured-projects");
  profile.featuredProjects.forEach((project, i) => {
    const article = el("article", "featured-project");
    const visual = el("div", "project-visual");
    visual.setAttribute("aria-hidden", "true");
    visual.append(el("span", "visual-kicker", "FEATURED PROJECT"), el("span", "visual-mark", "A"), el("span", "visual-caption", "Build · Observe · Iterate"));
    const body = el("div", "project-copy");
    body.append(el("span", "eyebrow", project.status ? `0${i + 1} / ${project.status}` : `0${i + 1} / SELECTED WORK`), el("h3", "", project.name), el("p", "", project.description));
    if (project.technologies.length) {
      const tags = el("div", "tag-list"); project.technologies.forEach(t => tags.append(el("span", "tag", t))); body.append(tags);
    }
    const actions = el("div", "project-actions");
    if (project.demo) actions.append(externalLink("Open live demo ↗", project.demo, "button button-primary"));
    actions.append(externalLink("View source ↗", project.source, "text-link"));
    body.append(actions); article.append(visual, body); featuredRoot.append(article);
  });

  const educationRoot = $("#education-detail");
  profile.education.forEach(edu => {
    const card = el("article", "education-card");
    const mark = el("div", "education-mark", "FCUP");
    mark.setAttribute("aria-hidden", "true");
    const details = el("div", "education-copy");
    details.append(el("span", "eyebrow", `${edu.start} - ${edu.end}`), el("h3", "", edu.degree), el("p", "organization", edu.institution), el("p", "", `${edu.location} · ${edu.status}`));
    card.append(mark, details);
    educationRoot.append(card);
  });

  const certificationRoot = $("#certification-list");
  profile.certifications.items.forEach((certification, index) => {
    const card = el("article", "certification-card");
    card.append(el("span", "certification-index", `0${index + 1}`), el("p", "", certification));
    certificationRoot.append(card);
  });
  const credly = $("#credly-link");
  credly.href = profile.certifications.credlyUrl;
}

function setupTheme() {
  const button = $("#theme-toggle");
  const root = document.documentElement;
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : { matches: false };
  let mode = "system";
  try {
    const saved = localStorage.getItem("portfolio-theme-mode");
    if (saved === "dark" || saved === "light") mode = saved;
  } catch {}
  const update = () => {
    const theme = mode === "system" ? (media.matches ? "dark" : "light") : mode;
    root.dataset.theme = theme;
    root.dataset.themeMode = mode;
    const themeColor = $("meta[name='theme-color']");
    if (themeColor) themeColor.content = theme === "dark" ? "#000000" : "#f4f8fc";
    const next = theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", mode === "system" ? `Using system appearance (${theme}). Click to choose ${next} mode.` : `Using ${theme} mode. Click to follow system appearance.`);
    button.title = mode === "system" ? `System appearance: ${theme}` : `${theme} mode; click to use system setting`;
    button.querySelector(".theme-icon").textContent = mode === "system" ? "◐" : (theme === "light" ? "☾" : "☼");
  };
  update();
  button.addEventListener("click", () => {
    if (mode === "system") mode = root.dataset.theme === "dark" ? "light" : "dark";
    else mode = "system";
    try { localStorage.setItem("portfolio-theme-mode", mode); } catch {}
    update();
  });
  const followSystem = () => { if (mode === "system") update(); };
  if (media.addEventListener) media.addEventListener("change", followSystem);
  else if (media.addListener) media.addListener(followSystem);
}

function setupNavigation() {
  const toggle = $("#menu-toggle"), nav = $("#nav-links");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      toggle.focus();
    }
  });
  $("#year").textContent = new Date().getFullYear();
}

fillProfile(); setupTheme(); setupNavigation();
import("./github.js").catch(error => console.error("Could not load repository section", error));
