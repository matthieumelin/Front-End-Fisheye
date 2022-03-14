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
    const headerContent = document.createElement("div");
    if (header) {
      const fullName = document.createElement("h1");
      const localization = document.createElement("p");

      // Ajout des classes personnalisées sur chaque élément
      headerContent.classList.add("photograph_header_content");
      fullName.classList.add("photograph_header_content_name");
      localization.classList.add("photograph_header_content_location");

      // Ajout des textes sur chaques text
      fullName.textContent = photograph.name;
      localization.textContent = `${photograph.city}, ${photograph.country}`;

      // Ajout des éléments au header
      header.appendChild(headerContent);
      headerContent.appendChild(fullName);
      headerContent.appendChild(localization);
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
