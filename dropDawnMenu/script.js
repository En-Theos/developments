function subMenu(selButton, selSubMenu) {
    const button = document.querySelector(selButton);
    const subMenu = document.querySelector(selSubMenu);

    button.addEventListener('click', () => {
        subMenu.classList.toggle("active");
    });

    window.addEventListener('click', (event) => {
        if (event.target !== subMenu && !event.target.closest(selSubMenu) && event.target !== button) {
            subMenu.classList.remove("active");
        }
    });
}

subMenu(".menu p", ".subMenu");