const DNS_CODES = {
  0: "NOERROR",
  1: "FORMERR",
  2: "SERVFAIL",
  3: "NXDOMAIN",
  4: "NOTIMP",
  5: "REFUSED",
  6: "YXDOMAIN",
  7: "XRRSET",
  8: "NOTAUTH",
  9: "NOTZONE",
};

async function load_text(url) {
  return await (await fetch(url, { method: "GET" })).text();
}

async function dns_code(hostname) {
  let res = await (
    await fetch(`https://dns.google/resolve?name=${hostname}`, {
      method: "GET",
    })
  ).json();
  return DNS_CODES[[res["Status"]]];
}

async function load_list(url) {
  let arr = await load_text(url);
  list = arr.split(/\r?\n/);
  return list;
}

async function load_extensions(which = "with_words", limit = 100) {
  let list = await load_list(`./files/tlds/${which}.txt`);
  list = list.filter((e) => e.length <= limit);
  return list;
}
async function load_words(tld) {
  return await load_list(`./files/dict/${tld}.txt`);
}

var extensions_list;
var words = new Object();
var current_search_value;

async function load_files() {
  which = "infomaniak";
  extensions_list = await load_extensions();
  let datalist = document.getElementById("extensions");
  for (let ind in extensions_list) {
    elem = document.createElement("option");
    elem.setAttribute("value", extensions_list[ind]);
    datalist.appendChild(elem);
  }
}

function setup_search() {
  var typingTimer;
  var doneTypingInterval = 300;

  search = document.getElementById("search-form");
  search.removeAttribute("disabled");
  search.setAttribute("placeholder", "Search TLDs...");
  let domains = document.getElementById("domains");

  search.addEventListener("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(done_typing, doneTypingInterval);
  });

  search.addEventListener("keydown", function () {
    clearTimeout(typingTimer);
  });

  async function done_typing() {
    let sv = search.value;
    document.title = `Domains`;
    if (extensions_list.includes(sv) && sv != current_search_value) {
      document.title = `Domains in .${sv} `;
      domains.innerHTML = "";
      current_search_value = sv;
      if (![...Object.keys(words)].includes(sv)) {
        words[[sv]] = await load_words(sv);
      }
      let matching = words[[sv]];
      if (matching.length == 0) {
        domains.innerHTML = `<li>No word ending in ${sv}</li>`;
      } else {
        for (ind in matching) {
          let li = document.createElement("li");
          let item = `${matching[ind].slice(
            0,
            matching[ind].length - sv.length
          )}.${sv}`;
          url = `https://${item}`;
          li.innerHTML = `<a href='${url}'>${item}</a>`;

          domains.appendChild(li);
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  load_files().then(() => {
    setup_search();
  });
});
