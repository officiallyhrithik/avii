
const stars = document.getElementById("stars");
const lanterns = document.getElementById("lanterns");
const letter = document.getElementById("letter");
const message = document.getElementById("message");
const begin = document.getElementById("begin");
const release = document.getElementById("release");
const close = document.getElementById("close");

const note = `Hey you,

I wanted to create a little world
that feels like a story under the stars.

Just like Rapunzel looking beyond her tower,
there is so much beauty waiting to be discovered.

I hope the little things in your life bring you
big smiles, wonderful adventures, and happiness.

This is simply a small surprise I made for you.
No expectations and no pressure to reply.
I just wanted to share a little bit of magic.

Keep shining, always. 💜`;

for (let i = 0; i < 140; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = 1 + Math.random() * 3 + "s";
  stars.appendChild(star);
}

let count = 0;
const maxLanterns = 45;

function releaseLantern() {
  if (count >= maxLanterns) {
    lanterns.firstElementChild?.remove();
    count--;
  }

  const lantern = document.createElement("span");
  lantern.className = "lantern";
  lantern.textContent = Math.random() > .2 ? "🏮" : "✨";
  lantern.style.left = 5 + Math.random() * 90 + "%";
  lantern.style.animationDuration = 8 + Math.random() * 8 + "s";
  lantern.style.fontSize = 18 + Math.random() * 20 + "px";
  lantern.setAttribute("role", "button");
  lantern.setAttribute("tabindex", "0");
  lantern.setAttribute("aria-label", "Open a little surprise");

  function openFromLantern() {
    lantern.remove();
    count--;
    openLetter();
  }

  lantern.addEventListener("click", openFromLantern);
  lantern.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFromLantern();
    }
  });

  lantern.addEventListener("animationend", () => {
    if (lantern.isConnected) {
      lantern.remove();
      count--;
    }
  });

  lanterns.appendChild(lantern);
  count++;
}

function openLetter() {
  message.textContent = note;
  letter.hidden = false;
  close.focus();
}

function closeLetter() {
  letter.hidden = true;
  begin.focus();
}

begin.addEventListener("click", () => {
  openLetter();

  for (let i = 0; i < 14; i++) {
    setTimeout(releaseLantern, i * 180);
  }
});

release.addEventListener("click", () => {
  for (let i = 0; i < 6; i++) {
    setTimeout(releaseLantern, i * 180);
  }
});

close.addEventListener("click", closeLetter);

letter.addEventListener("click", event => {
  if (event.target === letter) closeLetter();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !letter.hidden) {
    closeLetter();
  }
});
