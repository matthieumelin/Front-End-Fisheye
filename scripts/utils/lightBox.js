const lightbox = document.getElementById("lightbox");
const container = document.querySelector(".ligthbox_content_media_container");
let media;
let handleKeyboard;

const closeLightBox = async () => {
  container.removeChild(media);
  lightbox.style.display = "none";
  document.removeEventListener("keydown", handleKeyboard);
};

const openLightBox = async (medias, photograph, currentMedia) => {
  const mediaTitle = document.querySelector(
    ".ligthbox_content_media_container_media_title"
  );
  const mediaClose = document.querySelector(".lightbox_content_close");
  const mediaPath = `../assets/images/${photograph.name
    .split(" ")[0]
    .replace("-", " ")}/${
    !currentMedia.image ? currentMedia.video : currentMedia.image
  }`;
  const leftArrow = document.getElementById("lightbox_previous");
  const rightArrow = document.getElementById("lightbox_next");
  
  // Si le média est une vidéo un changement de node est effectué
  if (!currentMedia.image) {
    media = document.createElement("video");
    // Activation des controles pour pouvoir visionner la vidéo
    media.controls = true;
    media.setAttribute("type", "video/mp4");
  } else {
    media = document.createElement("img");
  }
  media.classList.add("ligthbox_content_media_container_media");

  media.setAttribute("src", mediaPath);
  media.setAttribute("aria-label", currentMedia.title);
  media.setAttribute("alt", currentMedia.title);

  // Ajout du média dans le container
  container.appendChild(media);
  mediaTitle.before(media);

  // Ajout du titre pour le média
  mediaTitle.textContent = currentMedia.title;

  // Ajouts des événements pour la lightbox
  mediaClose.addEventListener("click", closeLightBox);

  // Affichage de la lightbox
  lightbox.style.display = "block";

  const updateMedia = (newMedia) => {
    if (newMedia) {
      const mediaPath = `../assets/images/${photograph.name
        .split(" ")[0]
        .replace("-", " ")}/${
        !newMedia.image ? newMedia.video : newMedia.image
      }`;
      // Si le média est une vidéo un changement de node est effectué
      container.removeChild(media);
      // Si le média est une vidéo un changement de node est effectué
      if (!currentMedia.image) {
        media = document.createElement("video");
        // Activation des controles pour pouvoir visionner la vidéo
        media.controls = true;
        media.setAttribute("type", "video/mp4");
      } else {
        media = document.createElement("img");
      }
      media.classList.add("ligthbox_content_media_container_media");

      media.setAttribute("src", mediaPath);
      media.setAttribute("aria-label", currentMedia.title);
      media.setAttribute("alt", currentMedia.title);

      // Ajout du média dans le container
      container.appendChild(media);
      mediaTitle.before(media);

      // Ajout du titre pour le média
      mediaTitle.textContent = newMedia.title;
    }
  };

  // Récupération de tous les médias depuis la fonction d'ouverture de la lightbox
  const mediasArray = (await medias).medias;

  // Fonction permettant d'afficher le média précedent
  const previousMedia = () => {
    let currentIndex = mediasArray.findIndex(
      (media) => media.id === currentMedia.id
    );
    currentMedia = mediasArray[currentIndex > 0 ? currentIndex - 1 : 0];
    updateMedia(currentMedia);
  };

  // Fonction permettant d'afficher le média suivant
  const nextMedia = () => {
    let currentIndex = mediasArray.findIndex(
      (media) => media.id === currentMedia.id
    );
    currentMedia =
      mediasArray[
        currentIndex < mediasArray.length - 1
          ? currentIndex + 1
          : mediasArray.length - 1
      ];
    updateMedia(currentMedia);
  };

  handleKeyboard = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        previousMedia();
        break;
      case "ArrowRight":
        nextMedia();
        break;
      case "Escape":
        closeLightBox();
        break;
      default:
        break;
    }
  };

  // Ajout des événéments sur les flèches
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener("click", previousMedia);
    rightArrow.addEventListener("click", nextMedia);
  }

  document.addEventListener("keydown", handleKeyboard);
};
