// Geomersive status page
const STATUS_URL = "https://status.geomersive.example/api/services.json";
const REQUEST_TIMEOUT_MS = 5000;

async function loadStatus() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(STATUS_URL, { signal: controller.signal });
    return await res.json();
  } catch {
    return null; // every service is shown as "Unknown"
  } finally {
    clearTimeout(timer);
  }
}

function render(data) {
  const table = document.getElementById("services");
  const services = ["App", "Tile server", "Worker", "Uploads API"];
  for (const name of services) {
    const status = data?.[name] ?? "Unknown";
    table.insertAdjacentHTML("beforeend", `<tr><td>${name}</td><td>${status}</td></tr>`);
  }
}

loadStatus().then(render);
