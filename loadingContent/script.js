function loadingCards(source, recipient, selGetButton) {
    const getButton = document.querySelector(selGetButton);
    getButton.addEventListener('click', () => {
        getButton.querySelector("img").classList.add("animated", "infinite", "rotateIn");

        fetch(source).then((responce) => {
            if (responce.ok && responce.status == 200) {
                return responce.json();
            } else {
                statusText();
            }
        }).then((data) => {
            data.forEach(objCard => {
                const div = document.createElement("div");
                div.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1", "animated", "flipInY");
                div.innerHTML = `
                <div class=styles-block>
                    <img src="${objCard.img}" alt>
                    <h4>${objCard.name}</h4>
                    <a href="#">Подробнее</a>
                </div>
                `;
                document.querySelector(recipient).append(div);
            });
            getButton.remove();
        }).catch(() => {
            statusText();
        }).finally(() => {
            getButton.querySelector("img").classList.remove("animated", "infinite", "rotateIn");
        });
    });

    function statusText() {
        getButton.innerHTML = `
            <img src="./assets/img/catch.png" alt="">
            Что-то пошло не так
        `;
        setTimeout(() => {
            getButton.innerHTML = `
                <img src="./assets/img/reload.svg" alt="">
                Посмотреть больше стилей
            `;
        }, 2000);
    }
}