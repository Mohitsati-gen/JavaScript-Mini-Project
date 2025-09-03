  let a = Math.ceil(Math.random() * 100);
  console.log(a);
  let win = new Audio("win2.mp3")
  let lose = new Audio("lose.wav")
  const info = document.getElementById("infoScreen");
  const cont = document.getElementById("continueBtn");
  const first = document.querySelector(".firstbutton")
  const second = document.querySelector(".startbutton")
  const guess = document.getElementById("guess")
  const third = document.querySelector(".image")
  const output = document.querySelector(".output")
  const restart = document.querySelector(".restart")
  const historyList = document.getElementById("historyList");
  const left = document.querySelector(".left")
  info.style.display = "flex";
  second.style.display = "none";


  cont.addEventListener("click", () => {
    info.style.display = "none";
    second.style.display = "flex";

  });


  second.addEventListener("click", () => {
    second.style.display = "none"
    first.style.opacity = 1;
    guess.style.opacity = 1;
    third.style.opacity = 1;
  })

  let b = 0
  first.addEventListener("click", () => {


    console.log(guess.value);

    b++;
    
    if (guess.value != "") {
      const li = document.createElement("li");
      li.textContent = `Attempt ${b}: ${guess.value}`;
      historyList.appendChild(li);
      left.textContent = `attempt left: ${10 - b}`

    }
    if (guess.value == "" || isNaN(guess.value)) {
      output.textContent = "invalid input"
      output.style.display = "flex"
      b--;
      setTimeout(() => {
        output.style.display = "none"
      }, 1000);
    }
    else if (guess.value < 0 || guess.value > 100) {
      output.innerHTML = "OUT OF BOX"
      output.style.display = "flex"
      setTimeout(() => {
        output.style.display = "none"
      }, 1000);
    }

    else if (guess.value > a) {

      output.innerHTML = "TOO HIGH"
      output.style.display = "flex"
      setTimeout(() => {
        output.style.display = "none"

      }, 1000);

    }
    else if (guess.value < a) {

      output.innerHTML = "TOO LOW"
      output.style.display = "flex"


      setTimeout(() => {
        output.style.display = "none"


      }, 1000);
    }
    else {

      output.innerHTML = `Great!! guessed the right number after ${b} guesses`
      output.style.display = "flex"

      first.disabled = true
      restart.style.display = "flex"
      win.currentTime = 0
      win.play()
      output.innerHTML = `CORRECT NUMBER WAS ${a}`

      document.getElementById("wonMessage").style.display = "block";
    }
    if (b == 10 && guess.value != a) {


      output.innerHTML = `CORRECT NUMBER WAS ${a}`
      const li = document.createElement("li");
      li.textContent = `CORRECT NUMBER IS ${a}`;
      historyList.appendChild(li);
      output.style.display = "flex"
      first.disabled = true
      restart.style.display = "flex"
      lose.currentTime = 0
      lose.play()


      document.getElementById("lostMessage").style.display = "block";
    }

  })

  restart.addEventListener("click", () => {
    first.disabled = false
    output.innerHTML = " "
    b = 0;
    guess.value = 0
    a = Math.ceil(Math.random() * 100);
    console.log(a);
    restart.style.display = "none"
    win.pause()
    lose.pause()
    document.getElementById("lostMessage").style.display = "none";
    document.getElementById("wonMessage").style.display = "none";
    historyList.innerHTML = "";
            left.innerHTML=" "


  })
