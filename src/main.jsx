import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

async function prepare() {
  const { worker } = await import("./mocks/browser.js");
  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

prepare().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
