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
    const main = document.getElementById("main");
    const header = document.querySelector(".photograph_header");
    if (header) {
      const headerContent = document.querySelector(
        ".photograph_header_content"
      );
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
      picture.setAttribute(
        "src",
        `assets/photographers/${photograph.portrait}`
      );
      picture.setAttribute("alt", photograph.name);

      // Ajout des textes sur chaque texte
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
    // Création des éléments pour le main
    if (main) {
      // Création des filtres
      createFilters();

      // Création des photos
      createPictures();
    }

    // Fonction permettant de créer les filtres
    async function createFilters() {
      const filters = document.createElement("section");
      const title = document.createElement("label");
      const select = document.createElement("select");
      const options = ["Popularité", "Date", "Titre"];

      // Création de tous les filtres
      options.forEach((filter) => {
        const option = document.createElement("option");

        // Ajout de toutes les options sur le sélécteur filtres
        option.classList.add("filters_select_option");

        // Ajout des nom sur les filtres
        option.value = filter;

        // Ajout des textes sur chaque texte
        option.textContent = filter;

        // Ajout des options sur le sélécteur filtres
        select.appendChild(option);
      });

      // Ajout des classes personnalisées sur chaque élément
      filters.classList.add("filters");
      title.classList.add("filters_title");
      select.classList.add("filters_select");

      // Ajout de chaque attribut sur chaque élément
      title.setAttribute("for", select.className);

      // Ajout des textes sur chaque élément
      title.textContent = "Trier par";

      // Ajout des éléments à la section filtres
      main.appendChild(filters);
      filters.appendChild(title);
      filters.appendChild(select);
    }

    // Fonction permettant de créer les images du photographe
    async function createPictures() {
      const medias = getMedias(photograph);
      const section = document.createElement("section");

      section.classList.add("pictures");

      (await medias).medias.forEach((media) => {
        // Création des cards pour chaque média
        const card = document.createElement("div");
        const cardImage = document.createElement(media.image ? "img" : "video");
        const cardAbout = document.createElement("div");
        const cardAboutName = document.createElement("p");
        const cardAboutLikes = document.createElement("div");
        const cardAboutLikesCount = document.createElement("span");
        const cardAboutLikesIcon = document.createElement("span");

        // Ajout des classes personnalisées sur chaque élément
        card.classList.add("pictures_card");
        cardImage.classList.add("pictures_card_image");
        cardAbout.classList.add("pictures_card_about");
        cardAboutName.classList.add("pictures_card_about_name");
        cardAboutLikes.classList.add("pictures_card_about_likes");
        cardAboutLikesCount.classList.add("pictures_card_about_likes_count");
        cardAboutLikesIcon.classList.add("pictures_card_about_likes_icon");

        // Ajout de chaque attribut sur chaque élément
        cardImage.setAttribute(
          "src",
          `../assets/images/${photograph.name
            .split(" ")[0]
            .replace("-", " ")}/${!media.image ? media.video : media.image}`
        );
        cardAboutLikes.setAttribute("aria-label", "likes");

        // Ajout des textes sur chaque élément
        cardAboutName.textContent = media.title;
        cardAboutLikesCount.textContent = media.likes;
        cardAboutLikesIcon.textContent = "\u2764";

        // Ajout des événements sur chaque élément
        cardImage.addEventListener("click", () =>
          console.log("card image click")
        );

        const initialLikes = Number(cardAboutLikesCount.textContent);
        cardAboutLikesIcon.addEventListener("click", () =>
          like(initialLikes, cardAboutLikesCount)
        );

        // Ajout des éléments à la section pictures
        card.appendChild(cardImage);
        card.appendChild(cardAbout);
        cardAbout.appendChild(cardAboutName);
        cardAbout.appendChild(cardAboutLikes);
        cardAboutLikes.appendChild(cardAboutLikesCount);
        cardAboutLikes.appendChild(cardAboutLikesIcon);
        section.appendChild(card);
      });

      main.appendChild(section);

      // Fonction permettant de mettre un j'aime sur une photo
      async function like(initialLikes, currentCount) {
        let currentLikes = Number(currentCount.textContent);
        currentCount.textContent =
          currentLikes != initialLikes + 1
            ? currentLikes + 1
            : currentLikes - 1;
      }
    }

    // Récupération de tous les médias du photographe
    async function getMedias(photograph) {
      const data = await fetch("../../data/photographers.json").then(
        (response) => response.json()
      );
      const medias = data.media.filter(
        (media) => media.photographerId === photograph.id
      );
      return {
        medias: [...medias],
      };
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
