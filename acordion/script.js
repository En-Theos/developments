function spoiler(selButtons, selContents) {
    const buttons = document.querySelectorAll(selButtons);
    const contents = document.querySelectorAll(selContents);

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            contents[index].classList.toggle("msgActive");
            contents[index].classList.toggle("animated");
            contents[index].classList.toggle("flipInX");
        });
    });
}
spoiler(".plus__content", ".msg");

function accordion(selButton, selContent) {
    const arrButton = document.querySelectorAll(selButton);
    const arrContent = document.querySelectorAll(selContent);

    arrButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (!button.classList.contains("active")) {
                arrButton.forEach(btn => btn.classList.remove("active"));
                arrContent.forEach(content => content.classList.remove("active", "animated", "flipInX"));
            }
            button.classList.toggle("active");
            arrContent[index].classList.toggle("active");
            arrContent[index].classList.toggle("animated");
            arrContent[index].classList.toggle("flipInX");
        }); 
    });
}

accordion(".accordion-heading span", ".accordion-block");