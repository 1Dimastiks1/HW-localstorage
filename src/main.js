let contacts = JSON.parse(localStorage.getItem("contactsData")) || [];
let editIndex = null;

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const submitBtn = document.querySelector("#submit-btn");
const contactList = document.querySelector("#contact-list");

function saveToLocalStorage() {
  localStorage.setItem("contactsData", JSON.stringify(contacts));
}

function renderContacts() {
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const item = document.createElement("div");
    item.classList.add("contact-item");

    const info = document.createElement("div");
    info.classList.add("contact-info");
    info.innerHTML = `
          <strong>${contact.name} ${contact.surname}</strong>
          <p>📞 ${contact.phone}</p>
          <p>✉️ ${contact.email}</p>
        `;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn-action", "btn-edit");
    editBtn.textContent = "Редагувати";
    editBtn.addEventListener("click", () => startEdit(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-action", "btn-delete");
    deleteBtn.textContent = "Видалити";
    deleteBtn.addEventListener("click", () => deleteContact(index));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    item.appendChild(info);
    item.appendChild(actions);

    contactList.appendChild(item);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newContact = {
    name: nameInput.value.trim(),
    surname: surnameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
  };

  if (editIndex === null) {
    contacts.push(newContact);
  } else {
    contacts[editIndex] = newContact;
    editIndex = null;
    submitBtn.textContent = "Додати контакт";
  }

  saveToLocalStorage();
  renderContacts();
  form.reset();
});

function startEdit(index) {
  const contact = contacts[index];
  nameInput.value = contact.name;
  surnameInput.value = contact.surname;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;

  editIndex = index;
  submitBtn.textContent = "Зберегти зміни";
}

function deleteContact(index) {
  contacts.splice(index, 1);
  saveToLocalStorage();
  renderContacts();

  if (editIndex === index) {
    form.reset();
    editIndex = null;
    submitBtn.textContent = "Додати контакт";
  }
}

renderContacts();
