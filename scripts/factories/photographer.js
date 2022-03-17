let index = 0;

/**
 * It creates a new photographer object.
 * @returns A function that returns a photographer object.
 */
const photographerFactory = (data) => {
  const { id, name, portrait, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;

  /**
   * It creates a DOM element for a photographer card.
   * @returns A DOM element.
   */
  function getUserCardDOM() {
    index = index + 1;

    const photographer = document.createElement("article");
    const header = document.createElement("a");
    const headerImage = document.createElement("img");
    const headerFullName = document.createElement("h2");
    const localization = document.createElement("p");
    const slogan = document.createElement("p");
    const pricePerHour = document.createElement("p");

    photographer.classList.add("photographer");
    header.classList.add("photographer_header");
    headerImage.classList.add("photographer_header_image");
    headerFullName.classList.add("photographer_header_name");
    localization.classList.add("photographer_location");
    slogan.classList.add("photographer_tagline");
    pricePerHour.classList.add("photographer_price");


    photographer.setAttribute("aria-label", `Carte de ${name},.`);
    header.setAttribute("href", `/photographer.html?id=${id}`);
    header.setAttribute("role", "banner");
    header.setAttribute("aria-label", `Lien vers la page de ${name},.`);
    header.setAttribute("tabindex", index);

    headerImage.setAttribute("src", picture);
    headerImage.setAttribute("alt", `Photo de ${name},.`);
    headerImage.setAttribute("role", "img");
    headerImage.setAttribute("aria-describedBy", "picture");

    headerFullName.setAttribute("aria-label", ",est le nom du photographe,.");

    localization.setAttribute("aria-label", "Lieu,");

    slogan.setAttribute("aria-label", "Son slogan,")

    pricePerHour.setAttribute("aria-label", "Son prix est de,");

    headerFullName.textContent = name;
    localization.textContent = `${city}, ${country}`;
    slogan.textContent = tagline;
    pricePerHour.textContent = `${price}€/heure`;

    photographer.appendChild(header);
    photographer.appendChild(localization);
    photographer.appendChild(slogan);
    photographer.appendChild(pricePerHour);

    header.appendChild(headerImage);
    header.appendChild(headerFullName);

    return photographer;
  }
  return { name, picture, getUserCardDOM };
};
