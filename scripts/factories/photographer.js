function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Création des éléments
        const photographer = document.createElement( 'article' );
        const header = document.createElement("div");
        const headerImage = document.createElement( 'img' );
        const headerFullName = document.createElement( 'h2' );
        const localization = document.createElement("p");
        const slogan = document.createElement("p");
        const pricePerDay = document.createElement("p");

        // Ajout des classes CSS personnalisées
        photographer.classList.add("photographer");
        header.classList.add("photographer_header");
        headerImage.classList.add("photographer_header_image");
        headerFullName.classList.add("photographer_header_name");
        localization.classList.add("photographer_location");
        slogan.classList.add("photographer_tagline");
        pricePerDay.classList.add("photographer_price");

        header.addEventListener("click", () => location.assign(`/photographer.html?id=${id}`));
        headerImage.setAttribute("src", picture);
        
        headerFullName.textContent = name;
        localization.textContent = `${city}, ${country}`;
        slogan.textContent = tagline;
        pricePerDay.textContent = `${price}€/heure`;
        
        // Ajout de tous les éléments au photographer
        photographer.appendChild(header);
        photographer.appendChild(localization);
        photographer.appendChild(slogan);
        photographer.appendChild(pricePerDay);

        header.appendChild(headerImage);
        header.appendChild(headerFullName);
        
        return (photographer);
    }
    return { name, picture, getUserCardDOM }
}