function openPopup(modalWindow) {
    modalWindow.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', handleCloseEscape);
    modalWindow.addEventListener('click', handleCloseOverlay);
}

function closePopup(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseEscape);
    modalWindow.removeEventListener('click', handleCloseOverlay);
}

function handleCloseEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function handleCloseOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
    }
}

export { openPopup, closePopup };