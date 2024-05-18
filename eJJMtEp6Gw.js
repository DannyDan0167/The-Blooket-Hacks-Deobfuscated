// © Copyright 2023 CrazyH
// This file was originally made by CrazyH
// Usage of this license implies that any person obtaining a copy of this software and associated documentation files (the “Software”), to use and produce files using this Software. They may not; copy modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
// © Copyright 2023 CrazyH

const a = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {
  if (!arguments[1].includes("suspend")) {
    a.apply(this, arguments);
  }
};
console.log("You cant get banned while using Hacklet!");
var b = {
  request: async function (a) {
    return new Promise((b, c) => {
      var d = new XMLHttpRequest();
      d.open("GET", a);
      d.send();
      d.onload = function () {
        b(d.responseText);
      };
      d.onerror = function () {
        c();
      };
    });
  },
  readLocalStorage: async a => {
    return new Promise((b, c) => {
      chrome.storage.local.get([a], function (c) {
        if (c[a] === undefined) {
          b(undefined);
        } else {
          b(c[a]);
        }
      });
    });
  },
  getLocalState: async function (a) {
    var c = chrome.runtime.getURL("states");
    var d = await b.request(c);
    if (await d.split(a)[1]) {
      return await d.split(a + "=")[1].split("\n")[0];
    } else {
      return null;
    }
    ;
  },
  getState: async function (a) {
    var c = await b.request("https://raw.githubusercontent.com/The-Blooket-Hacks/Extension-Database/main/Public/states");
    if (await c.split(a)[1]) {
      return await c.split(a + "=")[1].split("\n")[0];
    } else {
      return null;
    }
    ;
  },
  getCurrentTheme: async function () {
    return await b.readLocalStorage("hackletCurrentTheme");
  },
  getCurrentPlugins: async function () {
    return await b.readLocalStorage("hackletCurrentPlugins");
  },
  applyTheme: function (a) {
    document.head.innerHTML += "<style class=\"hackletTheme\">" + a + "</style>";
  },
  applyPlugin: async function (a) {
    var b = {
      action: "executeScript",
      script: a
    };
    chrome.runtime.sendMessage(b, function (a) {
      console.log("Script Executed");
    });
  }
};
async function c() {
  if ((await b.getState("disabled")) == "false") {
    var d = await b.getCurrentTheme();
    if (d != "Blooket/default" && d != undefined) {
      var e = await b.request("https://raw.githubusercontent.com/The-Blooket-Hacks/Extension-Database/main/Public/Themes/" + d + ".css");
      await b.applyTheme(await e);
    }
    ;
    var f = await b.getCurrentPlugins();
    if (f != undefined) {
      for (const a of f) {
        var e = await b.request("https://raw.githubusercontent.com/The-Blooket-Hacks/Extension-Database/main/Public/Scripts/" + a + ".js");
        await b.applyPlugin(await e);
      }
      ;
    }
    ;
  }
  ;
}
;
c();
var d = "(() => {\n    let n = document.createElement('iframe');\n    document.body.append(n);\n    window.alert = n.contentWindow.alert.bind(window);\n    window.prompt = n.contentWindow.prompt.bind(window);\n    window.confirm = n.contentWindow.confirm.bind(window);\n    n.remove();\n\n    console.log(\"Blooket unblocked!\");\n})();";
var e = {
  action: "executeScript",
  script: d
};
chrome.runtime.sendMessage(e, function (a) {
  console.log("Script Executed");
});
async function f() {
  var c = await document.querySelector("body>div");
  var d = "<div style=\"-webkit-user-select: none; -ms-user-select: none; user-select: none; display: block;bottom: 0;position: absolute;right: 0;padding: 10px;z-index: 100;font-size: 13px;font-weight: 600;background-color: white;border-radius: 10px 0px 0px 0px;box-shadow: inset 0 -7px rgba(0,0,0,.2), 0 0 4px rgba(0,0,0,.15);height: 25px;\">Hacklet Made By CrazyH</div>";
  var e = new DOMParser().parseFromString(d, "text/html").body.firstElementChild;
  c.appendChild(e);
}
;
f();
