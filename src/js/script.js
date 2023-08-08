Fancybox.bind("[data-fancybox]", {});

var swiper = new Swiper(".clients-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});