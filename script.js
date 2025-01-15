// Image upload logic
let img = document.querySelector(".img");
let imgInput = document.getElementById("img-input");
let selectedImage;

// Function to set the uploaded image as background
let setBgImg = () => {
  let bgImg = document.createElement("img");
  bgImg.src = URL.createObjectURL(imgInput.files[0]);
  bgImg.classList.add("bg-img");
  img.innerHTML = ""; // Clear previous image
  img.appendChild(bgImg); // Append new image

  selectedImage = bgImg.src; // Store selected image
};

imgInput.addEventListener("change", setBgImg);

// Form submit logic and add/edit contact
let form = document.querySelector("form");
let contactNumbers = document.querySelector(".contact-numbers");

let isEditing = false; // Track if we're editing
let currentContact = null; // Store the current contact being edited

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission to server

  // Gather form input values
  let fName = document.getElementById("fname").value;
  let lName = document.getElementById("lname").value;
  let pNumber = document.getElementById("pnumber").value;
  let email = document.getElementById("email").value;

  if (isEditing && currentContact) {
    // Update existing contact
    currentContact.querySelector(".contact-info strong").textContent = `${fName} ${lName}`;
    currentContact.querySelector(".contact-info .phone").textContent = pNumber;
    currentContact.querySelector(".contact-info .email").textContent = email;

    // Update contact image if a new one is selected
    if (selectedImage) {
      currentContact.querySelector(".contact-img").src = selectedImage;
    }

    // Reset editing state
    isEditing = false; 
    currentContact = null; 
  } else {
    // Create new contact if not editing
    let newContact = document.createElement("div");
    newContact.classList.add("contact");

    let contactImg = document.createElement("img");
    contactImg.src =
      selectedImage ||
      "pngtree-cartoon-contact-icon-download-image_1251409-removebg-preview.png"; // Default image
    contactImg.classList.add("contact-img");

    let contactInfo = document.createElement("div");
    contactInfo.classList.add("contact-info");
    contactInfo.innerHTML = `
      <strong>${fName} ${lName}</strong><br>
      <span class="phone">${pNumber}</span><br>
      <span class="email">${email}</span>
    `;

    newContact.appendChild(contactImg);
    newContact.appendChild(contactInfo);

    // Add click event for editing contact
    newContact.addEventListener("click", () => editContact(newContact));

    contactNumbers.appendChild(newContact); // Add contact to list
    sortContacts(); // Sort contacts alphabetically
  }

  // Clear form inputs after submission
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("pnumber").value = "";
  document.getElementById("email").value = "";

  img.innerHTML = ""; // Clear image preview
  imgInput.value = ""; // Reset image input
  selectedImage = null; // Reset selected image state
});

// Function to handle contact click and edit
function editContact(contact) {
  isEditing = true; // Set to edit mode
  currentContact = contact; // Reference current contact

  // Extract contact details from clicked contact
  let contactInfo = contact.querySelector(".contact-info");
  let contactName = contactInfo.querySelector("strong").textContent.split(" ");
  let phone = contactInfo.querySelector(".phone").textContent;
  let email = contactInfo.querySelector(".email").textContent;
  let contactImgSrc = contact.querySelector(".contact-img").src; // Get the current contact image

  // Pre-fill form with contact details
  document.getElementById("fname").value = contactName[0];
  document.getElementById("lname").value = contactName[1] || "";
  document.getElementById("pnumber").value = phone;
  document.getElementById("email").value = email;

  // Set the current image in the preview area for editing
  img.innerHTML = `<img src="${contactImgSrc}" class="bg-img" />`;
  selectedImage = contactImgSrc; // Set the selected image for editing

  // Focus on the first name input field for editing
  document.getElementById("fname").focus();
}

// Sort function
function sortContacts() {
  let contacts = Array.from(document.querySelectorAll(".contact"));

  contacts.sort((a, b) => {
    let nameA = a.querySelector("strong").textContent.toLowerCase();
    let nameB = b.querySelector("strong").textContent.toLowerCase();
    return nameA.localeCompare(nameB);
  });
  
  contacts.forEach((contact) => {
    contactNumbers.appendChild(contact); // Re-append sorted contacts
  });
}

// Search function
let searchBox = document.getElementById("search-box");

searchBox.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const contacts = document.querySelectorAll(".contact");

  contacts.forEach((contact) => {
    const contactName = contact.querySelector("strong").textContent.toLowerCase();
    contact.style.display = contactName.includes(searchTerm) ? "" : "none"; // Show/hide contacts
  });
});

// Add-icon cursor
let addIcon = document.getElementById("add-icon");

addIcon.addEventListener("click", () => {
  let fNameInput = document.getElementById("fname");
  fNameInput.focus(); // Focus on first name input
  let length = fNameInput.value.length;
  fNameInput.setSelectionRange(length, length); // Place cursor at the end
});


