const errorContainer = document.querySelector(".error-msg");

let packages = [];

function merge(arr, left, middle, right) {
  let l1 = middle - left + 1;
  let l2 = right - middle;
  let arr1 = new Array(l1);
  let arr2 = new Array(l2);
  for (let i = 0; i < l1; ++i) {
    arr1[i] = arr[left + i];
  }
  for (let i = 0; i < l2; ++i) {
    arr2[i] = arr[middle + 1 + i];
  }

  let i = 0;
  let j = 0;
  let k = left;
  while (i < l1 && j < l2) {
    if (+arr1[i].weight < +arr2[j].weight) {
      arr[k] = arr1[i];
      i += 1;
    } else {
      arr[k] = arr2[j];
      j += 1;
    }
    k += 1;
  }
  while (i < l1) {
    arr[k] = arr1[i];
    i += 1;
    k += 1;
  }
  while (j < l2) {
    arr[k] = arr2[j];
    j += 1;
    k += 1;
  }
}

function mergeSort(arr, left, right) {
  if (left >= right) {
    return;
  }
  let middle = left + parseInt((right - left) / 2);
  mergeSort(arr, left, middle);
  mergeSort(arr, middle + 1, right);
  merge(arr, left, middle, right);
}

const generateTrackingCode = (packageId, weight) => {
  return ((packageId << 4) | weight).toString(2);
};

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

const renderPackages = () => {
  const table = document.querySelector("#packages");
  table.innerHTML = "";
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");
  const ths = ["Name", "ID", "Address", "Weight", "Tracking Code"];
  ths.forEach((th) => {
    const thElement = document.createElement("th");
    thElement.innerText = th;
    tr.appendChild(thElement);
  });
  thead.appendChild(tr);
  table.appendChild(thead);
  packages.forEach((package) => {
    const tr = document.createElement("tr");
    const tds = ["name", "id", "address", "weight", "trackingCode"];
    tds.forEach((td) => {
      const tdElement = document.createElement("td");
      tdElement.innerText = package[td];
      tr.appendChild(tdElement);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
};

const submitForm = (e) => {
  e.preventDefault();
  const name = document.querySelector("#name");
  const id = document.querySelector("#id");
  const address = document.querySelector("#address");
  const weight = document.querySelector("#weight");
  const isValidName = validateName({ target: name });
  const isValidId = validateNumber({ target: id });
  const isValidAddress = validateAddress({ target: address });
  const isValidWeight = validateNumber({ target: weight });
  if (isValidName && isValidId && isValidAddress && isValidWeight) {
    packages.push({
      name: name.value,
      id: id.value,
      address: address.value,
      weight: weight.value,
      trackingCode: generateTrackingCode(id.value, weight.value),
    });
    mergeSort(packages, 0, packages.length - 1);
    console.log({ packages });
    localStorage.setItem("packages", JSON.stringify(packages));
    renderPackages();
    name.value = "";
    id.value = "";
    address.value = "";
    weight.value = "";
  }
};

window.onload = () => {
  const storedPackages = localStorage.getItem("packages");
  if (storedPackages) {
    packages = JSON.parse(storedPackages);
    mergeSort(packages, 0, packages.length - 1);
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
