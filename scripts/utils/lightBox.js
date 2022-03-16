const lightbox = document.getElementById("lightbox");

const openLightBox = async (medias, photograph, currentMedia) => {
  const media = document.querySelector(
    ".ligthbox_content_media_container_media"
  );
  const mediaTitle = document.querySelector(
    ".ligthbox_content_media_container_media_title"
  );
  const mediaClose = document.querySelector(".lightbox_content_close");

  if (media && mediaTitle && mediaClose) {
    media.setAttribute(
      "src",
      `../assets/images/${photograph.name.split(" ")[0].replace("-", " ")}/${
        !currentMedia.image ? currentMedia.video : currentMedia.image
      }`
    );
    media.setAttribute("alt", currentMedia.title);
    media.setAttribute("aria-label", currentMedia.title);

    mediaTitle.textContent = currentMedia.title;

    mediaClose.addEventListener("click", () => console.log("ok"));

    lightbox.style.display = "block";
  }
};
const closeLightBox = async () => {
  lightbox.style.display = "none";
};
