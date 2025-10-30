let $startBtn = document.querySelector("#startBtn");
let $wlcDiv = document.querySelector("#wlcDiv");

let $questionBox = document.querySelector("#questionBox");

$startBtn.addEventListener("click", () => {
  $wlcDiv.classList.add("right-[150%]");

  $questionBox.classList.add("right-[50%]");

  fetch("https://parsa-farshah.github.io/quiz-js-json/question.json")
    .then((res) => res.json())
    .then((items) => {
      items.map((item) => {
        let _div = document.createElement("div");
        _div.classList.add("px-4");
        _div.innerHTML = `
        <div class="flex items-center gap-4">
       <span class="text-2xl">(${item.id})</span> <h1>${item.question}</h1>
        </div>
        `;
        $questionBox.appendChild(_div);
      });
    })
    .catch((err) => console.log(err));
});
