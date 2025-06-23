import Camera from "./utils/camera";
import "../styles/style.css";
import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.getElementById("main-content"),
    drawerButton: document.getElementById("drawer-button"),
    navigationDrawer: document.getElementById("navigation-drawer"),
    skipLinkButton: document.getElementById("skip-link"),
  });

  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();

    Camera.stopALlStreams();
  });
});
