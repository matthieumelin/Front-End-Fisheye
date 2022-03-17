// Fonction lors du chargement de la page
const init = async () => {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const photographers = getPhotographers();
  const photograph = (await photographers).photographers.filter(
    (data) => data && data.id === id
  )[0];

  // Si le photographe n'existe pas, retour à l'accueil
  if (!photograph) {
    location.assign("/");
  }

  // Récupération de tous les médias
  const medias = getMedias(photograph);
  // Likes global
  let globalLikes = 0;
  (await medias).medias.map((media) => (globalLikes += media.likes));

  // Fonction pour créer tous les éléments de la page
  const createElements = async (photograph) => {
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
      // Création de l'élément pictures
      const pictures = document.createElement("section");
      // Ajout du nom de la section pictures
      pictures.classList.add("pictures");
      // Ajout de la section pictures au main
      main.appendChild(pictures);

      // Création des infos en bas à droite
      createInfos();
      // Création des filtres
      createFilters();
      // Création des photos
      createPictures("Popularité");
    }
  };

  // Fonction permettant de créer les informations en bas à droite
  const createInfos = async () => {
    const infosLikes = document.querySelector(".photograph_infos_likes");
    const infosPrice = document.querySelector(".photograph_infos_price");

    // Ajout des textes sur chaque élément
    infosLikes.textContent = `${globalLikes} \u2764`;
    infosPrice.textContent = `${photograph.price}€ / heure`;
  };

  // Fonction permettant de créer les filtres
  const createFilters = async () => {
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

    // Ajout des événements sur chaque élément
    select.addEventListener("change", (event) =>
      createPictures(event.target.value)
    );

    // Ajout des textes sur chaque élément
    title.textContent = "Trier par";

    // Ajout des éléments à la section filtres
    main.appendChild(filters);
    filters.appendChild(title);
    filters.appendChild(select);
  };

  // Fonction permettant de mettre un j'aime sur une photo
  const like = async (currentLikes, count) => {
    const photographInfosLike = document.querySelector(
      ".photograph_infos_likes"
    );
    count.textContent = currentLikes;
    if (photographInfosLike) {
      photographInfosLike.textContent = `${globalLikes+=1} \u2764`;
    }
  };

  // Fonction permettant de créer les images du photographe
  const createPictures = async (filter) => {
    const section = document.querySelector(".pictures");
    if (section) {
      // Les anciens éléments sont supprimés pour pouvoir être recréer.
      section.innerHTML = "";

      (await medias).medias
        .sort((a, b) =>
          filter === "Popularité"
            ? b.likes - a.likes
            : filter === "Date"
            ? new Date(b.date) - new Date(a.date)
            : a.title.localeCompare(b.title)
        )
        .forEach((media) => {
          // Création des cards pour chaque média
          const card = document.createElement("div");
          const cardImage = document.createElement(
            media.image ? "img" : "video"
          );
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
            openLightBox(medias, photograph, media)
          );

          cardAboutLikesIcon.addEventListener(
            "click",
            () => like(media.likes+=1, cardAboutLikesCount));

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
    }
  };

  // Création des éléments
  createElements(photograph);
};

// Récupération de tous les médias du photographe
const getMedias = async (photograph) => {
  const data = await fetch("../../data/photographers.json").then((response) =>
    response.json()
  );
  const medias = data.media.filter(
    (media) => media.photographerId === photograph.id
  );
  return {
    medias: [...medias],
  };
};

// Récupération de tous les photographers
const getPhotographers = async () => {
  const photographers = await fetch("../../data/photographers.json").then(
    (response) => response.json()
  );
  return {
    photographers: [...photographers["photographers"]],
  };
};

init();
