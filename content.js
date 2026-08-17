(() => {
  let inputTimers = new WeakMap();

  function cssEscape(value) {
    if (window.CSS?.escape) return CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function selectorFor(el) {
    if (!(el instanceof Element)) return "";
    if (el.id) return `#${cssEscape(el.id)}`;
    const testId = el.getAttribute("data-testid") || el.getAttribute("data-test") || el.getAttribute("data-qa");
    if (testId) return `[data-testid="${testId}"]`;
    const name = el.getAttribute("name");
    if (name) return `${el.tagName.toLowerCase()}[name="${name.replace(/"/g, '\\"')}"]`;
    const aria = el.getAttribute("aria-label");
    if (aria) return `${el.tagName.toLowerCase()}[aria-label="${aria.replace(/"/g, '\\"')}"]`;
    const placeholder = el.getAttribute("placeholder");
    if (placeholder) return `${el.tagName.toLowerCase()}[placeholder="${placeholder.replace(/"/g, '\\"')}"]`;

    const parts = [];
    let node = el;
    while (node && node.nodeType === 1 && parts.length < 4) {
      let part = node.tagName.toLowerCase();
      const parent = node.parentElement;
      if (parent) {
        const siblings = [...parent.children].filter(x => x.tagName === node.tagName);
        if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(node) + 1})`;
      }
      parts.unshift(part);
      node = parent;
    }
    return parts.join(" > ");
  }

  function eventPayload(action, el, extra = {}) {
    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      action,
      url: location.href,
      selector: selectorFor(el),
      text: (el?.innerText || el?.textContent || "").trim().slice(0, 120),
      tag: el?.tagName?.toLowerCase(),
      inputType: el?.getAttribute?.("type") || undefined,
      name: el?.getAttribute?.("name") || undefined,
      ariaLabel: el?.getAttribute?.("aria-label") || undefined,
      placeholder: el?.getAttribute?.("placeholder") || undefined,
      ...extra
    };
  }

  function send(event) {
    try { chrome.runtime.sendMessage({ type: "RECORDED_EVENT", event }); } catch {}
  }

  document.addEventListener("click", e => {
    const el = e.target instanceof Element ? e.target.closest("button,a,input,[role='button'],[role='option'],[role='tab']") || e.target : null;
    if (el) send(eventPayload("click", el));
  }, true);

  document.addEventListener("input", e => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) return;
    if (["password", "hidden", "file"].includes(el.type)) return;
    clearTimeout(inputTimers.get(el));
    const timer = setTimeout(() => send(eventPayload("input", el, { value: el.value })), 500);
    inputTimers.set(el, timer);
  }, true);

  window.addEventListener("load", () => send({ id: crypto.randomUUID(), timestamp: Date.now(), action: "navigate", url: location.href }));
})();
