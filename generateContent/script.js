function card() {
    class CardMenu {
        constructor({ src, alt, title, descr, price }) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.convertUAH();
        }
        convertUAH() {
            this.price *= 27;
        }

        generateCard() {
            const div = document.createElement("div");
            div.classList.add("menu__item");

            div.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            document.body.append(div);
        }
    }

    fetch("../db.json").then((data) => {
        if (!data.ok) {
            throw new Error(`Cloud not fetch: http://localhost:3000/menu, status: ${data.status}`);
        }
        return data.json();
    }).then((data) => data.forEach(obj => new CardMenu(obj).generateCard()));
}