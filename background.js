chrome.runtime.onInstalled.addListener(async () => {
  const state = await chrome.storage.local.get(["recording", "events"]);
  if (typeof state.recording !== "boolean") await chrome.storage.local.set({ recording: false });
  if (!Array.isArray(state.events)) await chrome.storage.local.set({ events: [] });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "RECORDED_EVENT") return;
  chrome.storage.local.get(["recording", "events"]).then(async state => {
    if (!state.recording) return sendResponse({ ignored: true });
    const events = Array.isArray(state.events) ? state.events : [];
    events.push(message.event);
    await chrome.storage.local.set({ events });
    sendResponse({ ok: true, count: events.length });
  });
  return true;
});
