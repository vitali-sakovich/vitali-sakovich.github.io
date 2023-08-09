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

    // очистка инпута
    (() => {
        function clearInput(clearInput) {
            const input = clearInput.querySelector(".js-input");
            const clearBtn = clearInput.querySelector(".js-clear-input");

            if (!clearBtn) {
                return;
            }

            clearBtn.addEventListener("click", function (e) {
                input.value = "";
            });
        }
        const label = document.querySelectorAll(".js-label");
        label.forEach(clearInput);
    })();
})();
