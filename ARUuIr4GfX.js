// © Copyright 2023 CrazyH
// This file was originally made by CrazyH
// Usage of this license implies that any person obtaining a copy of this software and associated documentation files (the “Software”), to use and produce files using this Software. They may not; copy modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
// © Copyright 2023 CrazyH

var a = {
  pageBtnHtml: {
    discover: "Discover",
    "my-sets": "My Sets",
    favorites: "Favorites",
    history: "History",
    homeworks: "Homework",
    settings: "Settings"
  },
  smallBtnHtml: {
    market: 3,
    blooks: 2,
    stats: 1
  },
  blooketBodyQuery: "div.arts__body___3acI_-camelCase",
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
  isPattern: function (a) {
    return /[a-zA-Z][/][a-zA-Z]/g.test(a);
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
  getLocalState: async function (b) {
    var c = chrome.runtime.getURL("states");
    var d = await a.request(c);
    if (await d.split(b)[1]) {
      return await d.split(b + "=")[1].split("\n")[0];
    } else {
      return null;
    }
    ;
  },
  getState: async function (b) {
    var c = await a.request("https://raw.githubusercontent.com/The-Blooket-Hacks/Extension-Database/main/Public/states");
    if (await c.split(b)[1]) {
      return await c.split(b + "=")[1].split("\n")[0];
    } else {
      return null;
    }
    ;
  },
  getCurrentTheme: async function () {
    return await a.readLocalStorage("hackletCurrentTheme");
  },
  resetCurrentTheme: function () {
    chrome.storage.local.set({
      hackletCurrentTheme: "Blooket/default"
    }, function () {
      console.log("Reset Current Theme");
    });
  },
  setCurrentTheme: async function (a, b, c) {
    var d = {
      hackletCurrentTheme: b
    };
    chrome.storage.local.set(d, function () {
      console.log("Set Theme: " + b);
    });
  },
  getCurrentPlugins: async function () {
    return await a.readLocalStorage("hackletCurrentPlugins");
  },
  resetCurrentPlugins: function () {
    chrome.storage.local.set({
      hackletCurrentPlugins: []
    }, function () {
      console.log("Reset Current Plugins");
    });
  },
  addCurrentPlugins: async function (b, c, d) {
    var e = await a.getCurrentPlugins();
    e.push(c);
    var f = {
      hackletCurrentPlugins: e
    };
    chrome.storage.local.set(f, function () {
      a.pluginsLoad();
      console.log("Enabled Plugin: " + c);
    });
  },
  removeCurrentPlugins: async function (b, c, d) {
    console.log(d.srcElement.parentElement);
    var e;
    if (d.srcElement.classList.contains("styles__deleteButton___3Ynb7-camelCase") === true) {
      e = d.srcElement.parentElement;
    } else {
      e = d.srcElement.parentElement.parentElement;
    }
    ;
    var f = await a.getCurrentPlugins();
    var g = f.filter(function (a) {
      return a !== c;
    });
    var h = {
      hackletCurrentPlugins: g
    };
    chrome.storage.local.set(h, function () {
      a.pluginsLoad();
      console.log("Disabled Plugin: " + c);
    });
  },
  removeCurrentPluginsNoEvt: async function (b) {
    var c = await a.getCurrentPlugins();
    var d = c.filter(function (a) {
      return a !== b;
    });
    var e = {
      hackletCurrentPlugins: d
    };
    chrome.storage.local.set(e, function () {
      console.log("Disabled Plugin: " + b);
    });
  },
  getPluginInfo: async function (b) {
    var c = await a.request("https://raw.githubusercontent.com/The-Blooket-Hacks/Extension-Database/main/Public/Scripts/" + b + ".js");
    if (c.includes("// -- Hacklet --") == true && c.includes("// -- Hacklet -- ") == true) {
      var d = c.split("// -- Hacklet --")[1].split("// -- Hacklet -- ")[0];
      var e = d.split("// @name         ")[1].split("//")[0];
      var f = d.split("// @version      ")[1].split("//")[0];
      var g = d.split("// @author       ")[1].split("//")[0];
      var h = {
        name: e,
        version: f,
        author: g
      };
      return h;
    } else {
      return {
        error: true
      };
    }
  },
  getThemeInfo: async function (b) {
    var c = await a.request("https://raw.githubusercontent.com/The-Blooket-Hacks/Extension-Database/main/Public/Themes/" + b + ".css");
    if (c.includes("/*\n// -- Hacklet --") == true && c.includes("// -- Hacklet -- \n*/") == true) {
      var d = c.split("/*\n// -- Hacklet --")[1].split("// -- Hacklet -- \n*/")[0];
      var e = d.split("// @name         ")[1].split("//")[0];
      var f = d.split("// @version      ")[1].split("//")[0];
      var g = d.split("// @author       ")[1].split("//")[0];
      var h = {
        name: e,
        version: f,
        author: g
      };
      return h;
    } else {
      return {
        error: true
      };
    }
  },
  loadPlugins: async function () {
    console.log("Loading Plugins");
    if ((await a.getState("latest_version")) != (await a.getLocalState("version"))) {
      document.getElementsByClassName("hackletContainer")[0].innerHTML = "<div class=\"hackletUpdate styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\" style=\"\n            background-color: #d50000;\n        \"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                    padding-left: 15px;\n                \"><div class=\"styles__hwTitle___1fEu7-camelCase\" style=\"\n            color: white;\n        \">An Update Is Available\n        </div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                    margin-left: 0;\n                    color: white;\n                \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Go To The Repo To Download The New Version!\n        </div></div></div></a></div>" + document.getElementsByClassName("hackletContainer")[0].innerHTML;
    }
    var b = await a.getCurrentPlugins();
    var c = await a.getPlugins();
    for await (const i of c) {
      var d = await a.getPluginInfo(i);
      if (!d.error) {
        var e = Math.random().toString(36).slice(2, 7);
        var f;
        var g;
        if (b.includes(i) == true) {
          f = "activated";
          g = "<div class=\"hacklet_deactivateBtn styles__deleteButton___3Ynb7-camelCase\" role=\"button\" tabindex=\"0\" style=\"\n                \"><i class=\"fas fa-toggle-on styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Disable</div>";
        } else {
          f = "deactivated";
          g = "<div class=\"hacklet_activateBtn styles__deleteButton___3Ynb7-camelCase\" role=\"button\" tabindex=\"0\" style=\"\n                \"><i style=\"transform: rotate(-180deg);\" class=\"fas fa-toggle-on styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Enable</div>";
        }
        var h = "<div state=\"" + f + "\" name=\"" + i + "\" class=\"hackletItem styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n            padding-left: 15px;\n        \"><div class=\"styles__hwTitle___1fEu7-camelCase\">" + d.name + "</div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n            margin-left: 0;\n        \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By " + d.author + "</div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n        \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version " + d.version + "</div></div></div></a>" + g + "<div class=\"styles__deleteButton___3Ynb7-camelCase " + e + "\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-trash-alt styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Delete</div></div>";
        document.getElementsByClassName("hackletContainer")[0].innerHTML += h;
      }
      ;
    }
    ;
    for await (const b of document.getElementsByClassName("hackletContainer")[0].childNodes) {
      if (b.classList && b.classList[0] != "hackletUpdate") {
        if (b.childNodes[2]) {
          b.childNodes[2].addEventListener("click", a.removePlugin.bind(null, event, b.getAttribute("name")));
        }
        if (b.childNodes[1] && b.getAttribute("state") == "activated") {
          b.childNodes[1].addEventListener("click", a.removeCurrentPlugins.bind(null, event, b.getAttribute("name")));
        }
        if (b.childNodes[1] && b.getAttribute("state") == "deactivated") {
          b.childNodes[1].addEventListener("click", a.addCurrentPlugins.bind(null, event, b.getAttribute("name")));
        }
      }
      ;
    }
    ;
  },
  loadThemes: async function () {
    console.log("Loading Themes");
    if (parseFloat(await a.getState("latest_version")) > parseFloat(await a.getLocalState("version"))) {
      document.getElementsByClassName("hackletContainer")[0].innerHTML = "<div class=\"hackletUpdate styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\" style=\"\n            background-color: #d50000;\n        \"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                    padding-left: 15px;\n                \"><div class=\"styles__hwTitle___1fEu7-camelCase\" style=\"\n            color: white;\n        \">An Update Is Available\n        </div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                    margin-left: 0;\n                    color: white;\n                \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Go To The Repo To Download The New Version!\n        </div></div></div></a></div>" + document.getElementsByClassName("hackletContainer")[0].innerHTML;
    }
    for await (const e of await a.getThemes()) {
      var b = await a.getThemeInfo(e);
      if (!b.error) {
        var c = Math.random().toString(36).slice(2, 7);
        var d = "<div name=\"" + e + "\" class=\"hackletItem styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n            padding-left: 15px;\n        \"><div class=\"styles__hwTitle___1fEu7-camelCase\">" + b.name + "</div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n            margin-left: 0;\n        \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By " + b.author + "</div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n        \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version " + b.version + "</div></div></div></a><div class=\"styles__deleteButton___3Ynb7-camelCase " + c + "\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-trash-alt styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Delete</div></div>";
        document.getElementsByClassName("hackletContainer")[0].innerHTML += d;
      }
      ;
    }
    ;
    for await (const b of document.getElementsByClassName("hackletContainer")[0].childNodes) {
      if (b && b.classList[0] != "hackletUpdate") {
        var e = b.firstChild;
        var f = b.getAttribute("name");
        e.addEventListener("click", a.setCurrentTheme.bind(null, event, f));
        if (b.childNodes[1]) {
          b.childNodes[1].addEventListener("click", a.removeTheme.bind(null, event, f));
        }
      }
      ;
    }
    ;
  },
  getPlugins: async function () {
    return await a.readLocalStorage("hackletPlugins");
  },
  getThemes: async function () {
    return await a.readLocalStorage("hackletThemes");
  },
  resetPlugins: function () {
    chrome.storage.local.set({
      hackletPlugins: []
    }, function () {
      console.log("Reset Plugins");
    });
  },
  resetThemes: function () {
    chrome.storage.local.set({
      hackletThemes: []
    }, function () {
      console.log("Reset Themes");
    });
  },
  addPlugin: async function (b, c, d) {
    console.log(d.srcElement.parentElement);
    var e;
    if (d.srcElement.classList.contains("styles__deleteButton___3Ynb7-camelCase") === true) {
      e = d.srcElement.parentElement;
    } else {
      e = d.srcElement.parentElement.parentElement;
    }
    ;
    var f = await a.getPlugins();
    if (f.includes(c) == false) {
      f.push(c);
      var g = {
        hackletPlugins: f
      };
      chrome.storage.local.set(g, function () {
        a.loadPlugins();
        a.loadPluginsModel();
        console.log("Added Plugin: " + c);
      });
    }
    ;
  },
  addTheme: async function (b, c, d) {
    console.log(d.srcElement.parentElement);
    var e;
    if (d.srcElement.classList.contains("styles__deleteButton___3Ynb7-camelCase") === true) {
      e = d.srcElement.parentElement;
    } else {
      e = d.srcElement.parentElement.parentElement;
    }
    ;
    var f = await a.getThemes();
    if (f.includes(c) == false) {
      f.push(c);
      var g = {
        hackletThemes: f
      };
      chrome.storage.local.set(g, function () {
        a.loadThemes();
        a.loadThemesModel();
        console.log("Added Theme: " + c);
      });
    }
    ;
  },
  removeTheme: async function (b, c, d) {
    console.log(d.srcElement.parentElement);
    var e;
    if (d.srcElement.classList.contains("styles__deleteButton___3Ynb7-camelCase") === true) {
      e = d.srcElement.parentElement;
    } else {
      e = d.srcElement.parentElement.parentElement;
    }
    ;
    var f = await a.getThemes();
    var g = f.filter(function (a) {
      return a !== c;
    });
    var h = {
      hackletThemes: g
    };
    chrome.storage.local.set(h, async function () {
      var b = await a.getCurrentTheme();
      if (b == c) {
        a.resetCurrentTheme();
      }
      e.remove();
      console.log("Removed Theme: " + c);
    });
  },
  removePlugin: async function (b, c, d) {
    console.log(d.srcElement.parentElement);
    var e;
    if (d.srcElement.classList.contains("styles__deleteButton___3Ynb7-camelCase") === true) {
      e = d.srcElement.parentElement;
    } else {
      e = d.srcElement.parentElement.parentElement;
    }
    ;
    var f = await a.getPlugins();
    var g = f.filter(function (a) {
      return a !== c;
    });
    var h = {
      hackletPlugins: g
    };
    chrome.storage.local.set(h, async function () {
      var b = await a.getCurrentPlugins();
      if (b == c) {
        a.removeCurrentPluginsNoEvt(c);
      }
      e.remove();
      console.log("Removed Plugin: " + c);
    });
  },
  checkPlugin: async function (a) {
    var b = (await fetch("https://raw.githubusercontent.com/The-Blooket-Hacks/Extension-Database/main/Public/Scripts/" + a + ".js")).status;
    if (b == 200) {
      return true;
    } else {
      return false;
    }
    ;
  },
  checkTheme: async function (a) {
    var b = (await fetch("https://raw.githubusercontent.com/The-Blooket-Hacks/Extension-Database/main/Public/Themes/" + a + ".css")).status;
    if (b == 200) {
      return true;
    } else {
      return false;
    }
    ;
  },
  getPluginSearch: async function () {
    var b = document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").value;
    var c = await a.request("https://api.github.com/repos/The-Blooket-Hacks/Extension-Database/contents/Public/Scripts/");
    if (!JSON.parse(await c).message) {
      var d = [];
      var e = await JSON.parse(await c);
      for (const b of await e) {
        var c = await a.request("https://api.github.com/repos/The-Blooket-Hacks/Extension-Database/contents/Public/Scripts/" + b.name + "/");
        var e = await JSON.parse(await c);
        for await (const b of await e) {
          var f = b.path.replace("Public/Scripts/", "").replace(".js", "");
          var g = await a.getPluginInfo(f);
          if (!g.error) {
            var h = {
              name: g.name.replace("\n", ""),
              author: g.author.replace("\n", ""),
              id: f.replace("\n", ""),
              version: g.version.replace("\n", "")
            };
            d.push(h);
          }
          ;
        }
        ;
      }
      ;
      if (b != "" && b != " ") {
        function a(a, b) {
          return function (c, d, e) {
            return c[a].search(b) !== -1;
          };
        }
        Array.prototype.unique = function () {
          var a = this.concat();
          for (var b = 0; b < a.length; ++b) {
            for (var c = b + 1; c < a.length; ++c) {
              if (a[b] === a[c]) {
                a.splice(c--, 1);
              }
            }
          }
          return a;
        };
        var i = a("name", new RegExp("" + b, "i"));
        var j = a("author", new RegExp("" + b, "i"));
        var k = a("id", new RegExp("" + b, "i"));
        var l = a("version", new RegExp("" + b, "i"));
        var m = d.filter(i);
        var n = d.filter(j);
        var o = d.filter(k);
        var p = d.filter(l);
        var q = [];
        var r = m.concat(n).unique().concat(o).unique().concat(p).unique();
      } else {
        var q = [];
        var r = d;
      }
      for (const a of await r) {
        q.push(a.id);
      }
      ;
      if (document.getElementsByClassName("hackletModelContainer")[0]) {
        document.getElementsByClassName("hackletModelContainer")[0].innerHTML = "";
      }
      for (const b of await q) {
        var s = await a.getPluginInfo(b);
        if (!s.error) {
          var t = Math.random().toString(36).slice(2, 7);
          var u = "<div name=\"" + b + "\" class=\"hackletItem styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                padding-left: 15px;\n            \"><div class=\"styles__hwTitle___1fEu7-camelCase\">" + s.name + "\n    </div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                margin-left: 0;\n            \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By " + s.author + "\n    </div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n            \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version " + s.version + "\n    </div></div></div></a><div class=\"hacklet_addBtn styles__deleteButton___3Ynb7-camelCase " + t + "\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-plus styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Add</div></div>";
          document.getElementsByClassName("hackletModelContainer")[0].innerHTML += u;
        }
        ;
      }
      ;
      console.log(q);
    } else {
      if (document.getElementsByClassName("hackletModelContainer")[0]) {
        document.getElementsByClassName("hackletModelContainer")[0].innerHTML = "<div style=\"color: #ce1313;font-size: 20px;padding-top: 20px;\">You have exceeded the limit! Come back later!</div>";
      }
      if (document.querySelector(".arts__modal___VpEAD-camelCase > .styles__mainContainer___F-l_7-camelCase > div > .styles__searchBar___3WXOq-camelCase")) {
        document.querySelector(".arts__modal___VpEAD-camelCase > .styles__mainContainer___F-l_7-camelCase > div > .styles__searchBar___3WXOq-camelCase").childNodes[1].setAttribute("readonly", "");
      }
    }
    ;
  },
  getThemeSearch: async function () {
    var b = document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").value;
    var c = await a.request("https://api.github.com/repos/The-Blooket-Hacks/Extension-Database/contents/Public/Themes/");
    if (!JSON.parse(await c).message) {
      var d = [];
      var e = await JSON.parse(await c);
      for (const b of await e) {
        var c = await a.request("https://api.github.com/repos/The-Blooket-Hacks/Extension-Database/contents/Public/Themes/" + b.name + "/");
        var e = await JSON.parse(await c);
        for await (const b of await e) {
          var f = b.path.replace("Public/Themes/", "").replace(".css", "");
          var g = await a.getThemeInfo(f);
          if (!g.error) {
            var h = {
              name: g.name.replace("\n", ""),
              author: g.author.replace("\n", ""),
              id: f.replace("\n", ""),
              version: g.version.replace("\n", "")
            };
            d.push(h);
          }
          ;
        }
        ;
      }
      ;
      if (b != "" && b != " ") {
        function a(a, b) {
          return function (c, d, e) {
            return c[a].search(b) !== -1;
          };
        }
        Array.prototype.unique = function () {
          var a = this.concat();
          for (var b = 0; b < a.length; ++b) {
            for (var c = b + 1; c < a.length; ++c) {
              if (a[b] === a[c]) {
                a.splice(c--, 1);
              }
            }
          }
          return a;
        };
        var i = a("name", new RegExp("" + b, "i"));
        var j = a("author", new RegExp("" + b, "i"));
        var k = a("id", new RegExp("" + b, "i"));
        var l = a("version", new RegExp("" + b, "i"));
        var m = d.filter(i);
        var n = d.filter(j);
        var o = d.filter(k);
        var p = d.filter(l);
        var q = [];
        var r = m.concat(n).unique().concat(o).unique().concat(p).unique();
      } else {
        var q = [];
        var r = d;
      }
      for (const a of await r) {
        q.push(a.id);
      }
      ;
      if (document.getElementsByClassName("hackletModelContainer")[0]) {
        document.getElementsByClassName("hackletModelContainer")[0].innerHTML = "";
      }
      for (const b of await q) {
        var s = await a.getThemeInfo(b);
        if (!s.error) {
          var t = Math.random().toString(36).slice(2, 7);
          var u = "<div name=\"" + b + "\" class=\"hackletItem styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                padding-left: 15px;\n            \"><div class=\"styles__hwTitle___1fEu7-camelCase\">" + s.name + "\n    </div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                margin-left: 0;\n            \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By " + s.author + "\n    </div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n            \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version " + s.version + "\n    </div></div></div></a><div class=\"hacklet_addBtn styles__deleteButton___3Ynb7-camelCase " + t + "\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-plus styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Add</div></div>";
          document.getElementsByClassName("hackletModelContainer")[0].innerHTML += u;
        }
        ;
      }
      ;
      console.log(q);
    } else {
      if (document.getElementsByClassName("hackletModelContainer")[0]) {
        document.getElementsByClassName("hackletModelContainer")[0].innerHTML = "<div style=\"color: #ce1313;font-size: 20px;padding-top: 20px;\">You have exceeded the limit! Come back later!</div>";
      }
      if (document.querySelector(".arts__modal___VpEAD-camelCase > .styles__mainContainer___F-l_7-camelCase > div > .styles__searchBar___3WXOq-camelCase")) {
        document.querySelector(".arts__modal___VpEAD-camelCase > .styles__mainContainer___F-l_7-camelCase > div > .styles__searchBar___3WXOq-camelCase").childNodes[1].setAttribute("readonly", "");
      }
    }
    ;
  },
  addPluginsModel: async function () {
    var b = document.createElement("div");
    var c = "<div class=\"styles__mainContainer___F-l_7-camelCase\" style=\"\n        min-width: 700px;\n        max-width: 800px;\n        min-height: 550px;\n        max-height: 650px;\n    \"><style>.hacklet_addBtn:hover {color: #10b513;}</style><i class=\"hacklet_closeModel styles__closeIcon___2QOPB-camelCase fas fa-times\" role=\"button\" tabindex=\"0\" aria-hidden=\"true\"></i><div style=\"\n        margin: 10px auto;\n        display: flex;\n    \"><div class=\"styles__stepHeader___2w9rW-camelCase\" style=\"\n        margin: 0px;\n        display: flex;\n        margin-right: 20px;\n    \">Available Plugins</div><div class=\"styles__searchBar___3WXOq-camelCase\" style=\"\n        border-radius: 10px;\n        margin-right: 20px;\n    \"><i class=\"fas fa-search styles__searchIcon___2h8ZI-camelCase\" aria-hidden=\"true\"></i><input class=\"styles__searchInput___D1V4I-camelCase\" placeholder=\"Search plugins...\" type=\"text\" value=\"\"></div></div><div><div class=\"hackletModelContainer styles__homeworksContainer___1iE9E-camelCase\"><div name=\"Hacklet/example\" class=\"hackletItem styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                padding-left: 15px;\n            \"><div class=\"styles__hwTitle___1fEu7-camelCase\">Default Blooket Theme\n    </div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                margin-left: 0;\n            \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By Hacklet\n    </div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n            \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version 0.1\n    </div></div></div></a><div class=\"hacklet_addBtn styles__deleteButton___3Ynb7-camelCase j3nob\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-plus styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Add</div></div></div></div></div>";
    document.querySelector(a.blooketBodyQuery).appendChild(b);
    document.querySelector(a.blooketBodyQuery).lastChild.classList.add("arts__modal___VpEAD-camelCase");
    document.querySelector(a.blooketBodyQuery).lastChild.innerHTML = c;
    document.body.getElementsByClassName("hacklet_closeModel")[0].addEventListener("click", function () {
      document.querySelector(a.blooketBodyQuery).lastChild.remove();
      return true;
    });
    document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").addEventListener("input", function (b) {
      if (document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").value == "" || document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").value == " ") {
        console.log("Detected change");
        a.getPluginSearch();
      }
      ;
    });
    document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").onkeypress = b => {
      const c = b.keyCode;
      if (c === 13) {
        console.log("Detected change");
        a.getPluginSearch();
      }
      ;
    };
    a.loadPluginsModel();
  },
  addThemesModel: async function () {
    var b = document.createElement("div");
    var c = "<div class=\"styles__mainContainer___F-l_7-camelCase\" style=\"\n        min-width: 700px;\n        max-width: 800px;\n        min-height: 550px;\n        max-height: 650px;\n    \"><style>.hacklet_addBtn:hover {color: #10b513;}</style><i class=\"hacklet_closeModel styles__closeIcon___2QOPB-camelCase fas fa-times\" role=\"button\" tabindex=\"0\" aria-hidden=\"true\"></i><div style=\"\n        margin: 10px auto;\n        display: flex;\n    \"><div class=\"styles__stepHeader___2w9rW-camelCase\" style=\"\n        margin: 0px;\n        display: flex;\n        margin-right: 20px;\n    \">Available Themes</div><div class=\"styles__searchBar___3WXOq-camelCase\" style=\"\n        border-radius: 10px;\n        margin-right: 20px;\n    \"><i class=\"fas fa-search styles__searchIcon___2h8ZI-camelCase\" aria-hidden=\"true\"></i><input class=\"styles__searchInput___D1V4I-camelCase\" placeholder=\"Search themes...\" type=\"text\" value=\"\"></div></div><div><div class=\"hackletModelContainer styles__homeworksContainer___1iE9E-camelCase\"><div name=\"Hacklet/example\" class=\"hackletItem styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                padding-left: 15px;\n            \"><div class=\"styles__hwTitle___1fEu7-camelCase\">Default Blooket Theme\n    </div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                margin-left: 0;\n            \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By Hacklet\n    </div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n            \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version 0.1\n    </div></div></div></a><div class=\"hacklet_addBtn styles__deleteButton___3Ynb7-camelCase j3nob\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-plus styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Add</div></div></div></div></div>";
    document.querySelector(a.blooketBodyQuery).appendChild(b);
    document.querySelector(a.blooketBodyQuery).lastChild.classList.add("arts__modal___VpEAD-camelCase");
    document.querySelector(a.blooketBodyQuery).lastChild.innerHTML = c;
    document.body.getElementsByClassName("hacklet_closeModel")[0].addEventListener("click", function () {
      document.querySelector(a.blooketBodyQuery).lastChild.remove();
      return true;
    });
    document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").addEventListener("input", function (b) {
      if (document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").value == "" || document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").value == " ") {
        console.log("Detected change");
        a.getThemeSearch();
      }
      ;
    });
    document.querySelector(".arts__modal___VpEAD-camelCase .styles__mainContainer___F-l_7-camelCase .styles__searchBar___3WXOq-camelCase input").onkeypress = b => {
      const c = b.keyCode;
      if (c === 13) {
        console.log("Detected change");
        a.getThemeSearch();
      }
      ;
    };
    a.loadThemesModel();
  },
  loadPluginsModel: async function () {
    if (document.getElementsByClassName("hackletModelContainer")[0]) {
      document.getElementsByClassName("hackletModelContainer")[0].innerHTML = "";
    }
    var b = await a.request("https://api.github.com/repos/The-Blooket-Hacks/Extension-Database/contents/Public/Scripts/");
    if (!JSON.parse(await b).message) {
      var c = await JSON.parse(await b);
      for await (const i of await c) {
        var b = await a.request("https://api.github.com/repos/The-Blooket-Hacks/Extension-Database/contents/Public/Scripts/" + i.name + "/");
        var c = await JSON.parse(await b);
        for await (const b of await c) {
          var d = b.path.replace("Public/Scripts/", "").replace(".js", "");
          var e = await a.getPlugins();
          if (e.includes(d) == false) {
            var f = await a.getPluginInfo(d);
            if (!f.error) {
              var g = Math.random().toString(36).slice(2, 7);
              var h = "<div name=\"" + d + "\" class=\"hackletItem styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                padding-left: 15px;\n            \"><div class=\"styles__hwTitle___1fEu7-camelCase\">" + f.name + "\n    </div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                margin-left: 0;\n            \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By " + f.author + "\n    </div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n            \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version " + f.version + "\n    </div></div></div></a><div class=\"hacklet_addBtn styles__deleteButton___3Ynb7-camelCase " + g + "\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-plus styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Add</div></div>";
              document.getElementsByClassName("hackletModelContainer")[0].innerHTML += h;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      for await (const b of document.getElementsByClassName("hackletModelContainer")[0].childNodes) {
        var i = b.childNodes[1];
        var j = b.getAttribute("name");
        i.addEventListener("click", a.addPlugin.bind(null, event, j));
      }
      ;
    } else {
      if (document.getElementsByClassName("hackletModelContainer")[0]) {
        document.getElementsByClassName("hackletModelContainer")[0].innerHTML = "<div style=\"color: #ce1313;font-size: 20px;padding-top: 20px;\">You have exceeded the limit! Come back later!</div>";
      }
      if (document.querySelector(".arts__modal___VpEAD-camelCase > .styles__mainContainer___F-l_7-camelCase > div > .styles__searchBar___3WXOq-camelCase")) {
        document.querySelector(".arts__modal___VpEAD-camelCase > .styles__mainContainer___F-l_7-camelCase > div > .styles__searchBar___3WXOq-camelCase").childNodes[1].setAttribute("readonly", "");
      }
    }
    ;
  },
  loadThemesModel: async function () {
    if (document.getElementsByClassName("hackletModelContainer")[0]) {
      document.getElementsByClassName("hackletModelContainer")[0].innerHTML = "";
    }
    var b = await a.request("https://api.github.com/repos/The-Blooket-Hacks/Extension-Database/contents/Public/Themes/");
    if (!JSON.parse(await b).message) {
      var c = await JSON.parse(await b);
      for await (const i of await c) {
        var b = await a.request("https://api.github.com/repos/The-Blooket-Hacks/Extension-Database/contents/Public/Themes/" + i.name + "/");
        var c = await JSON.parse(await b);
        for await (const b of await c) {
          var d = b.path.replace("Public/Themes/", "").replace(".css", "");
          var e = await a.getThemes();
          if (e.includes(d) == false) {
            var f = await a.getThemeInfo(d);
            if (!f.error) {
              var g = Math.random().toString(36).slice(2, 7);
              var h = "<div name=\"" + d + "\" class=\"hackletItem styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                padding-left: 15px;\n            \"><div class=\"styles__hwTitle___1fEu7-camelCase\">" + f.name + "\n    </div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                margin-left: 0;\n            \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By " + f.author + "\n    </div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n            \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version " + f.version + "\n    </div></div></div></a><div class=\"hacklet_addBtn styles__deleteButton___3Ynb7-camelCase " + g + "\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-plus styles__trashIcon___3Vk8Z-camelCase\" aria-hidden=\"true\"></i>Add</div></div>";
              document.getElementsByClassName("hackletModelContainer")[0].innerHTML += h;
            }
            ;
          }
          ;
        }
        ;
      }
      ;
      for await (const b of document.getElementsByClassName("hackletModelContainer")[0].childNodes) {
        var i = b.childNodes[1];
        var j = b.getAttribute("name");
        i.addEventListener("click", a.addTheme.bind(null, event, j));
      }
      ;
    } else {
      if (document.getElementsByClassName("hackletModelContainer")[0]) {
        document.getElementsByClassName("hackletModelContainer")[0].innerHTML = "<div style=\"color: #ce1313;font-size: 20px;padding-top: 20px;\">You have exceeded the limit! Come back later!</div>";
      }
      if (document.querySelector(".arts__modal___VpEAD-camelCase > .styles__mainContainer___F-l_7-camelCase > div > .styles__searchBar___3WXOq-camelCase")) {
        document.querySelector(".arts__modal___VpEAD-camelCase > .styles__mainContainer___F-l_7-camelCase > div > .styles__searchBar___3WXOq-camelCase").childNodes[1].setAttribute("readonly", "");
      }
    }
    ;
  },
  alert: function (b) {
    var c = document.createElement("div");
    var d = "<form class=\"styles__container___1BPm9-camelCase\"><div class=\"styles__text___KSL4--camelCase\"><div><div class=\"__react_component_tooltip t297e99a3-e9f3-4212-af96-a9496d33840e place-left type-dark allow_click\"id=\"t297e99a3-e9f3-4212-af96-a9496d33840e\"data-id=\"tooltip\"><style aria-hidden=\"true\">.t297e99a3-e9f3-4212-af96-a9496d33840e{color:#fff;background:#222;border:1px solid transparent;border-radius:undefinedpx;padding:8px 21px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-top{margin-top:-10px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-top::before{content:\"\";background-color:inherit;position:absolute;z-index:2;width:20px;height:12px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-top::after{content:\"\";position:absolute;width:10px;height:10px;border-top-right-radius:undefinedpx;border:1px solid transparent;background-color:#222;z-index:-2;bottom:-6px;left:50%;margin-left:-6px;transform:rotate(135deg)}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-bottom{margin-top:10px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-bottom::before{content:\"\";background-color:inherit;position:absolute;z-index:-1;width:18px;height:10px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-bottom::after{content:\"\";position:absolute;width:10px;height:10px;border-top-right-radius:undefinedpx;border:1px solid transparent;background-color:#222;z-index:-2;top:-6px;left:50%;margin-left:-6px;transform:rotate(45deg)}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-left{margin-left:-10px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-left::before{content:\"\";background-color:inherit;position:absolute;z-index:-1;width:10px;height:18px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-left::after{content:\"\";position:absolute;width:10px;height:10px;border-top-right-radius:undefinedpx;border:1px solid transparent;background-color:#222;z-index:-2;right:-6px;top:50%;margin-top:-6px;transform:rotate(45deg)}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-right{margin-left:10px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-right::before{content:\"\";background-color:inherit;position:absolute;z-index:-1;width:10px;height:18px}.t297e99a3-e9f3-4212-af96-a9496d33840e.place-right::after{content:\"\";position:absolute;width:10px;height:10px;border-top-right-radius:undefinedpx;border:1px solid transparent;background-color:#222;z-index:-2;left:-6px;top:50%;margin-top:-6px;transform:rotate(-135deg)}</style></div>" + b + "</div></div><div class=\"styles__holder___3CEfN-camelCase\"><div class=\"styles__buttonContainer___2EaVD-camelCase\"><div id=\"confirmButton\"class=\"styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase\"role=\"button\"tabindex=\"0\"><div class=\"styles__shadow___3GMdH-camelCase\"></div><div class=\"styles__edge___3eWfq-camelCase\"style=\"background-color: rgb(11, 194, 207);\"></div><div class=\"styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase\"style=\"background-color: rgb(11, 194, 207);\">Okay</div></div></div></div><input type=\"submit\"style=\"opacity: 0; display: none;\"></form>";
    document.querySelector(a.blooketBodyQuery).appendChild(c);
    document.querySelector(a.blooketBodyQuery).lastChild.classList.add("arts__modal___VpEAD-camelCase");
    document.querySelector(a.blooketBodyQuery).lastChild.innerHTML = d;
    document.getElementById("confirmButton").addEventListener("click", function () {
      document.querySelector(a.blooketBodyQuery).lastChild.remove();
      return true;
    });
  },
  prompt: function (b, c, d) {
    var e = document.createElement("div");
    var f = "<form class=\"styles__container___1BPm9-camelCase\"><div class=\"styles__text___KSL4--camelCase\">" + b + "</div><div class=\"styles__holder___3CEfN-camelCase\"><div class=\"styles__numRow___xh98F-camelCase\"><div class=\"styles__inputContainer___2Fn7J-camelCase styles__inputFilled___3AmpF-camelCase\" style=\"width: 220px; margin: 0px;\"><input id=\"hackletInputBox\" class=\"styles__input___2vJSW-camelCase\" placeholder=\"" + c + "\" value=\"\" style=\"width: 200px; height: 30px; transform:translate(0, 2px); text-align:center;\"></div></div><div class=\"styles__buttonContainer___2EaVD-camelCase\"><div class=\"styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase\" role=\"button\" id=\"cnclBtn\" tabindex=\"0\"><div class=\"styles__shadow___3GMdH-camelCase\"></div><div class=\"styles__edge___3eWfq-camelCase\" style=\"background-color: rgb(11, 194, 207);\"></div><div class=\"styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase\" style=\"background-color: rgb(11, 194, 207);\">Cancel</div></div><div class=\"styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase\" id=\"confirmBtn\" role=\"button\" tabindex=\"0\"><div class=\"styles__shadow___3GMdH-camelCase\"></div><div class=\"styles__edge___3eWfq-camelCase\" style=\"background-color: rgb(11, 194, 207);\"></div><div class=\"styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase\" style=\"background-color: rgb(11, 194, 207);\">Okay</div></div></div></div><input type=\"submit\" style=\"opacity: 0; display: none;\"></form>";
    document.querySelector(a.blooketBodyQuery).appendChild(e);
    document.querySelector(a.blooketBodyQuery).lastChild.classList.add("arts__modal___VpEAD-camelCase");
    document.querySelector(a.blooketBodyQuery).lastChild.innerHTML = f;
    document.getElementById("cnclBtn").addEventListener("click", function () {
      document.querySelector("#app > div > div").lastChild.remove();
    });
    document.getElementById("confirmBtn").addEventListener("click", async function () {
      if (document.getElementById("hackletInputBox").value != "" && a.isPattern(document.getElementById("hackletInputBox").value) === true) {
        var c;
        if (b == "What Is The Id Of The Plugin?") {
          c = await a.checkPlugin(document.getElementById("hackletInputBox").value);
        }
        if (b != "What Is The Id Of The Plugin?") {
          c = await a.checkTheme(document.getElementById("hackletInputBox").value);
        }
        if (c == true) {
          var e = document.getElementById("hackletInputBox").value;
          document.querySelector(a.blooketBodyQuery).lastChild.remove();
          d(e);
        }
        ;
      }
      ;
    });
  },
  reloadPage: function () {
    location.reload();
  },
  pluginsLoad: async function () {
    var b = await a.getPlugins();
    if (!b || b.constructor !== Array) {
      a.resetPlugins();
      a.resetCurrentPlugins();
    }
    console.log(await a.getPlugins());
    var c = document.getElementsByClassName("styles__pageSelected___MugaH-camelCase")[0];
    if (a.pageBtnHtml[location.pathname.replace("/", "")] && c.innerHTML.split("<div class=\"styles__pageText___1eo7q-camelCase\">")[1].split("</div>")[0] == a.pageBtnHtml[location.pathname.replace("/", "")]) {
      c.addEventListener("click", a.reloadPage);
    }
    if (a.smallBtnHtml[location.pathname.replace("/", "")]) {
      var c = document.getElementsByClassName("styles__smallButton___sQuq8-camelCase")[a.smallBtnHtml[location.pathname.replace("/", "")] - 1];
      c.addEventListener("click", a.reloadPage);
    }
    ;
    if (document.getElementsByClassName("styles__pageSelected___MugaH-camelCase")[0]) {
      document.getElementsByClassName("styles__pageSelected___MugaH-camelCase")[0].classList.remove("styles__pageSelected___MugaH-camelCase");
    }
    document.getElementsByClassName("hackletPluginsBTN")[0].classList.add("styles__pageSelected___MugaH-camelCase");
    var d;
    if (location.pathname != "/stats") {
      d = document.getElementsByClassName("arts__profileBody___eNPbH-camelCase")[0];
    } else {
      if (document.getElementsByClassName("styles__background___2J-JA-camelCase")[0]) {
        document.getElementsByClassName("styles__background___2J-JA-camelCase")[0].remove();
      }
      d = document.getElementsByClassName("arts__profileBodyMax___3SXtp-camelCase")[0];
    }
    ;
    document.getElementsByTagName("title")[0].innerHTML = "Plugins | Blooket";
    if ((await a.getState("disabled")) == "false") {
      d.innerHTML = "<style>.hacklet_deactivateBtn:hover {color: #ce1313;} .hacklet_activateBtn:hover {color: #10b513;}</style><div class=\"styles__header___1nw_w-camelCase\">Plugins</div><div class=\"hackletContainer styles__homeworksContainer___1iE9E-camelCase\">\n</div>";
      a.loadPlugins();
      if (document.getElementsByClassName("styles__topFolderButton___2OaKp-camelCase")[0]) {
        document.getElementsByClassName("styles__topFolderButton___2OaKp-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__searchBar___1BqiF-camelCase")[0]) {
        document.getElementsByClassName("styles__searchBar___1BqiF-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__tokenBalance___1FHgT-camelCase")[0]) {
        document.getElementsByClassName("styles__tokenBalance___1FHgT-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__searchBar___3WXOq-camelCase")[0]) {
        document.getElementsByClassName("styles__searchBar___3WXOq-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__topFolderButton___1_bXd-camelCase")[0]) {
        document.getElementsByClassName("styles__topFolderButton___1_bXd-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("hackletAddNew")[0]) {
        document.getElementsByClassName("hackletAddNew")[0].remove();
      }
      if (document.getElementsByClassName("hackletHelp")[0]) {
        document.getElementsByClassName("hackletHelp")[0].remove();
      }
      document.getElementsByClassName("styles__topRightRow___dQvxc-camelCase")[0].innerHTML = "<div class=\"styles__topFolderButton___1_bXd-camelCase hackletAddNew\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-plus styles__topFolderIcon___2Of1g-camelCase\" aria-hidden=\"true\"></i></div><div class=\"styles__topFolderButton___1_bXd-camelCase hackletHelp\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-question styles__topFolderIcon___2Of1g-camelCase\" aria-hidden=\"true\"></i></div>" + document.getElementsByClassName("styles__topRightRow___dQvxc-camelCase")[0].innerHTML;
      var c = document.getElementsByClassName("hackletAddNew")[0];
      c.addEventListener("click", function () {
        a.addPluginsModel();
      });
      var c = document.getElementsByClassName("hackletHelp")[0];
      c.addEventListener("click", function () {
        a.alert("<div style=\"font-size: 20px;\">This is a feature added by Hacklet.<br/>Hacklet Was Made By CrazyH<br/><br/>To Download An Update Or To Submit A Bug Go To My Repo:<br/><a href=\"https://github.com/The-Blooket-Hacks/Blooket-Hacks\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: rgb(11, 194, 207);\">https://github.com/The-Blooket-Hacks/Blooket-Hacks</a></div>");
      });
    } else {
      var e = await a.getState("disabled_reason");
      d.innerHTML = "<div class=\"styles__header___1nw_w-camelCase\" style=\"\n    visibility: hidden;\n\">.</div><div class=\"hackletContainer styles__homeworksContainer___1iE9E-camelCase\">\n<div class=\"hackletDisabled styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\" style=\"\n            background-color: #d50000;\n        \"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                    padding-left: 15px;\n                \"><div class=\"styles__hwTitle___1fEu7-camelCase\" style=\"\n            color: white;\n        \">Hacklet Is Disabled!</div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                    margin-left: 0;\n                    color: white;\n                \">" + e + "</div></div></div></a></div></div>";
      if (document.getElementsByClassName("styles__topFolderButton___2OaKp-camelCase")[0]) {
        document.getElementsByClassName("styles__topFolderButton___2OaKp-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__searchBar___1BqiF-camelCase")[0]) {
        document.getElementsByClassName("styles__searchBar___1BqiF-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__tokenBalance___1FHgT-camelCase")[0]) {
        document.getElementsByClassName("styles__tokenBalance___1FHgT-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__searchBar___3WXOq-camelCase")[0]) {
        document.getElementsByClassName("styles__searchBar___3WXOq-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__topFolderButton___1_bXd-camelCase")[0]) {
        document.getElementsByClassName("styles__topFolderButton___1_bXd-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("hackletAddNew")[0]) {
        document.getElementsByClassName("hackletAddNew")[0].remove();
      }
      if (document.getElementsByClassName("hackletHelp")[0]) {
        document.getElementsByClassName("hackletHelp")[0].remove();
      }
    }
    ;
  },
  themesLoad: async function () {
    var b = await a.getThemes();
    if (!b || b.constructor !== Array) {
      a.resetThemes();
      a.resetCurrentTheme();
    }
    console.log(await a.getThemes());
    console.log(await a.getCurrentTheme());
    var c = document.getElementsByClassName("styles__pageSelected___MugaH-camelCase")[0];
    if (a.pageBtnHtml[location.pathname.replace("/", "")] && c.innerHTML.split("<div class=\"styles__pageText___1eo7q-camelCase\">")[1].split("</div>")[0] == a.pageBtnHtml[location.pathname.replace("/", "")]) {
      c.addEventListener("click", a.reloadPage);
    }
    var d = a.smallBtnHtml[location.pathname.replace("/", "")];
    if (d) {
      var c = document.getElementsByClassName("styles__smallButton___sQuq8-camelCase")[a.smallBtnHtml[location.pathname.replace("/", "")]];
      c.addEventListener("click", a.reloadPage);
    }
    ;
    if (document.getElementsByClassName("styles__pageSelected___MugaH-camelCase")[0]) {
      document.getElementsByClassName("styles__pageSelected___MugaH-camelCase")[0].classList.remove("styles__pageSelected___MugaH-camelCase");
    }
    document.getElementsByClassName("hackletThemesBTN")[0].classList.add("styles__pageSelected___MugaH-camelCase");
    var e;
    if (location.pathname != "/stats") {
      e = document.getElementsByClassName("arts__profileBody___eNPbH-camelCase")[0];
    } else {
      if (document.getElementsByClassName("styles__background___2J-JA-camelCase")[0]) {
        document.getElementsByClassName("styles__background___2J-JA-camelCase")[0].remove();
      }
      e = document.getElementsByClassName("arts__profileBodyMax___3SXtp-camelCase")[0];
    }
    ;
    document.getElementsByTagName("title")[0].innerHTML = "Themes | Blooket";
    if ((await a.getState("disabled")) == "false") {
      e.innerHTML = "<div class=\"styles__header___1nw_w-camelCase\">Themes</div><div class=\"hackletContainer styles__homeworksContainer___1iE9E-camelCase\"><div name=\"Blooket/default\" class=\"styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n        padding-left: 15px;\n    \"><div class=\"styles__hwTitle___1fEu7-camelCase\">Default Blooket Theme</div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n        margin-left: 0;\n    \"><i class=\"fas fa-user styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>By Blooket</div><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n        \"><i class=\"fas fa-file styles__infoIcon___2kaWH-camelCase\" aria-hidden=\"true\"></i>Version 1.0\n</div></div></div></a></div></div>";
      a.loadThemes();
      if (document.getElementsByClassName("styles__searchBar___1BqiF-camelCase")[0]) {
        document.getElementsByClassName("styles__searchBar___1BqiF-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__topFolderButton___2OaKp-camelCase")[0]) {
        document.getElementsByClassName("styles__topFolderButton___2OaKp-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__tokenBalance___1FHgT-camelCase")[0]) {
        document.getElementsByClassName("styles__tokenBalance___1FHgT-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__searchBar___3WXOq-camelCase")[0]) {
        document.getElementsByClassName("styles__searchBar___3WXOq-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__topFolderButton___1_bXd-camelCase")[0]) {
        document.getElementsByClassName("styles__topFolderButton___1_bXd-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("hackletAddNew")[0]) {
        document.getElementsByClassName("hackletAddNew")[0].remove();
      }
      if (document.getElementsByClassName("hackletHelp")[0]) {
        document.getElementsByClassName("hackletHelp")[0].remove();
      }
      document.getElementsByClassName("styles__topRightRow___dQvxc-camelCase")[0].innerHTML = "<div class=\"styles__topFolderButton___1_bXd-camelCase hackletAddNew\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-plus styles__topFolderIcon___2Of1g-camelCase\" aria-hidden=\"true\"></i></div><div class=\"styles__topFolderButton___1_bXd-camelCase hackletHelp\" role=\"button\" tabindex=\"0\"><i class=\"fas fa-question styles__topFolderIcon___2Of1g-camelCase\" aria-hidden=\"true\"></i></div>" + document.getElementsByClassName("styles__topRightRow___dQvxc-camelCase")[0].innerHTML;
      var c = document.getElementsByClassName("hackletAddNew")[0];
      c.addEventListener("click", function () {
        a.addThemesModel();
      });
      var c = document.getElementsByClassName("hackletHelp")[0];
      c.addEventListener("click", function () {
        a.alert("<div style=\"font-size: 20px;\">This is a feature added by Hacklet.<br/>Hacklet Was Made By CrazyH<br/><br/>To Download An Update Or To Submit A Bug Go To My Repo:<br/><a href=\"https://github.com/The-Blooket-Hacks/Blooket-Hacks\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: rgb(11, 194, 207);\">https://github.com/The-Blooket-Hacks/Blooket-Hacks</a></div>");
      });
    } else {
      var f = await a.getState("disabled_reason");
      e.innerHTML = "<div class=\"styles__header___1nw_w-camelCase\" style=\"\n    visibility: hidden;\n\">.</div><div class=\"hackletContainer styles__homeworksContainer___1iE9E-camelCase\">\n<div class=\"hackletDisabled styles__gameHolder___EfOCM-camelCase\"><a class=\"styles__container___11GoR-camelCase\" style=\"\n            background-color: #d50000;\n        \"><div class=\"styles__textContainer___Rj2a6-camelCase\" style=\"\n                    padding-left: 15px;\n                \"><div class=\"styles__hwTitle___1fEu7-camelCase\" style=\"\n            color: white;\n        \">Hacklet Is Disabled!</div><div class=\"styles__infoRow___oxmIG-camelCase\"><div class=\"styles__info___hV7Eh-camelCase\" style=\"\n                    margin-left: 0;\n                    color: white;\n                \">" + f + "</div></div></div></a></div></div>";
      if (document.getElementsByClassName("styles__topFolderButton___2OaKp-camelCase")[0]) {
        document.getElementsByClassName("styles__topFolderButton___2OaKp-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__searchBar___1BqiF-camelCase")[0]) {
        document.getElementsByClassName("styles__searchBar___1BqiF-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__tokenBalance___1FHgT-camelCase")[0]) {
        document.getElementsByClassName("styles__tokenBalance___1FHgT-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__searchBar___3WXOq-camelCase")[0]) {
        document.getElementsByClassName("styles__searchBar___3WXOq-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("styles__topFolderButton___1_bXd-camelCase")[0]) {
        document.getElementsByClassName("styles__topFolderButton___1_bXd-camelCase")[0].remove();
      }
      if (document.getElementsByClassName("hackletAddNew")[0]) {
        document.getElementsByClassName("hackletAddNew")[0].remove();
      }
      if (document.getElementsByClassName("hackletHelp")[0]) {
        document.getElementsByClassName("hackletHelp")[0].remove();
      }
    }
    ;
  },
  themesLoadClick: async function () {
    a.themesLoad();
  },
  pluginsLoadClick: async function () {
    a.pluginsLoad();
  }
};
const b = async a => {
  while (document.querySelector(a) === null) {
    await new Promise(a => requestAnimationFrame(a));
  }
  return document.querySelector(a);
};
b(".styles__pageButton___1wFuu-camelCase").then(b => {
  let c = 0;
  setInterval(() => {
    c++;
    if (location.pathname != "/upgrade" && document.getElementsByClassName("styles__pageButton___1wFuu-camelCase")[6].classList.contains("hacklet-updated") == false) {
      document.getElementsByClassName("styles__pageButton___1wFuu-camelCase")[6].outerHTML += "<div class=\"styles__bottomRow___3OozA-camelCase\" style=\"margin-top: 12px;color: white;font-size: 16px;\"><div class=\"__react_component_tooltip t13fed60c-da6f-465f-9f85-da26fef06e41 place-top type-dark\" id=\"t13fed60c-da6f-465f-9f85-da26fef06e41\" data-id=\"tooltip\"><style aria-hidden=\"true\">\n              .t13fed60c-da6f-465f-9f85-da26fef06e41 {\n                color: #fff;\n                background: #222;\n                border: 1px solid transparent;\n                border-radius: undefinedpx;\n                padding: 8px 21px;\n              }\n        \n              .t13fed60c-da6f-465f-9f85-da26fef06e41.place-top {\n                margin-top: -10px;\n            }\n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-top::before {\n                content: \"\";\n                background-color: inherit;\n                position: absolute;\n                z-index: 2;\n                width: 20px;\n                height: 12px;\n            }\n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-top::after {\n                content: \"\";\n                position: absolute;\n                width: 10px;\n                height: 10px;\n                border-top-right-radius: undefinedpx;\n                border: 1px solid transparent;\n                background-color: #222;\n                z-index: -2;\n                bottom: -6px;\n                left: 50%;\n                margin-left: -6px;\n                transform: rotate(135deg);\n            }\n        \n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-bottom {\n                margin-top: 10px;\n            }\n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-bottom::before {\n                content: \"\";\n                background-color: inherit;\n                position: absolute;\n                z-index: -1;\n                width: 18px;\n                height: 10px;\n            }\n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-bottom::after {\n                content: \"\";\n                position: absolute;\n                width: 10px;\n                height: 10px;\n                border-top-right-radius: undefinedpx;\n                border: 1px solid transparent;\n                background-color: #222;\n                z-index: -2;\n                top: -6px;\n                left: 50%;\n                margin-left: -6px;\n                transform: rotate(45deg);\n            }\n        \n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-left {\n                margin-left: -10px;\n            }\n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-left::before {\n                content: \"\";\n                background-color: inherit;\n                position: absolute;\n                z-index: -1;\n                width: 10px;\n                height: 18px;\n            }\n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-left::after {\n                content: \"\";\n                position: absolute;\n                width: 10px;\n                height: 10px;\n                border-top-right-radius: undefinedpx;\n                border: 1px solid transparent;\n                background-color: #222;\n                z-index: -2;\n                right: -6px;\n                top: 50%;\n                margin-top: -6px;\n                transform: rotate(45deg);\n            }\n        \n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-right {\n                margin-left: 10px;\n            }\n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-right::before {\n                content: \"\";\n                background-color: inherit;\n                position: absolute;\n                z-index: -1;\n                width: 10px;\n                height: 18px;\n            }\n            .t13fed60c-da6f-465f-9f85-da26fef06e41.place-right::after {\n                content: \"\";\n                position: absolute;\n                width: 10px;\n                height: 10px;\n                border-top-right-radius: undefinedpx;\n                border: 1px solid transparent;\n                background-color: #222;\n                z-index: -2;\n                left: -6px;\n                top: 50%;\n                margin-top: -6px;\n                transform: rotate(-135deg);\n            }\n          </style></div></div><a class=\"styles__pageButton___1wFuu-camelCase hackletThemesBTN\"><i class=\"styles__pageIcon___3OSy9-camelCase fas fa-paint-roller\" aria-hidden=\"true\"></i><div class=\"styles__pageText___1eo7q-camelCase\">Themes</div></a><a class=\"styles__pageButton___1wFuu-camelCase hackletPluginsBTN\"><i class=\"styles__pageIcon___3OSy9-camelCase fas fa-scroll\" aria-hidden=\"true\"></i><div class=\"styles__pageText___1eo7q-camelCase\">Plugins</div></a>";
      document.getElementsByClassName("styles__pageButton___1wFuu-camelCase")[6].classList.add("hacklet-updated");
      var b = document.getElementsByClassName("hackletThemesBTN")[0];
      b.addEventListener("click", a.themesLoadClick);
      var b = document.getElementsByClassName("hackletPluginsBTN")[0];
      b.addEventListener("click", a.pluginsLoadClick);
    }
    ;
  }, 100);
});
