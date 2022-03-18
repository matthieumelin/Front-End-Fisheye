const form = document.getElementById("contact_form");
const errors = new Array();

/**
 * It validates the form and displays the errors.
 */
const validate = (event) => {
  event.preventDefault();

  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  /* It checks if the value is not null and has a minimum length of 2. */
  if (!firstName || firstName.length < 2)
    errors.push({ id: "first", active: true });
  else errors.push({ id: "first", active: false });
  if (!lastName || lastName.length < 2)
    errors.push({ id: "last", active: true });
  else errors.push({ id: "last", active: false });
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    errors.push({ id: "email", active: true });
  else errors.push({ id: "email", active: false });
  if (!message || message.length < 2)
    errors.push({ id: "message", active: true });
  else errors.push({ id: "message", active: false });

  if (errors.every((error) => !error.active)) {
    /* Printing the values of the form. */
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);
    /* It displays a message to the user. */
    alert("Votre message a bien été envoyé.");
    /* It closes the modal. */
    closeModal();
  } else {
    errors.forEach((error) => {
      /* It checks if the error is active and displays it. */
      const element = document.getElementById(`${error.id}_error`);
      if (element != null) {
        if (error.active) {
          element.style.display = "block";
          element.parentNode.setAttribute("data-error-visible", true);
          element.parentNode.childNodes[3].setAttribute("aria-invalid", true);
        } else {
          element.style.display = "none";
          element.parentNode.setAttribute("data-error-visible", false);
          element.parentNode.childNodes[3].setAttribute("aria-invalid", false);
        }
      }
    });
  }
};

form.addEventListener("submit", validate);

/**
 * It displays the contact modal
 */
const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    const modalTitle = document.querySelector(".modal_header_title");
    if (modalTitle) {
      const photographName = document.querySelector(
        ".photograph_header_content_name"
      );
      if (photographName) {
        modalTitle.textContent = `Contactez-moi\n${photographName.textContent}`;
      }
    }

    modal.style.display = "block";
  }
};

/**
 * It closes the modal.
 */
const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";
    /* It resets the form. */
    form.reset();
    /* It checks if the error is active and displays it. */
    errors.forEach((error) => {
      /* It checks if the error is active and displays it. */
      const element = document.getElementById(`${error.id}_error`);
      if (element != null) {
        if (error.active) {
          element.style.display = "none";
          element.parentNode.setAttribute("data-error-visible", false);
          element.parentNode.childNodes[3].setAttribute("aria-invalid", false);
        }
      }
    });
  }
};
