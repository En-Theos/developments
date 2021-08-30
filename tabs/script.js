function tabs(selParentButton, selArrButton, selArrContent, classActive, animationOpen = false) {
    document.querySelector(selParentButton).addEventListener("click", (event) => {
       if (event.target && event.target.classList.contains(selArrButton.replace(/\./, ""))) { // .parentElement
            const arrButton = document.querySelectorAll(selArrButton),
                arrContent = document.querySelectorAll(selArrContent);

            arrButton.forEach((button, i) => {
                if (button == event.target) { // .parentElement
                    button.classList.add(classActive);
                    arrContent[i].style.display = "block";
                    if (animationOpen) {
                        arrContent[i].classList.add("animated", animationOpen);
                    }
                } else {
                    button.classList.remove(classActive);
                    arrContent[i].style.display = "none";
                }
            });
        }
    });
}

tabs(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active", "swing");