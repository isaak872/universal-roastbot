
// 🔥 RANDOM HELPER
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🔥 COMBINATION ROAST SYSTEM
function generateRoast() {

  const start = [
    "bro", "nah", "ain’t no way", "yo", "be honest",
    "seriously", "you really thought", "no one told you?"
  ];

  const middle = [
    "this made sense", "you should post this",
    "this was smart", "people would agree",
    "this helped anything", "this was a good idea",
    "this was worth typing"
  ];

  const end = [
    "💀", "😭", "???", "lmao", 
    "this ain't it", "please delete this",
    "this is wild"
  ];

  const extra = [
    "",
    " just log off",
    " respectfully",
    " and stop typing",
    " for everyone's sake",
    " before it gets worse"
  ];

  return rand(start) + " " + rand(middle) + " " + rand(end) + rand(extra);
}

// 🌍 TRANSLATE FUNCTION
async function translate(text, targetLang) {
  try {
    let res = await fetch(
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
        targetLang +
        "&dt=t&q=" +
        encodeURIComponent(text)
    );
    let data = await res.json();
    return data[0][0][0];
  } catch {
    return text;
  }
}

// 🌐 LANGUAGE DETECT
function detectLanguage() {
  let lang = document.documentElement.lang;
  if (!lang) return "en";
  return lang.split("-")[0];
}

// ✅ SMART INSERT (werkt op bijna alles)
function insertText(el, text) {
  el.focus();

  if (el.isContentEditable) {
    document.execCommand("insertText", false, text);
    return;
  }

  if (el.value !== undefined) {
    el.value += text;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  try {
    let event = new InputEvent("input", {
      data: text,
      inputType: "insertText",
      bubbles: true
    });
    el.dispatchEvent(event);
  } catch {}
}

// ✅ BUTTON ADD
function attachButton() {
  let inputs = document.querySelectorAll(
    "textarea, input[type='text'], [contenteditable='true']"
  );

  inputs.forEach(input => {

    if (input.dataset.roastAttached) return;
    input.dataset.roastAttached = "true";

    let btn = document.createElement("button");
    btn.innerText = "🔥 Roast";

    btn.style.margin = "5px";
    btn.style.padding = "4px";
    btn.style.background = "#ff4444";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "12px";
    btn.style.zIndex = "9999";

    btn.onclick = async () => {

      let roast = generateRoast();
      let lang = detectLanguage();

      if (lang !== "en") {
        roast = await translate(roast, lang);
      }

      insertText(input, roast);
    };

    if (input.parentElement) {
      input.parentElement.appendChild(btn);
    }
  });
}

// 🔁 LOOP voor dynamische sites
setInterval(attachButton, 1500);
