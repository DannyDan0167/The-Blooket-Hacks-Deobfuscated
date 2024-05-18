// © Copyright 2023 CrazyH
// This file was originally made by CrazyH
// Usage of this license implies that any person obtaining a copy of this software and associated documentation files (the “Software”), to use and produce files using this Software. They may not; copy modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
// © Copyright 2023 CrazyH

chrome.runtime.onMessage.addListener(async function (e, t, i) {
  var [a] = await chrome.tabs.query({
    currentWindow: true,
    active: true
  });
  if (!a.url?.startsWith("chrome://") && e.action == "executeScript") {
    (async function execInPage(e) {
      const [t] = await chrome.tabs.query({
        currentWindow: true,
        active: true
      });
      chrome.scripting.executeScript({
        target: {
          tabId: t.id
        },
        func: e => {
          const t = document.createElement("script");
          t.textContent = e;
          document.body.appendChild(t);
          t.remove();
        },
        args: [e],
        world: "MAIN",
        injectImmediately: true
      });
    })(e.script);
    console.log("Script Executed");
    i("done");
  }
});
let isRunning = false;
let getCurrentTab = async () => {
  let [e] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });
  return e;
};
let isCSPDisabled = async () => {
  let e = (await chrome.declarativeNetRequest.getSessionRules()).map(e => e.condition.urlFilter);
  let {
    url: t
  } = await getCurrentTab();
  return e.some(e => e === t);
};
let disableCSP = async e => {
  if (isRunning) {
    return;
  }
  isRunning = true;
  let t = [];
  let i = [];
  let {
    url: a
  } = await getCurrentTab();
  if (await isCSPDisabled()) {
    (await chrome.declarativeNetRequest.getSessionRules()).forEach(e => {
      if (e.condition.urlFilter === a) {
        i.push(e.id);
      }
    });
  } else {
    t.push({
      id: e,
      action: {
        type: "modifyHeaders",
        responseHeaders: [{
          header: "content-security-policy",
          operation: "set",
          value: ""
        }]
      },
      condition: {
        urlFilter: a,
        resourceTypes: ["main_frame", "sub_frame"]
      }
    });
    chrome.browsingData.remove({}, {
      serviceWorkers: true
    }, () => {});
  }
  await chrome.declarativeNetRequest.updateSessionRules({
    addRules: t,
    removeRuleIds: i
  });
  isRunning = false;
};
let init = () => {
  chrome.tabs.onUpdated.addListener(async function (e, t, i) {
    if (i.url.includes("blooket.com") && (await isCSPDisabled()) == 0) {
      disableCSP(i.id);
    }
  });
  chrome.tabs.onActivated.addListener(async () => {
    var e = await getCurrentTab();
    if (e.url.includes("blooket.com") && (await isCSPDisabled()) == 0) {
      disableCSP(e.id);
    }
  });
};
init();
