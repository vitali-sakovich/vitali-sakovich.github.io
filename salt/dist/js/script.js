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
