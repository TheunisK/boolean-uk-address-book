const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null
};

const serverURL = 'http://localhost:3000/';
const contactsURL = serverURL + 'contacts/';
const addressesURL = serverURL + 'addresses/';

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;
      console.log(data);

      renderContactsList();
    });
}

function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    state.selectedContact = contact;
    renderEditForm(state.selectedContact);
    console.log(state.selectedContact);
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function renderEditForm(contact) {
  viewSection.innerHTML = "";
  const formEl = document.createElement("form");
  formEl.className = "form-stack light-shadow center contact-form";
  const h1El = document.createElement("h1");
  h1El.innerText = "Edit Contact";

  formEl.addEventListener("submit", function(e) {
    e.preventDefault();
    let contactId = parseInt(contact.id);
    fetch(`http://localhost:3000/contacts/${contactId}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        blockContact: blockInput.checked

      })
    })
    fetch(`http://localhost:3000/addresses/${contactId}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        street: streetInput.value,
        city: cityInput.value,
        postCode: postCodeInput.value

      })
    })
  })

  const firstNameLabel = document.createElement("label");
  firstNameLabel.setAttribute("for", "first-name-input");
  firstNameLabel.innerText = "First name:"

  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("for", "first-name-input");
  firstNameInput.setAttribute("name", "first-name-input");
  firstNameInput.setAttribute("type", "text");
  firstNameInput.value = contact.firstName;

  const lastNameLabel = document.createElement("label");
  lastNameLabel.setAttribute("for", "last-name-input");
  lastNameLabel.innerText = "Last name:"

  const lastNameInput = document.createElement("input");
  lastNameInput.setAttribute("for", "last-name-input");
  lastNameInput.setAttribute("name", "last-name-input");
  lastNameInput.setAttribute("type", "text");
  lastNameInput.value = contact.lastName;

  const streetLabel = document.createElement("label");
  streetLabel.setAttribute("for", "street-input");
  streetLabel.innerText = "Street:"

  const streetInput = document.createElement("input");
  streetInput.setAttribute("id", "street-input");
  streetInput.setAttribute("name", "street-input");
  streetInput.setAttribute("type", "text");
  streetInput.value = contact.address.street;

  const cityLabel = document.createElement("label");
  cityLabel.setAttribute("for", "city-input");
  cityLabel.innerText = "City:"


  const cityInput = document.createElement("input");
  cityInput.setAttribute("id", "city-input");
  cityInput.setAttribute("name", "city-input");
  cityInput.setAttribute("type", "text");
  cityInput.value = contact.address.city;

  const postCodeLabel = document.createElement("label");
  postCodeLabel.setAttribute("for", "first-name-input");
  postCodeLabel.innerText = "Post Code:"

  const postCodeInput = document.createElement("input");
  postCodeInput.setAttribute("id", "post-code-input");
  postCodeInput.setAttribute("name", "post-code-input");
  postCodeInput.setAttribute("type", "text");
  postCodeInput.value = contact.address.postCode;

  const divEl = document.createElement("div");
  divEl.className = "checkbox-section";

  const blockInput = document.createElement("input");
  blockInput.setAttribute("id", "block-checkbox");
  blockInput.setAttribute("name", "block-checkbox");
  blockInput.setAttribute("type", "checkbox");
  blockInput.checked = contact.blockContact;

  const blockLabel = document.createElement("label");
  blockLabel.setAttribute("for", "block-checkbox");
  blockLabel.innerText = "Block";

  const divEl2 = document.createElement("div");
  divEl2.className = "actions-section";

  const buttonEl = document.createElement("button");
  buttonEl.className = "button blue";
  buttonEl.setAttribute("type", "click");
  buttonEl.innerText = "Update";

  formEl.append(h1El, firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, 
    streetLabel, streetInput, cityLabel, cityInput, postCodeLabel, postCodeInput, 
    divEl, divEl2);
  divEl.append(blockInput, blockLabel);
  divEl2.append(buttonEl);

  viewSection.append(formEl);

}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {
    renderNewContactForm();
  });
}

function addNewContactToDb(street, city, postCode, firstName, lastName, block) {
  fetch(addressesURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      street: street,
      city: city,
      postCode: postCode
    })
  })
  fetch(contactsURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      blockContact: block,
      addressId: state.contacts.length + 1
    })
  })
}


function renderNewContactForm() {
  viewSection.innerHTML = "";

  const formEl = document.createElement("form");
  formEl.className = "form-stack light-shadow center contact-form";
  formEl.addEventListener("submit", function(e) {
    e.preventDefault();
    addNewContactToDb(streetInput.value, cityInput.value, postCodeInput.value, firstNameInput.value, 
      lastNameInput.value, blockInput.checked);
      // console.log(blockInput.checked);
    
})

  const h1El = document.createElement("h1");
  h1El.innerText = "Create Contact";

  const firstNameLabel = document.createElement("label");
  firstNameLabel.setAttribute("for", "first-name-input");
  firstNameLabel.innerText = "First name:"

  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("for", "first-name-input");
  firstNameInput.setAttribute("name", "first-name-input");
  firstNameInput.setAttribute("type", "text");

  const lastNameLabel = document.createElement("label");
  lastNameLabel.setAttribute("for", "last-name-input");
  lastNameLabel.innerText = "Last name:"

  const lastNameInput = document.createElement("input");
  lastNameInput.setAttribute("for", "last-name-input");
  lastNameInput.setAttribute("name", "last-name-input");
  lastNameInput.setAttribute("type", "text");

  const streetLabel = document.createElement("label");
  streetLabel.setAttribute("for", "street-input");
  streetLabel.innerText = "Street:"

  const streetInput = document.createElement("input");
  streetInput.setAttribute("id", "street-input");
  streetInput.setAttribute("name", "street-input");
  streetInput.setAttribute("type", "text");

  const cityLabel = document.createElement("label");
  cityLabel.setAttribute("for", "city-input");
  cityLabel.innerText = "City:"


  const cityInput = document.createElement("input");
  cityInput.setAttribute("id", "city-input");
  cityInput.setAttribute("name", "city-input");
  cityInput.setAttribute("type", "text");

  const postCodeLabel = document.createElement("label");
  postCodeLabel.setAttribute("for", "first-name-input");
  postCodeLabel.innerText = "Post Code:"

  const postCodeInput = document.createElement("input");
  postCodeInput.setAttribute("id", "post-code-input");
  postCodeInput.setAttribute("name", "post-code-input");
  postCodeInput.setAttribute("type", "text");

  const divEl = document.createElement("div");
  divEl.className = "checkbox-section";

  const blockInput = document.createElement("input");
  blockInput.setAttribute("id", "block-checkbox");
  blockInput.setAttribute("name", "block-checkbox");
  blockInput.setAttribute("type", "checkbox");

  const blockLabel = document.createElement("label");
  blockLabel.setAttribute("for", "block-checkbox");
  blockLabel.innerText = "Block";

  const divEl2 = document.createElement("div");
  divEl2.className = "actions-section";

  const buttonEl = document.createElement("button");
  buttonEl.className = "button blue";
  buttonEl.setAttribute("type", "submit");
  buttonEl.innerText = "Create";

  formEl.append(h1El, firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, 
    streetLabel, streetInput, cityLabel, cityInput, postCodeLabel, postCodeInput, 
    divEl, divEl2);
  divEl.append(blockInput, blockLabel);
  divEl2.append(buttonEl);

  viewSection.append(formEl);

}

// [TODO] Write Code

function main() {
  listenNewContactButton();
  getContacts();
}

main();
