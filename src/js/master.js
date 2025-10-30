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
        _div.classList.add("w-full");
        _div.classList.add("bg-orange-400");
        _div.classList.add("h-full");
        _div.classList.add("py-7");
        _div.classList.add("bg-white");
        _div.classList.add("duration-300");
        _div.innerHTML = `
        <div class="flex items-center gap-4">
              <span class="text-2xl">(${item.id})</span>
              <h1>${item.question}</h1>
            </div>

            <div class="rounded-2xl">
              <p onclick="clickAwnser(this)" data-answer="${item.answer}" class="border border-[#61616157] px-5 rounded-2xl mt-4 bg-[#c5c5c5b0] py-2 cursor-pointer hover:bg-[#e6e6e6fb] duration-300 inset-shadow-sm inset-shadow-black hover:inset-shadow-[#c5c5c500]">
                ${item.options[0]}
              </p>


              <p onclick="clickAwnser(this)" data-answer="${item.answer}" class="border border-[#61616157] px-5 rounded-2xl mt-4 bg-[#c5c5c5b0] py-2 cursor-pointer hover:bg-[#e6e6e6fb] duration-300 inset-shadow-sm inset-shadow-black hover:inset-shadow-[#c5c5c500]">${item.options[1]}</p>


              <p onclick="clickAwnser(this)" data-answer="${item.answer}" class="border border-[#61616157] px-5 rounded-2xl mt-4 bg-[#c5c5c5b0] py-2 cursor-pointer hover:bg-[#e6e6e6fb] duration-300 inset-shadow-sm inset-shadow-black hover:inset-shadow-[#c5c5c500]">${item.options[2]}</p>


              <p onclick="clickAwnser(this)" data-answer="${item.answer}" class="border border-[#61616157] px-5 rounded-2xl mt-4 bg-[#c5c5c5b0] py-2 cursor-pointer hover:bg-[#e6e6e6fb] duration-300 inset-shadow-sm inset-shadow-black hover:inset-shadow-[#c5c5c500]">${item.options[3]}</p>

                      <button
                onclick="btnAwnser(this)"
                class="px-5 py-2 bg-green-500 rounded-md cursor-pointer mr-[40%] mt-6"
              >
                ثبت جواب
              </button>
            </div>

        `;

        $questionBox.appendChild(_div);
      });
    })
    .catch((err) => console.log(err));
});
let $dataAnswer = "";
let $click = "";
function clickAwnser(s) {
  //   reset click
  let $p = Array.from(s.parentElement.children);
  $p.map((p) => {
    p.classList.remove("click");
    s.classList.remove("hover:bg-green-200");
  });

  s.classList.add("click");
  s.classList.add("hover:bg-green-100");

  $dataAnswer = s.getAttribute("data-answer");

  $click = s.innerText;
}

let correctFlag = 0;

function btnAwnser(s) {
  if ($click == "") {
    alert("adam bash");
  } else {
    let $p = Array.from(s.parentElement.children);
    $p.map((p) => {
      if (p.innerText == $dataAnswer) {
        p.classList.add("green");
      }

      if ($click == $dataAnswer) {
        if (p.innerText == $click) {
          correctFlag++;
          p.classList.add("green");
        }
      } else {
        if (p.innerText == $click) {
          p.classList.add("red");
        }
      }
    });

    let _divParent = s.parentElement.parentElement;
    setTimeout(() => {
      _divParent.classList.add("absolute");
      _divParent.classList.add("duration-200");
      _divParent.classList.add("bottom-[100%]");
    }, 2000);
  }
  console.log(correctFlag);

  $dataAnswer = "";
  $click = "";
}
