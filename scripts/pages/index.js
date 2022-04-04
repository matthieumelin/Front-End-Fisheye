/**
 * It fetches the data from the photographers.json file and returns it as a promise.
 * @returns An object with a single key, "photographers". The value of the "photographers" key is an
 * array of objects. Each object represents a photographer.
 */
const getPhotographers = async () => {
  const photographers = await fetch("./data/photographers.json").then(
    (response) => response.json()
  );
  return {
    photographers: [...photographers["photographers"]],
  };
};

/**
 * It takes in a list of photographers and then creates a user card for each one.
 */
const displayData = async (photographers) => {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

/**
 * It gets the data from the API and displays it on the page.
 */
const init = async () => {
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();
