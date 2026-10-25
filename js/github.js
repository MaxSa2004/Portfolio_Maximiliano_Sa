import { profile } from "./profile.js";

const root = document.querySelector("#repository-grid");
const status = document.querySelector("#repository-status");
const node = (tag, className, text) => {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (text !== undefined) item.textContent = text;
  return item;
};

function repoCard(repo) {
  const card = node("article", "repo-card");
  const title = node("a", "repo-title", repo.name);
  const repositoryUrl = new URL(repo.html_url);
  if (repositoryUrl.protocol !== "https:" || repositoryUrl.hostname !== "github.com") throw new Error("Unexpected repository URL");
  title.href = repositoryUrl.href; title.target = "_blank"; title.rel = "noopener noreferrer";
  const configuredDescription = profile.github.repositoryDescriptions?.[repo.name.toLowerCase()];
  const description = node("p", "repo-description", configuredDescription || repo.description || "A public project on GitHub.");
  const demoUrl = profile.github.repositoryDemos?.[repo.name.toLowerCase()];
  if (demoUrl) {
    const demo = node("a", "repo-demo-link", "Open live demo ↗");
    demo.href = demoUrl;
    demo.target = "_blank";
    demo.rel = "noopener noreferrer";
    card.append(title, description, demo);
  }
  const footer = node("div", "repo-meta");
  footer.append(node("span", "repo-language", repo.language || "Code"), node("span", "repo-stars", `☆ ${repo.stargazers_count || 0}`));
  if (!demoUrl) card.append(title, description);
  card.append(footer);
  return card;
}

async function loadRepositories() {
  status.textContent = "Loading public repositories…";
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(profile.githubUsername)}/repos?sort=updated&per_page=100`, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("GitHub returned an invalid repository list");
    const featuredNames = new Set(profile.featuredProjects.map(project => project.source.split("/").pop().toLowerCase()));
    const eligible = data.filter(repo => !repo.fork && !repo.archived && !repo.disabled && !featuredNames.has(repo.name.toLowerCase()));
    let selected;
    const picks = profile.github.selectedRepositories.map(name => name.toLowerCase());
    if (profile.github.showAllEligible) selected = eligible;
    else if (picks.length) selected = eligible.filter(repo => picks.includes(repo.name.toLowerCase()));
    else selected = eligible.filter(repo => repo.description && repo.description.trim().length > 18 && (repo.language || repo.stargazers_count > 0));
    selected.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    root.replaceChildren(...selected.map(repoCard));
    status.textContent = selected.length ? `More from GitHub · updated ${selected.length === 1 ? "project" : "projects"} sorted by latest activity` : "No additional repositories are selected yet. Add repository names in js/profile.js to feature them here.";
  } catch (error) {
    console.warn("Repository list unavailable:", error);
    status.textContent = "The public repository list is temporarily unavailable. You can still explore all projects on GitHub.";
    const link = node("a", "text-link", "Open GitHub profile ↗");
    link.href = profile.githubUrl; link.target = "_blank"; link.rel = "noopener noreferrer";
    root.replaceChildren(link);
  }
}

loadRepositories();
