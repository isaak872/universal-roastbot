
// 🔥 RANDOM
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🌍 LANGUAGE
function getLanguage() {
  let lang = document.documentElement.lang;
  if (!lang) return "en";
  if (lang.startsWith("nl")) return "nl";
  return "en";
}

// 🔥 ROAST GENERATOR
function generateRoast(mode) {

  const lang = getLanguage();

  const data = {

    en: {
      basic: [
        "this doesn’t make sense",
        "this really wasn’t needed",
        "nah this ain’t it"
      ],

      funny: [
        "this caught me off guard",
        "not you saying this",
        "this is actually wild"
      ],

      savage: [
        "bro just delete this",
        "ain’t no way you posted this",
        "just log off honestly"
      ],

      destroy: [
        "how did you manage to get this this wrong",
        "this keeps getting worse",
        "this is actually impressive in the worst way"
      ],

      crowd: [
        "we all know this ain’t it",
        "everyone sees this the same way",
        "no one is agreeing with this"
      ],

      embarrass: [
        "this should’ve stayed private",
        "you could’ve kept this to yourself",
        "this was not for public view"
      ]
    },

    nl: {
      basic: [
        "dit slaat nergens op",
        "dit was echt niet nodig",
        "nee dit is het niet"
      ],

      funny: [
        "dit had ik niet verwacht",
        "dit is echt wild",
        "dit komt ineens uit het niets"
      ],

      savage: [
        "bro verwijder dit gewoon",
        "dit had je niet moeten posten",
        "log gewoon uit man"
      ],

      destroy: [
        "hoe krijg je dit zo fout",
        "dit wordt steeds erger",
        "dit is echt bijna knap hoe fout dit is"
      ],

      crowd: [
        "we zien allemaal dat dit niet klopt",
        "iedereen denkt hetzelfde hierover",
        "niemand vindt dit goed"
      ],

      embarrass: [
        "dit had je beter niet kunnen posten",
        "dit had je voor jezelf moeten houden",
        "dit was niet voor iedereen bedoeld"
      ]
    }

  };

  let langData = data[lang] || data.en;
  let options = langData[mode] || langData.basic;

  let text = rand(options);

  // 💥 SOMS emoji (realistisch)
  let emojis = ["💀","😂","😭"];

  if (Math.random() < 0.4) {
    return text + " " + rand(emojis);
  }

  return text;
}

// ✅ INSERT TEXT
function insertText(el, text) {
  el.focus();

  if (el.isContentEditable) {
    document.execCommand("insertText", false, text);
  } else if (el.value !== undefined) {
    el.value += text;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

// ✅ UI
function attachRoast() {

  let inputs = document.querySelectorAll(
    "textarea, input[type='text'], [contenteditable='true']"
  );

  inputs.forEach(input => {

    if (input.dataset.roastDone) return;
    input.dataset.roastDone = "true";

    let container = document.createElement("div");
    container.style.display = "flex";
    container.style.gap = "5px";
    container.style.marginTop = "4px";

    // dropdown
    let select = document.createElement("select");
    ["basic","funny","savage","destroy","crowd","embarrass"].forEach(m => {
      let opt = document.createElement("option");
      opt.value = m;
      opt.innerText = m;
      select.appendChild(opt);
    });

    // knop
    let btn = document.createElement("button");
    btn.innerText = "🔥 Roast";
    btn.style.background = "#ff4444";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.padding = "4px 8px";
    btn.style.cursor = "pointer";

    btn.onclick = () => {
      insertText(input, generateRoast(select.value));
    };

    container.appendChild(select);
    container.appendChild(btn);

    input.parentElement.appendChild(container);
  });
}

// 🔁 LOOP
setInterval(attachRoast, 1500);
``
