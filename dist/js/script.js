Fancybox.bind("[data-fancybox]", {});

var swiper = new Swiper(".clients-slider", {
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

// фокусировка табом
function formTab() {
    const formModal = document.querySelectorAll(".popup form");
    formModal.forEach(function (formModalItem) {
        let lastElem = formModalItem.querySelector(".last-elem");
        let firstElem = formModalItem.querySelector(".first-elem");

        if (!lastElem || !firstElem) {
            return;
        }

        lastElem.onkeydown = function (e) {
            if (e.key == "Tab" && !e.shiftKey) {
                firstElem.focus();
                return false;
            }
        };

        firstElem.onkeydown = function (e) {
            if (e.key == "Tab" && e.shiftKey) {
                lastElem.focus();
                return false;
            }
        };
        firstElem.focus();
    });
}

// открытие модалок
function openModal(modal) {
    modal.style.display = "flex";
    formTab();
    document.body.classList.add("hidden");
    modal.classList.add("popup--show");
}

// закрытие модалок
function modal(modal) {
    const overlay = modal.querySelector(".popup__overlay");
    const closeModal = modal.querySelectorAll(".popup__close");

    if (!overlay) {
        return;
    }
    closeModal.forEach(function (closeModalItem) {
        closeModalItem.addEventListener("click", modalHidden);
    });

    overlay.addEventListener("click", modalHidden);

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

// вызов модалок
const globalClickHandlers = {
    "js-open-modal": (node) =>
        openModal(document.querySelector(node.dataset.openModal)),
};
document.addEventListener("click", function (e) {
    var foundNodes = [];
    var checkRecursive = (target) => {
        if (target === document || target == undefined) {
            return false;
        }
        var cl = target.classList;

        if (cl === undefined) {
            return false;
        }
        var contains = false;
        for (var c of Object.keys(globalClickHandlers)) {
            if (cl.contains(c)) {
                contains = true;
                break;
            }
        }
        if (contains) {
            foundNodes.push(target);
        }

        return checkRecursive(target.parentElement);
    };
    checkRecursive(e.target);

    var handlers = Object.entries(globalClickHandlers);
    foundNodes.map((node) => {
        handlers.map(([className, callback]) => {
            if (node.classList.contains(className)) {
                callback(node);
            }
        });
    });
});

(() => {
    const menu = document.querySelector(".header__wrapper");
    const btn = document.querySelector(".burger");

    btn.addEventListener("click", () => {
        if (!menu.classList.contains("header__wrapper--is-active")) {
            document.body.classList.add("hidden");
            btn.classList.add("burger--is-active");
            menu.style.display = "flex";
            menu.classList.add("header__wrapper--is-active");
        } else {
            menu.classList.remove("header__wrapper--is-active");
            btn.classList.remove("burger--is-active");
            window.setTimeout(function () {
                menu.style.display = "none";
            }, 300);
            document.body.classList.remove("hidden");
        }
    });
})();

(() => {
    class ItcTabs {
        constructor(target, config) {
            const defaultConfig = {};
            this._config = Object.assign(defaultConfig, config);
            this._elTabs =
                typeof target === "string"
                    ? document.querySelector(target)
                    : target;
            this._elButtons = this._elTabs.querySelectorAll(".tabs__btn");
            this._elPanes = this._elTabs.querySelectorAll(".tabs__pane");
            this._eventShow = new Event("tab.itc.change");
            this._init();
            this._events();
        }
        _init() {
            this._elTabs.setAttribute("role", "tablist");
            this._elButtons.forEach((el, index) => {
                el.dataset.index = index;
                el.setAttribute("role", "tab");
                this._elPanes[index].setAttribute("role", "tabpanel");
            });
        }
        show(elLinkTarget) {
            const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
            const elLinkActive =
                this._elTabs.querySelector(".tabs__btn--active");
            const elPaneShow = this._elTabs.querySelector(".tabs__pane--show");
            if (elLinkTarget === elLinkActive) {
                return;
            }
            elLinkActive
                ? elLinkActive.classList.remove("tabs__btn--active")
                : null;
            elPaneShow ? elPaneShow.classList.remove("tabs__pane--show") : null;
            elLinkTarget.classList.add("tabs__btn--active");
            elPaneTarget.classList.add("tabs__pane--show");
            this._elTabs.dispatchEvent(this._eventShow);
            elLinkTarget.focus();
        }
        showByIndex(index) {
            const elLinkTarget = this._elButtons[index];
            elLinkTarget ? this.show(elLinkTarget) : null;
        }
        _events() {
            this._elTabs.addEventListener("click", (e) => {
                const target = e.target.closest(".tabs__btn");
                if (target) {
                    e.preventDefault();
                    this.show(target);
                }
            });
        }
    }

    if (document.querySelector(".tabs")) {
        new ItcTabs(".tabs");
    }
})();

(() => {
    const products = document.querySelector(".products");

    if (!products) return;

    let selectedItem;

    products.onclick = function (event) {
        let item = event.target.closest(".products__item");

        if (!item) return;

        if (!products.contains(item)) return;

        classAdd(item);
    };

    function classAdd(node) {
        if (selectedItem) {
            selectedItem.classList.remove("products__item--active");
        }
        selectedItem = node;
        selectedItem.classList.add("products__item--active");
        const block = node.querySelector(".products__subbrend");
        node.style.setProperty("--height-block", block.scrollHeight + "px");
    }
})();