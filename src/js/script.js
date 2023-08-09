(() => {
    Fancybox.bind("[data-fancybox]", {});

    (() => {
        var swiper = new Swiper(".clients-slider", {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    })();

    // события на инпут
    (() => {
        function inputEvent(label) {
            const input = label.querySelector(".js-input");
            const clearBtn = label.querySelector(".js-clear-input");

            function inputValueСheck() {
                if (input.value != "") {
                    label.classList.add("label--is-active");
                } else {
                    label.classList.remove("label--is-active");
                }
            }

            function inputFocus() {
                label.classList.add("label--is-active");
            }

            input.addEventListener("input", inputValueСheck);
            input.addEventListener("focus", inputFocus);
            input.addEventListener("blur", inputValueСheck);

            if (clearBtn) {
                clearBtn.addEventListener("click", () => {
                    input.value = "";
                    inputValueСheck();
                });
            }

            inputValueСheck();
        }

        const label = document.querySelectorAll(".js-label");
        label.forEach(inputEvent);
    })();
})();
