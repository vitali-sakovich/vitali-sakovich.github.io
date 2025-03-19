setTimeout(() => {
    window.sessionStorage.setItem("preloader", true);
});

if (!window.sessionStorage.getItem("preloader")) {
    preloaderAdd();
}

function preloaderAdd() {
    let div = document.createElement("div");
    div.className = "preloader";
    div.innerHTML = `<div class="preloader__wrap">
                            <img
                                src="./img/loader.gif"
                                width="233"
                                height="251"
                                class="preloader__img"
                            />
                        </div>`;
    document.body.append(div);
    document.body.classList.add('animation');

    window.addEventListener("load", () => {
        div.style.opacity = "0";
        document.body.classList.remove('animation');

        setTimeout(() => {
            div.remove();
        }, 100);
    });
}
