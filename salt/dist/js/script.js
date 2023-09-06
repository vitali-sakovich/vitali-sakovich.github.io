var swiper = new Swiper(".projects-slider__swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        600: {
            slidesPerView: 2,
        },
        900: {
            slidesPerView: 3,
        },
    },
});

(() => {
    const item = document.querySelector(".nav-networks__link--showreel");
    window.addEventListener("scroll", (e) => {
        console.log(window.pageYOffset);
        if (window.pageYOffset > 0) {
            item.classList.add("nav-networks__link--is-show");
        } else {
            item.classList.remove("nav-networks__link--is-show");
        }
    });
})();

(() => {
    const btn = document.querySelector(".js-open-menu");
    const header = document.querySelector(".header");
    const nav = document.querySelector(".nav");

    btn.addEventListener("click", () => {
        if (!header.classList.contains("header--is-active")) {
            header.classList.add("header--is-active");
            document.body.classList.add("hidden");
            nav.style.display = "flex";
        } else {
            header.classList.remove("header--is-active");
            document.body.classList.remove("hidden");
            setTimeout(() => (nav.style.display = "none"), 300);
        }
    });
})();
