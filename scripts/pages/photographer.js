/**
 * It creates all the elements of the page
 */
const init = async () => {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const photographers = getPhotographers();
  const photograph = (await photographers).photographers.filter(
    (data) => data && data.id === id
  )[0];

  /* Checking if the photograph exists. If it doesn't exist, it redirects to the home page. */
  if (!photograph) {
    location.assign("/");
  }

  const medias = getMedias(photograph);
  let globalLikes = 0;
  (await medias).medias.map((media) => (globalLikes += media.likes));

  const createElements = async (photograph) => {
    /**
     * Create the elements for the page
     */
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

      fullName.classList.add("photograph_header_content_name");
      localization.classList.add("photograph_header_content_location");
      tagline.classList.add("photograph_header_content_tagline");
      picture.classList.add("photograph_header_content_picture");

      picture.setAttribute(
        "src",
        `assets/photographers/${photograph.portrait}`
      );
      picture.setAttribute("alt", photograph.name);

      fullName.textContent = photograph.name;
      localization.textContent = `${photograph.city}, ${photograph.country}`;
      tagline.textContent = photograph.tagline;

      headerContent.after(contactButton);
      headerContent.appendChild(fullName);
      headerContent.appendChild(localization);
      headerContent.appendChild(tagline);
      header.appendChild(picture);
    }
    if (main) {
      const pictures = document.createElement("section");

      pictures.classList.add("pictures");

      main.appendChild(pictures);

      createInfos();
      createFilters();
      createPictures("Popularité");
    }
  };

  /**
   * It creates the text content of the infosLikes and infosPrice elements.
   */
  const createInfos = async () => {
    const infosLikes = document.querySelector(".photograph_infos_likes");
    const infosPrice = document.querySelector(".photograph_infos_price");

    infosLikes.textContent = `${globalLikes} \u2764`;
    infosPrice.textContent = `${photograph.price}€ / heure`;
  };

  /**
   * Create filters
   */
  const createFilters = async () => {
    const filters = document.createElement("section");
    const title = document.createElement("label");
    const select = document.createElement("select");
    const options = ["Popularité", "Date", "Titre"];

    options.forEach((filter) => {
      const option = document.createElement("option");

      option.classList.add("filters_select_option");

      option.setAttribute("aria-label", `Trier par ${filter},`);

      option.value = filter;
      option.textContent = filter;

      select.appendChild(option);
    });

    filters.classList.add("filters");
    title.classList.add("filters_title");
    select.classList.add("filters_select");

    title.setAttribute("for", select.className);
    title.setAttribute("aria-selected", "Menu déroulant qui sert à trier les medias par popularité, date ou par ordre alphabétique,.")
    title.setAttribute("aria-label", "Menu déroulant qui sert à trier les medias par popularité, date ou par ordre alphabétique,.")

    select.setAttribute("tabindex", 1);

    select.addEventListener("change", (event) =>
      createPictures(event.target.value)
    );

    title.textContent = "Trier par";

    main.appendChild(filters);
    filters.appendChild(title);
    filters.appendChild(select);
  };

  /**
   * It adds a like to the photograph.
   */
  const like = async (currentLikes, count) => {
    const photographInfosLike = document.querySelector(
      ".photograph_infos_likes"
    );
    count.textContent = currentLikes;
    if (photographInfosLike) {
      photographInfosLike.textContent = `${(globalLikes += 1)} \u2764`;
    }
  };

  /**
   * Create cards for each media
   */
  const createPictures = async (filter) => {
    const section = document.querySelector(".pictures");
    if (section) {
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
          const card = document.createElement("div");
          const cardImage = document.createElement(
            media.image ? "img" : "video"
          );
          const cardAbout = document.createElement("div");
          const cardAboutName = document.createElement("p");
          const cardAboutLikes = document.createElement("div");
          const cardAboutLikesCount = document.createElement("span");
          const cardAboutLikesIcon = document.createElement("span");

          card.classList.add("pictures_card");
          cardImage.classList.add("pictures_card_image");
          cardAbout.classList.add("pictures_card_about");
          cardAboutName.classList.add("pictures_card_about_name");
          cardAboutLikes.classList.add("pictures_card_about_likes");
          cardAboutLikesCount.classList.add("pictures_card_about_likes_count");
          cardAboutLikesIcon.classList.add("pictures_card_about_likes_icon");

          cardImage.setAttribute(
            "src",
            `../assets/images/${photograph.name
              .split(" ")[0]
              .replace("-", " ")}/${!media.image ? media.video : media.image}`
          );

          cardAbout.setAttribute("aria-hidden", true);
          cardAboutLikes.setAttribute("aria-label", "Nombre de likes");
          cardImage.setAttribute("tabindex", 1);
          cardImage.setAttribute("aria-label", media.title);
          cardImage.setAttribute("role", "img");

          cardAboutName.textContent = media.title;
          cardAboutLikesCount.textContent = media.likes;
          cardAboutLikesIcon.textContent = "\u2764";

          cardImage.addEventListener("keydown", (event) => {
            const key = event.key;
            if (key === "Enter") {
              openLightBox(medias, photograph, media);
            }
          });
          cardImage.addEventListener("click", () =>
            openLightBox(medias, photograph, media)
          );

          cardAboutLikesIcon.addEventListener("click", () =>
            like((media.likes += 1), cardAboutLikesCount)
          );

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

  createElements(photograph);
};

/**
 * It fetches the data from the photographers.json file and filters the media based on the
 * photographerId.
 * @returns An object with a key of `medias` and a value of an array of media objects.
 */
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

/**
 * It fetches the data from the photographers.json file and returns it as a promise.
 * @returns The `getPhotographers` function returns a `Promise` object. The `Promise` object is a data
 * structure that represents the eventual completion or failure of an asynchronous operation, and its
 * resulting value.
 */
const getPhotographers = async () => {
  const photographers = await fetch("../../data/photographers.json").then(
    (response) => response.json()
  );
  return {
    photographers: [...photographers["photographers"]],
  };
};

init();
