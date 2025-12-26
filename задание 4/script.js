const latin = [
  "Consuetudo est altera natura",
  "Nota bene",
  "Nulla calamitas sola",
  "Per aspera ad astra"
];

const russian = [
  "Привычка - вторая натура",
  "Заметьте хорошо!",
  "Беда не приходит одна",
  "Через тернии к звёздам"
];

let arrLeft = [0, 1, 2, 3];
let clickCount = 0;

const random = document.getElementById("rand");



createBtn.addEventListener("click", () => {
  if (arrLeft.length === 0) {
      alert("Фразы закончились");
      return;
  }
  const r = Math.floor(Math.random() * arrLeft.length);
  const i = arrLeft.splice(r, 1)[0];

  const p = document.createElement("p");
  p.id = "p" + clickCount;
  p.className = (clickCount % 2 === 0) ? "class1" : "class2";
  p.innerHTML = `<u>n=${clickCount}</u><i>"${latin[i]}"</i> "${russian[i]}"`;

  random.appendChild(p);
  clickCount++;

});

recolorBtn.addEventListener("click", () => {
  const ps = random.querySelectorAll("p");
    ps.forEach(p => {
      const n = Number(p.id.replace("p", ""));
      if (n % 2 === 0) {
          p.style.fontWeight = "bold";
          }
  });
});
