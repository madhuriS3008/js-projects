const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//check email is valid
function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email.value).toLowerCase())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid.");
  }
}

//check required
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getName(input.id)} is required.`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getName(input.id)} must be alteast ${min} characters.`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${getName(input.id)} must be less than ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
}

//check match of inputs
function checkMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match.");
  }
}

//get name for input
function getName(name) {
  return name[0].toUpperCase() + name.slice(1);
}

//event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  isValidEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkMatch(password, password2);
});
