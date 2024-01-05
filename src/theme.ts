let mode: string;
const changeMode = document.querySelector(".mode-change") as HTMLElement;

initTheme();
changeMode.addEventListener("click", toggleTheme);

function initTheme() {
  let localStorageMode = localStorage.getItem("theme");
  if (localStorageMode) {
    mode = localStorageMode;
  } else {
    mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (mode === "dark") {
    const body = document.querySelector("body") as HTMLElement;
    const modeIcon = document.querySelector(".mode-icon") as HTMLElement;
    const modeCaption = document.querySelector(".mode-caption") as HTMLElement;
    localStorage.setItem("theme", mode);
    modeIcon.innerText = "light_mode";
    modeCaption.innerText = "Light Mode";
    body.classList.add("dark");
  }
}

function toggleTheme() {
  const body = document.querySelector("body") as HTMLElement;
  const modeIcon = document.querySelector(".mode-icon") as HTMLElement;
  const modeCaption = document.querySelector(".mode-caption") as HTMLElement;
  if (mode === "dark") {
    mode = "light";
    modeIcon.innerText = "dark_mode";
    modeCaption.innerText = "Dark Mode";
  } else {
    mode = "dark";
    modeIcon.innerText = "light_mode";
    modeCaption.innerText = "Light Mode";
  }
  localStorage.setItem("theme", mode);
  body.classList.toggle("dark");
}
