const errorContainer = document.querySelector(".error-msg");

let packages = [];



const createError = (message, field) => {
  let error = document.querySelector(`.error#${field}-error`);
  if (!error) {
    error = document.createElement("p");
    error.classList.add("error");
    error.id = field + "-error";
  }
  error.innerText = message;
  return error;
};

const validateName = (e) => {
  const name = e.target.value;
  const nameRegex = /^[a-zA-Z ]{2,30}$/;
  if (!nameRegex.test(name)) {
    e.target.classList.add("error");
    errorContainer.appendChild(
      createError("Name should contain alphabetic characters only", "name")
    );
    return false;
  } else {
    e.target.classList.remove("error");
    document.querySelector(".error#name-error")?.remove();
    return true;
  }
};

const validateNumber = (e) => {
  const { value } = e.target;
  if (isNaN(value) || +value <= 0) {
    e.target.classList.add("error");
    errorContainer.appendChild(
      createError(
        `${e.target.name} should contain numeric characters only`,
        e.target.name
      )
    );
    return false;
  } else {
    e.target.classList.remove("error");
    document.querySelector(`.error#${e.target.name}-error`)?.remove();
    return true;
  }
};
const validateAddress = (e) => {
  const address = e.target.value;
  const addressRegex = /^[a-zA-Z0-9\s]{2,30}$/;
  if (!addressRegex.test(address)) {
    e.target.classList.add("error");
    errorContainer.appendChild(
      createError(
        "Address should contain alphanumeric characters only",
        "address"
      )
    );
    return false;
  } else {
    e.target.classList.remove("error");
    document.querySelector(".error#address-error")?.remove();
    return true;
  }
};



window.onload = () => {
  const storedPackages = localStorage.getItem("packages");
  if (storedPackages) {
    packages = JSON.parse(storedPackages);
    renderPackages();
  }
  const form = document.querySelector("form");
  const name = document.querySelector("#name");
  const id = document.querySelector("#id");
  const address = document.querySelector("#address");
  const weight = document.querySelector("#weight");
  name.addEventListener("blur", validateName);
  id.addEventListener("blur", validateNumber);
  address.addEventListener("blur", validateAddress);
  weight.addEventListener("blur", validateNumber);
  form.addEventListener("submit", submitForm);
};
