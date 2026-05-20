const podcasts = [
  {
    title: "Soil health and high-yield maize",
    meta: "18 min • Expert advice",
  },
  {
    title: "Dairy margins in a wet season",
    meta: "24 min • Market desk",
  },
  {
    title: "Emerging farmer finance clinic",
    meta: "31 min • Sponsored advertorial",
  },
];

const news = [
  {
    title: "Western Cape export growers prepare for port delays",
    meta: "Citrus • Logistics • 12 min ago",
  },
  {
    title: "Limpopo livestock groups issue foot-and-mouth update",
    meta: "Livestock • Animal health • 38 min ago",
  },
  {
    title: "Free State co-ops publish winter input outlook",
    meta: "Grain • Community news • 1 hr ago",
  },
];

const markets = [
  { name: "White maize", price: "R4 006/t", movement: "+0.7%" },
  { name: "Wheat", price: "R6 012/t", movement: "-0.4%" },
  { name: "Soybeans", price: "R7 498/t", movement: "+1.1%" },
  { name: "Beef carcass", price: "R64.20/kg", movement: "+0.3%" },
];

const signupForm = document.querySelector("#signupForm");
const registration = document.querySelector("#registration");
const appScreen = document.querySelector("#app");
const tabButtons = document.querySelectorAll(".tab-button");
const bottomButtons = document.querySelectorAll("[data-jump]");
const panels = document.querySelectorAll("[data-view-panel]");
const playButton = document.querySelector("#playButton");
const playIcon = document.querySelector("#playIcon");
const liveAudio = document.querySelector("#liveAudio");
const audioStatus = document.querySelector("#audioStatus");
const toast = document.querySelector("#toast");

let isPlaying = false;
let toastTimer;

function renderList(targetId, items, template) {
  const target = document.querySelector(targetId);
  target.innerHTML = items.map(template).join("");
}

renderList("#podcastList", podcasts, (item) => `
  <article class="media-item">
    <strong>${item.title}</strong>
    <p>${item.meta}</p>
  </article>
`);

renderList("#newsList", news, (item) => `
  <article class="news-item">
    <strong>${item.title}</strong>
    <p>${item.meta}</p>
  </article>
`);

renderList("#marketList", markets, (item) => `
  <article class="market-item">
    <div>
      <strong>${item.name}</strong>
      <p>${item.price}</p>
    </div>
    <span>${item.movement}</span>
  </article>
`);

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function switchView(viewName) {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.viewPanel === viewName);
  });
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  registration.classList.remove("screen-active");
  appScreen.classList.add("screen-active");
  showToast("Welcome to FARM RADIO");
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

bottomButtons.forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.jump));
});

playButton.addEventListener("click", async () => {
  if (isPlaying) {
    liveAudio.pause();
    return;
  }

  try {
    await liveAudio.play();
  } catch (error) {
    audioStatus.textContent = "Audio could not start in this browser.";
    showToast("Audio could not start");
  }
});

liveAudio.addEventListener("play", () => {
  isPlaying = true;
  playIcon.textContent = "Ⅱ";
  playButton.setAttribute("aria-label", "Pause live radio");
  audioStatus.textContent = "Playing FARM RADIO promo stream";
  showToast("FARM RADIO audio playing");
});

liveAudio.addEventListener("pause", () => {
  isPlaying = false;
  playIcon.textContent = "▶";
  playButton.setAttribute("aria-label", "Play live radio");
  audioStatus.textContent = "Live player paused";
  showToast("Live player paused");
});

liveAudio.addEventListener("ended", () => {
  isPlaying = false;
  playIcon.textContent = "▶";
  playButton.setAttribute("aria-label", "Replay live radio");
  audioStatus.textContent = "Promo stream finished. Tap play to replay.";
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

document.querySelector("#profileButton").addEventListener("click", () => {
  showToast("Profile, consent and data preferences");
});
