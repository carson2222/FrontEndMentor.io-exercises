"use strict";
const submit_btn = document.querySelector(".submit_btn");
let valid_date = true;

submit_btn.addEventListener("click", function () {
  const day = document.querySelector("#day");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");
  const inputs = [day, month, year];
  const cur_date = new Date();

  // Clear errors from all inputs and assign error if is empty
  inputs.forEach((el) => {
    clearErrors(el);
    if (!el.value) validChecker(el, "This field is required");
  });

  // Invalid input value error handling
  if (+month.value < 0 || +month.value > 12)
    validChecker(month, "Must be a valid month");
  if (+day.value < 0 || +day.value > 31 /* TODO: change to valid month days*/)
    validChecker(day, "Must be a valid day");
  if (+year.value > cur_date.getFullYear())
    validChecker(year, "Must be in the past");

  // Return whole function if the inputs are empty or not valid
  if (!valid_date) return;

  const input_date = new Date(
    +year.value,
    +month.value - 1,
    +day.value,
    cur_date.getHours(),
    cur_date.getMinutes(),
    cur_date.getSeconds()
  );
  if (input_date.getDate() !== +day.value) {
    validChecker(day, "Must be a valid date");
    validChecker(month);
    validChecker(year);
  }

  // Return whole function if the date is not valid
  if (!valid_date) return;

  // Display age
  updateDisplayer(
    ["years", "months", "days"],
    secondsToYMD((cur_date.getTime() - input_date.getTime()) / 1000)
  );
});

/*       <div class="calculator--form__element">
          <label for="day" class="error-label">Day</label>
          <input type="number" id="day" placeholder="DD" class="error-input" />
          <p class="error-display">This field is required</p>
        </div> */
function clearErrors(input) {
  const parent = input.closest(".calculator--form__element");
  input.classList.remove("error-input");
  parent.querySelector("label").classList.remove("error-label");
  hideErrorMessage(parent.querySelector(".error-display"));
}
function validChecker(input, message) {
  const parent = input.closest(".calculator--form__element");
  valid_date = false;
  addErrorClasses(parent, ["label", "input"]);
  if (message) {
    displayErrorMessage(parent.querySelector(".error-display"), message);
  }
}

function addErrorClasses(form_el, arr) {
  arr.forEach((element) => {
    const el = form_el.querySelector(element).classList;
    if (!el.contains(`error-${element}`)) {
      el.add(`error-${element}`);
    }
  });
}

function displayErrorMessage(element, message = "error") {
  element.innerHTML = message;
  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
  }
}
function hideErrorMessage(element) {
  if (!element.classList.contains("hidden")) {
    element.classList.add("hidden");
  }
}
function ageDisplayer(years, months, days) {
  document.querySelector(".calculator--displayer__years").innerHTML = years;
  document.querySelector(".calculator--displayer__months").innerHTML = months;
  document.querySelector(".calculator--displayer__days").innerHTML = days;
}
function secondsToYMD(sec) {
  const YMD = [0, 0, 0];
  sec = Math.floor(sec);
  var day = 60 * 60 * 24;

  while (sec >= day * 365) {
    sec = sec - day * 365;
    ++YMD[0];
  }
  while (sec >= day * 31) {
    sec = sec - day * 31;
    ++YMD[1];
  }
  while (sec >= day) {
    sec = sec - day;
    ++YMD[2];
  }
  return YMD;
}
function updateDisplayer(arr, data) {
  for (let i = 0; i < arr.length; i++) {
    const markup = `<span class="text-purple display-${arr[i]}">${
      data[i] === 0 ? "--" : data[i]
    }</span>${data[i] === 1 ? arr[i].slice(0, -1) : arr[i]}`;
    document.querySelector(`.calculator--displayer__${arr[i]}`).innerHTML =
      markup;
  }
}
