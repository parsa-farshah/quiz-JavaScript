let $startBtn = document.querySelector("#startBtn");
let $wlcDiv = document.querySelector("#wlcDiv");

let $questionBox = document.querySelector("#questionBox");

let $loading = document.querySelector("#loading");

let $easy = document.querySelector("#easy");
let $normal = document.querySelector("#normal");
let $hard = document.querySelector("#hard");

let $Number = 0;
$easy.addEventListener("click", () => {
  $easy.classList.add("greenClick");
  $Number = 25;
});
$normal.addEventListener("click", () => {
  $normal.classList.add("blueClick");

  $Number = 50;
});
$hard.addEventListener("click", () => {
  $hard.classList.add("redClick");

  $Number = 100;
});
let $errorLevel = document.querySelector("#errorLevel");
$startBtn.addEventListener("click", () => {
  if ($Number == 0) {
    // error dont enter level
    $errorLevel.classList.remove("hidden");
    $errorLevel.classList.add("flex");
    setTimeout(() => {
      $errorLevel.classList.remove("flex");
      $errorLevel.classList.add("hidden");
    }, 2000);
  } else {
    $wlcDiv.classList.add("right-[150%]");

    $questionBox.classList.add("right-[50%]");
    $loading.classList.remove("hidden");
    fetch("https://parsa-farshah.github.io/quiz-js-json/question.json")
      .then((res) => res.json())
      .then((items) => {
        $loading.classList.add("hidden");

        items.map((item) => {
          let _div = document.createElement("div");
          _div.classList.add("px-4");
          _div.classList.add("w-full");
          _div.classList.add("h-full");
          _div.classList.add("py-7");
          _div.classList.add("bg-white");
          _div.classList.add("duration-300");
          _div.innerHTML = `
        <div class="flex items-center gap-4">
              <span class="text-2xl">(${item.id}/${$Number})</span>
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
  }
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

let $correctFlag = 0;
let $clickFlag = 0;

let $errorQuestion = document.querySelector("#errorQuestion");

function btnAwnser(s) {
  $clickFlag++;
  if ($click == "") {
    $clickFlag--;
    // error dont click answer
    $errorQuestion.classList.remove("hidden");
    $errorQuestion.classList.add("flex");
    setTimeout(() => {
      $errorQuestion.classList.remove("flex");
      $errorQuestion.classList.add("hidden");
    }, 2000);
  } else {
    let $p = Array.from(s.parentElement.children);
    $p.map((p) => {
      if (p.innerText == $dataAnswer) {
        p.classList.add("green");
      }

      if ($click == $dataAnswer) {
        if (p.innerText == $click) {
          $correctFlag++;
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
    }, 1000);
  }

  $dataAnswer = "";
  $click = "";

  let $resDiv = document.querySelector("#resDiv");

  setTimeout(() => {
    if ($clickFlag == $Number) {
      $questionBox.classList.add("right-[150%]");
      $resDiv.classList.add("right-[50%]");
    }
  }, 500);
}
let $resBtn = document.querySelector("#resBtn");
let $resAnswer = document.querySelector("#resAnswer");
let $resParnian = document.querySelector("#resParnian");
let $resstBtn = document.querySelector("#resstBtn");
$resBtn.addEventListener("click", () => {
  $resBtn.classList.add("hidden");
  $resstBtn.classList.remove("hidden");
  if ($correctFlag <= $Number / 5) {
    $resAnswer.innerHTML = `مبتدی (Beginner) <br> آشنایی اولیه با سینتکس و مفاهیم پایه مثل متغیر، شرط، آرایه ندارد یا بسیار محدود است. <br> درصد جواب درست ${$correctFlag}%`;
    $resAnswer.classList.remove("hidden");
    $resAnswer.classList.add("flex");

    $resParnian.innerHTML = `<h4 class="text-xl text-[#292929c0]">اگه واقعا میخوای واقعا فرانت اند کامل یاد بگیری بهتره توی آموزشگاه <a class="text-4xl text-blue-600 hover:text-blue-300 duration-500" href="https://trainingsitedesign.ir/learn-web-design/">پرنیان</a> آموزش ببینی</h4>`;
  }
  if ($Number / 4.9 <= $correctFlag && $Number / 4 >= $correctFlag) {
    $resAnswer.innerHTML = `نیمه‌مبتدی (Basic) <br> مفاهیم پایه مثل توابع، if، حلقه، و نوع داده را می‌داند ولی در ساختارهای پیچیده مثل closure و async مشکل دارد. <br> درصد جواب درست ${$correctFlag}`;
    $resAnswer.classList.remove("hidden");
    $resAnswer.classList.add("flex");

    $resParnian.innerHTML = `<h4 class="text-xl text-[#292929c0]">اگه واقعا میخوای واقعا فرانت اند کامل یاد بگیری بهتره توی آموزشگاه <a class="text-4xl text-blue-600 hover:text-blue-300 duration-500" href="https://trainingsitedesign.ir/learn-web-design/">پرنیان</a> آموزش ببینی</h4>`;
  }

  if ($Number / 3.9 <= $correctFlag && $Number / 3 >= $correctFlag) {
    $resAnswer.innerHTML = `متوسط (Intermediate) <br> تسلط نسبی به اصول دارد، می‌تواند پروژه‌های ساده بنویسد اما نیاز به تمرین برای درک event و async دارد. <br> درصد جواب درست ${$correctFlag}`;
    $resAnswer.classList.remove("hidden");
    $resAnswer.classList.add("flex");

    $resParnian.innerHTML = `<h4 class="text-xl text-[#292929c0]">اگه واقعا میخوای واقعا فرانت اند کامل یاد بگیری بهتره توی آموزشگاه <a class="text-4xl text-blue-600 hover:text-blue-300 duration-500" href="https://trainingsitedesign.ir/learn-web-design/">پرنیان</a> آموزش ببینی</h4>`;
  }

  if ($Number / 2.9 <= $correctFlag && $Number / 2 >= $correctFlag) {
    $resAnswer.innerHTML = `پیشرفته (Advanced)<br> درک خوبی از ساختار کد، async، DOM و ساختار داده‌ها دارد و می‌تواند اپلیکیشن‌های متوسط بنویسد. <br> درصد جواب درست ${$correctFlag}`;
    $resAnswer.classList.remove("hidden");
    $resAnswer.classList.add("flex");

    $resParnian.innerHTML = `<h4 class="text-xl text-[#292929c0]">اگه واقعا میخوای واقعا فرانت اند کامل یاد بگیری بهتره توی آموزشگاه <a class="text-4xl text-blue-600 hover:text-blue-300 duration-500" href="https://trainingsitedesign.ir/learn-web-design/">پرنیان</a> آموزش ببینی</h4>`;
  }
  if ($Number / 1.9 <= $correctFlag && $Number / 1 >= $correctFlag) {
    $resAnswer.innerHTML = `حرفه‌ای (Professional) <br> تسلط بالا به جاوااسکریپت مدرن (ES6+)، async/await، closure، event delegation، و DOM دارد. <br> درصد جواب درست ${$correctFlag}`;
    $resAnswer.classList.remove("hidden");
    $resAnswer.classList.add("flex");

    $resParnian.innerHTML = `<h4 class="text-xl text-[#292929c0]">اگه واقعا میخوای واقعا فرانت اند کامل یاد بگیری بهتره توی آموزشگاه <a class="text-4xl text-blue-600 hover:text-blue-300 duration-500" href="https://trainingsitedesign.ir/learn-web-design/">پرنیان</a> آموزش ببینی</h4>`;
  }
  if ($Number / 0.9 <= $correctFlag && $Number >= $correctFlag) {
    $resAnswer.innerHTML = `حرفه‌ای (Professional) <br> مهارت در سطح مصاحبه‌های فنی شرکت‌ها و فریم‌ورک‌ها (React, Node.js, Vue). می‌تواند کد بهینه و تمیز بنویسد. <br> درصد جواب درست ${$correctFlag}`;
    $resAnswer.classList.remove("hidden");
    $resAnswer.classList.add("flex");

    $resParnian.innerHTML = `<h4 class="text-xl text-[#292929c0]">اگه واقعا میخوای واقعا فرانت اند کامل یاد بگیری بهتره توی آموزشگاه <a class="text-4xl text-blue-600 hover:text-blue-300 duration-500" href="https://trainingsitedesign.ir/learn-web-design/">پرنیان</a> آموزش ببینی</h4>`;
  }
});

$resstBtn.addEventListener("click", () => {
  location.reload();
});
