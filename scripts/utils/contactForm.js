const validate = (event) => {
  event.preventDefault();

  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const errors = new Array();

  // Vérification de chaque entrée
  // Un prénom est renseigner et a un minimum de 2 caractères.
  if (!firstName || firstName.length < 2)
    errors.push({ id: "first", active: true });
  else errors.push({ id: "first", active: false });
  // Un nom est renseigner et a un minimum de 2 caractères.
  if (!lastName || lastName.length < 2)
    errors.push({ id: "last", active: true });
  else errors.push({ id: "last", active: false });
  // Une email est bien renseigner.
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    errors.push({ id: "email", active: true });
  else errors.push({ id: "email", active: false });
  // Un nom est renseigner et a un minimum de 2 caractères.
  if (!message || message.length < 2)
    errors.push({ id: "message", active: true });
  else errors.push({ id: "message", active: false });

  // Si le formulaire ne posséde aucune erreur.
  if (errors.every((error) => !error.active)) {
    // Debug des valeures
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Message:", message);
    // Envoi d'un message de confirmation
    alert("Votre message a bien été envoyé.");
    // Fermeture du modal
    closeModal();
  } else {
    // Affichage de toutes les erreurs
    errors.forEach((error) => {
      // Récupération de tous les éléments servant à l'affichage des erreurs
      const element = document.getElementById(`${error.id}_error`);
      // L'élément existe
      if (element != null) {
        if (error.active) {
          element.style.display = "block";
          element.parentNode.setAttribute("data-error-visible", true);
        } else {
          element.style.display = "none";
          element.parentNode.setAttribute("data-error-visible", false);
        }
      }
    });
  }
};

const form = document.getElementById("contact_form");
form.addEventListener("submit", validate);

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

const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  if (modal) {
    modal.style.display = "none";
  }
};
