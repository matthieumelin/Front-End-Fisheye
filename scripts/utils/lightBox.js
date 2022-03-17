const lightbox = document.getElementById("lightbox");
const container = document.querySelector(".ligthbox_content_media_container");
let media;
let handleKeyboard;

/**
 * It removes the media element from the DOM and removes the lightbox from the DOM.
 */
const closeLightBox = async () => {
  container.removeChild(media);
  lightbox.style.display = "none";
  document.removeEventListener("keydown", handleKeyboard);
};

/**
 * It opens the lightbox and sets up the events for the lightbox
 */
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

  /* It creates a video element if the currentMedia object has an image property set to false. It creates
an image element if the currentMedia object has an image property set to true. */
  if (!currentMedia.image) {
    media = document.createElement("video");
    media.controls = true;
    media.setAttribute("type", "video/mp4");
  } else {
    media = document.createElement("img");
  }
  /* It adds the class `ligthbox_content_media_container_media` to the media element. */
  media.classList.add("ligthbox_content_media_container_media");

  /* It sets the source of the media element to the path of the image or video. It also sets the
aria-label and alt attributes to the title of the media. */
  media.setAttribute("src", mediaPath);
  media.setAttribute("aria-label", currentMedia.title);
  media.setAttribute("alt", currentMedia.title);

  /* It adds the media element to the DOM and adds the media title to the DOM before the media element. */
  container.appendChild(media);
  mediaTitle.before(media);

  /* It sets the textContent of the mediaTitle element to the title of the currentMedia object. */
  mediaTitle.textContent = currentMedia.title;

  /* Adding an event listener to the mediaClose element. The event listener is calling the closeLightBox
function when the user clicks the close button. */
  mediaClose.addEventListener("click", closeLightBox);

  /* Setting the display property of the lightbox to block. */
  lightbox.style.display = "block";

  /**
   * It updates the media in the lightbox.
   */
  const updateMedia = (newMedia) => {
    if (newMedia) {
      const mediaPath = `../assets/images/${photograph.name
        .split(" ")[0]
        .replace("-", " ")}/${
        !newMedia.image ? newMedia.video : newMedia.image
      }`;
      /* It removes the media element from the DOM and removes the lightbox from the DOM. */
      container.removeChild(media);
      /* It creates a video element if the currentMedia object has an image property set to false. It creates
an image element if the currentMedia object has an image property set to true. */
      if (!currentMedia.image) {
        /* It creates a video element and sets the type of the video to `video/mp4`. */
        media = document.createElement("video");
        media.controls = true;
        media.setAttribute("type", "video/mp4");
      } else {
        /* It creates an image element and sets the source of the image to the path of the image. */
        media = document.createElement("img");
      }
      /* It adds the class `ligthbox_content_media_container_media` to the media element. */
      media.classList.add("ligthbox_content_media_container_media");

      /* It sets the source of the media element to the path of the image or video. It also sets the
aria-label and alt attributes to the title of the media. */
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

  const mediasArray = (await medias).medias;

  /**
   * The previousMedia function takes the currentMedia object and finds the index of the currentMedia
   * object in the mediasArray.
   */
  const previousMedia = () => {
    let currentIndex = mediasArray.findIndex(
      (media) => media.id === currentMedia.id
    );
    currentMedia = mediasArray[currentIndex > 0 ? currentIndex - 1 : 0];
    updateMedia(currentMedia);
  };

  /**
   * This function is used to update the current media object. It's called when the user clicks the next
   * button
   */
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
  /* A function that is called when a key is pressed. */
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
