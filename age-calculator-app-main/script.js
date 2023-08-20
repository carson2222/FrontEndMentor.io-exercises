const submit_btn = document.querySelector(".submit_btn");

submit_btn.addEventListener("click", function () {
  const day = document.querySelector("#day");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");
  const inputs = [day, month, year];
  const curDate = new Date();

  // Empty input error handling
  inputs.forEach((el) => {
    if (!el.value) validChecker(el, "This field is required");
  });

  // Invalid input value error handling
  if (+month.value > 0 || +month.value < 12)
    validChecker(month, "Must be a valid month");
  if (+day.value > 0 || +day.value < 31 /* TODO: change to valid month days*/)
    validChecker(day, "Must be a valid day");
  if (+year.value > curDate.getFullYear())
    validChecker(year, "Must be in the past");

  // console.log(new Date(+year.value, +month.value, +day.value));
  console.log(new Date(2023, 8, 33).getDay());
});

/*       <div class="calculator--form__element">
          <label for="day" class="error-label">Day</label>
          <input type="number" id="day" placeholder="DD" class="error-input" />
          <p class="error-display">This field is required</p>
        </div> */

function validChecker(input, message) {
  const parent = input.closest(".calculator--form__element");
  addErrorClasses(parent, ["label", "input"]);
  console.log(parent.querySelector(".error-display"));
  displayErrorMessage(parent.querySelector(".error-display"), message);
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
