const displayModal = () => {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "block";
    }
}

const closeModal = () => {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "none";
    }
}
