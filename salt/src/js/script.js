Fancybox.bind("[data-fancybox]", {});

(() => {
    if (!document.querySelector(".projects-slider__swiper")) return;

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
                slidesPerView: "auto",
            },
            600: {
                spaceBetween: 39,
                slidesPerView: 2,
            },
            1200: {
                spaceBetween: 37,
                slidesPerView: 3,
            },
            1600: {
                spaceBetween: 60,
            },
        },
    });
})();

(() => {
    const item = document.querySelector(".nav-networks__link--showreel");
    window.addEventListener("scroll", (e) => {
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

(() => {
    const tags = document.querySelector(".blog-tags");

    if (!tags) return;

    const btn = tags.querySelector(".js-add-btn-tags");
    const item = tags.querySelectorAll(".blog-tags__item");

    if (item.length < 15) {
        btn.remove();
    }

    btn.addEventListener("click", () => {
        if (!tags.classList.contains("blog-tags--is-show")) {
            tags.classList.add("blog-tags--is-show");
            btn.innerHTML = "Скрыть теги";
        } else {
            tags.classList.remove("blog-tags--is-show");
            btn.innerHTML = "Ещё теги";
        }
    });
})();

(() => {
    const container = document.querySelector(".reviews");
    const box = container.querySelectorAll(".review-card");
    const btn = container.querySelector(".js-btn-all-reviews");

    for (let i = 9; i < box.length; i++) {
        box[i].style.display = "none";
    }

    let countD = 9;
    btn.addEventListener("click", function () {
        const box = container.querySelectorAll(".review-card");
        countD += 9;

        for (let i = 0; i < countD; i++) {
            if (box[i] == undefined) {
                btn.remove();
                return;
            }
            box[i].style.display = "grid";
        }
    });
})();
