const counterValue = document.getElementById("counter-value");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset-button");
const stepper = document.getElementById("changeBy");

incrementBtn.addEventListener("click", function () {
  let newValue = Number(counterValue.textContent) + Number(stepper.value);
  counterValue.textContent = newValue;
});

decrementBtn.addEventListener("click", function () {
  let newValue = Number(counterValue.textContent) - Number(stepper.value);

  if (newValue < 0) {
    counterValue.textContent = 0;
  } else {
    counterValue.textContent = newValue;
  }
});

resetBtn.addEventListener("click", function () {
  counterValue.textContent = 0;
});


const container = document.querySelector(".star-container");
const stars = document.querySelectorAll(".star");
const ratingCount = document.querySelector("#count");

container.addEventListener("click", function (event) {
  const rating = Number(event.target.dataset.shashwat);

  if (rating) {
    for (let i = 0; i <= stars.length; i++) {
      if (i < rating) {
        stars[i].classList.add("active");
      } else {
        stars[i].classList.remove("active");
      }
    }

    ratingCount.textContent = rating;
  }
});