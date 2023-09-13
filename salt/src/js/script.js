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
    if (!document.querySelector(".team-slider")) return;

    var swiper = new Swiper(".team-slider", {
        slidesPerView: 1,
        autoHeight: true,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
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
    if (!container) return;
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

(() => {
    const shareButtons = document.querySelectorAll(".js-btn-sharing");

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        },
    };

    shareButtons.forEach((shareButton) => {
        if (shareButton) {
            let thisUrl = window.location.href;
            let thisTitle = document.title;
            shareButton.addEventListener("click", function () {
                // Проверка поддержки navigator.share
                if (navigator.share && isMobile.any()) {
                    // navigator.share принимает объект с URL, title или text
                    navigator
                        .share({
                            title: thisTitle,
                            url: thisUrl,
                        })
                        .then(function () {
                            // Shareing successfull
                        })
                        .catch(function () {
                            // Sharing failed
                        });
                } else {
                    openModal(document.querySelector(".popup--sharing"));
                    copyUrl();
                }
            });
        }
    });

    function copyUrl() {
        const copyButton = document.querySelector(".js-btn-copy-link");
        const copyInput = document.querySelector(".js-input-copy");

        copyInput.value = window.location.href;

        copyButton.addEventListener("click", function (e) {
            copyInput.select();
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
            copyButton.innerHTML = "Ссылка скопированна";
            copyButton.setAttribute("disabled", "true");

            setTimeout(() => {
                copyButton.innerHTML = "Скопировать ссылку";
                copyButton.removeAttribute("disabled");
            }, 1000);
        });
    }
})();

// закрытие модалок
function modal(modal) {
    const closeModal = modal.querySelectorAll(".js-popup-close");

    if (!closeModal) {
        return;
    }
    closeModal.forEach(function (closeModalItem) {
        closeModalItem.addEventListener("click", modalHidden);
    });

    function modalHidden() {
        modal.classList.remove("popup--show");
        document.body.classList.remove("hidden");
        window.setTimeout(function () {
            modal.style.display = "none";
        }, 300);
    }
}
const modals = document.querySelectorAll(".popup");
modals.forEach(modal);

// открытие модалок
function openModal(modal) {
    modal.style.display = "flex";
    document.body.classList.add("hidden");
    modal.classList.add("popup--show");
}

(() => {
    const faq = document.querySelector(".faq");
    if (!faq) return;
    const items = faq.querySelectorAll(".faq__item");

    items.forEach((item) => {
        const btn = item.querySelector(".faq__btn");
        const content = item.querySelector(".faq__content");

        btn.addEventListener("click", () => {
            if (!btn.classList.contains("faq__btn--is-active")) {
                btn.classList.add("faq__btn--is-active");
                content.classList.add("faq__content--is-active");
                content.style.height = content.scrollHeight + "px";
            } else {
                btn.classList.remove("faq__btn--is-active");
                content.classList.remove("faq__content--is-active");
                content.style.height = 0;
            }
        });
    });
})();
