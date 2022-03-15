// Fonction lors du chargement de la page
async function init() {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const photograph = (await getPhotographers()).photographers.filter(
    (data) => data && data.id === id
  )[0];

  // Création des éléments
  createElements();

  // Fonction pour créer tous les éléments de la page
  async function createElements() {
    const header = document.querySelector(".photograph_header");
    const headerContent = document.querySelector(".photograph_header_content");
    if (header) {
      const contactButton = document.querySelector(".contact_button");
      const fullName = document.createElement("h1");
      const localization = document.createElement("p");
      const tagline = document.createElement("p");
      const picture = document.createElement("img");

      // Ajout des classes personnalisées sur chaque élément
      fullName.classList.add("photograph_header_content_name");
      localization.classList.add("photograph_header_content_location");
      tagline.classList.add("photograph_header_content_tagline");
      picture.classList.add("photograph_header_content_picture");

      // Ajout de chaque attribut sur chaque élément
      picture.setAttribute("src", `assets/photographers/${photograph.portrait}`);
      picture.setAttribute("alt", photograph.name);

      // Ajout des textes sur chaques text
      fullName.textContent = photograph.name;
      localization.textContent = `${photograph.city}, ${photograph.country}`;
      tagline.textContent = photograph.tagline;

      // Ajout des éléments au header
      headerContent.after(contactButton);
      headerContent.appendChild(fullName);
      headerContent.appendChild(localization);
      headerContent.appendChild(tagline);
      header.appendChild(picture);
    }
  }
}

// Récupération de tous les photographers
async function getPhotographers() {
  const photographers = await fetch("../../data/photographers.json").then(
    (response) => response.json()
  );
  return {
    photographers: [...photographers["photographers"]],
  };
}

init();
