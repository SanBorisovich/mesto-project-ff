// Функция открытия Попапа

function openPopup(modalWindow) {
    modalWindow.classList.add("popup_is-opened");
    
    const popupCloseButton = modalWindow.querySelector(".popup__close");

    popupCloseButton.addEventListener("click", closePopup);
    document.addEventListener("keydown", handleCloseEscape);
    modalWindow.addEventListener("click", handleCloseOverlay);

};

// Функция закртия по нажатию ESC

function handleCloseEscape(evt) {
    if (evt.key === "Escape") {
        closePopup();
    }
};

// Функция закрытия по Оверлей

function handleCloseOverlay(evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
        closePopup();
    }
}

// Функция закрытия Попапа

function closePopup() {
    const openedPopup = document.querySelector('.popup_is-opened');
    const popupCloseButton = openedPopup.querySelector('.popup__close');
    openedPopup.classList.remove("popup_is-opened");

    popupCloseButton.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", handleCloseEscape);
    openedPopup.removeEventListener("click",handleCloseOverlay);
}

export { openPopup, closePopup }