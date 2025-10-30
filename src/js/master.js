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
        _div.innerHTML = `
        <div class="flex items-center gap-4">
              <span class="text-2xl">(${item.id})</span>
              <h1>${item.question}</h1>
            </div>

            <div class="rounded-2xl">
              <p class="border border-[#61616157] px-5 rounded-2xl mt-4 bg-[#c5c5c5b0] py-2 cursor-pointer hover:bg-[#e6e6e6fb] duration-300">
                الف - ${item.options[0]}
              </p>
              <p class="border px-5 rounded-2xl mt-4 bg-[#c5c5c5b0] py-2 cursor-pointer hover:bg-[#e6e6e6fb] duration-300">ب - ${item.options[1]}</p>
              <p class="border px-5 rounded-2xl mt-4 bg-[#c5c5c5b0] py-2 cursor-pointer hover:bg-[#e6e6e6fb] duration-300">ج - ${item.options[2]}</p>
              <p class="border px-5 rounded-2xl mt-4 bg-[#c5c5c5b0] py-2 cursor-pointer hover:bg-[#e6e6e6fb] duration-300">د - ${item.options[3]}</p>
            </div>
            <div class="w-full flex justify-center items-center mt-6">
              <button
                onclick="btnAwnser()"
                class="px-5 py-2 bg-green-500 rounded-md"
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
