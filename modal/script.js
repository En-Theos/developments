function modal(selModal, selButton, classButtonClose,
     {animationOpen = false, animationClose = false},
     {destoy = false, openTime = false, openScroll = false, keydown = false}
    ) {
    document.querySelectorAll(selButton).forEach(button => {
        button.addEventListener('click', () => {
            codeShow();
            if (destoy) {
                button.remove();
            }
        });
    });

    const modalWindow = document.querySelector(selModal);
    modalWindow.addEventListener('click', (event) => {
        if (event.target && event.target == modalWindow || event.target.classList.contains(classButtonClose)) {
            codeHide();
        }
    });

    function codeShow() {
        modalWindow.style.display = "block";
        if (animationOpen) {
            modalWindow.classList.add("animated", animationOpen);
            modalWindow.classList.remove(animationClose);
            modalWindow.removeEventListener('animationend', eventAnimationend);
        } else {
            modalWindow.classList.remove(animationClose);
        }
        document.body.style.overflow = "hidden";
        document.documentElement.style.marginRight = div.offsetWidth - div.clientWidth + "px";

        window.removeEventListener('scroll', scrollShowModal);
    }
    
    function codeHide() {
        if (animationClose) {
            modalWindow.classList.add("animated", animationClose);
            modalWindow.classList.remove(animationOpen);
            modalWindow.addEventListener('animationend', eventAnimationend);
        } else {
            eventAnimationend();
        }
    }
    
    function eventAnimationend() {
        modalWindow.style.display = "none";
        document.body.style.overflow = "";
        document.documentElement.style.marginRight = "";
    }

    function scrollShowModal() {
        if (openScroll) {
            const totalScroll = document.documentElement.scrollHeight - 1;
            const currentScroll = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (totalScroll <= currentScroll) {
                codeShow();
            }
        }
    }
    window.addEventListener('scroll', scrollShowModal);

    if (openTime) {
        setTimeout(() => {
            let display;
    
            document.querySelectorAll("[data-modal]").forEach(item => {
                if (window.getComputedStyle(item).display == "block") {
                    display = "block";
                }
            });
    
            if (!display) {
                codeShow();
            }
        }, 6000); 
    }
    
    if (keydown) {
        document.addEventListener('keydown', (event) => {
            if (event.code == keydown) {
                codeHide();
            }
        });
    }
}
modal(".modal", ".btn_white", "modal__close", {
    animationOpen: "fadeInDown",
    animationClose: "fadeInUp"
}, {
    openScroll: true,
    keydown: 'Escape'
});

const div = document.createElement("div");
div.style.cssText = `
        width: 50px;
        height: 50px;
        overflow-y: scroll;
        visibility: hidden;
    `;
document.body.append(div);