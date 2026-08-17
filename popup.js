const dot = document.getElementById("dot");
const statusEl = document.getElementById("status");
const countEl = document.getElementById("count");
const toggle = document.getElementById("toggle");
const exportBtn = document.getElementById("export");
const clearBtn = document.getElementById("clear");

async function refresh() {
  const { recording = false, events = [] } = await chrome.storage.local.get(["recording", "events"]);
  dot.classList.toggle("on", recording);
  statusEl.textContent = recording ? "Recording" : "Not recording";
  countEl.textContent = `${events.length} events`;
  toggle.textContent = recording ? "Stop recording" : "Start recording";
  toggle.className = recording ? "secondary" : "primary";
}

toggle.addEventListener("click", async () => {
  const { recording = false } = await chrome.storage.local.get(["recording"]);
  await chrome.storage.local.set({ recording: !recording });
  await refresh();
});

clearBtn.addEventListener("click", async () => {
  await chrome.storage.local.set({ events: [], recording: false });
  await refresh();
});

exportBtn.addEventListener("click", async () => {
  const { events = [] } = await chrome.storage.local.get(["events"]);
  const payload = JSON.stringify({ version: "0.1", exportedAt: new Date().toISOString(), events }, null, 2);
  const url = "data:application/json;charset=utf-8," + encodeURIComponent(payload);
  chrome.downloads.download({ url, filename: `skillforge-recording-${Date.now()}.json`, saveAs: true });
});

refresh();
