Fancybox.bind("[data-fancybox]", {});

if (document.querySelector(".vacancies-select__select")) {
    new NativejsSelect({
        selector: ".vacancies-select__select",
        disableMobile: false,
        enableSearch: false,
    });
}

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

(() => {
    window.addEventListener("DOMContentLoaded", function () {
        [].forEach.call(
            document.querySelectorAll(".js-input-mask"),
            function (input) {
                var keyCode;
                function mask(event) {
                    event.keyCode && (keyCode = event.keyCode);
                    var pos = this.selectionStart;
                    if (pos < 3) event.preventDefault();
                    var matrix = "+7 (___) ___-__-__",
                        i = 0,
                        def = matrix.replace(/\D/g, ""),
                        val = this.value.replace(/\D/g, ""),
                        new_value = matrix.replace(/[_\d]/g, function (a) {
                            return i < val.length ? val.charAt(i++) : a;
                        });
                    i = new_value.indexOf("_");
                    if (i != -1) {
                        i < 5 && (i = 3);
                        new_value = new_value.slice(0, i);
                    }
                    var reg = matrix
                        .substr(0, this.value.length)
                        .replace(/_+/g, function (a) {
                            return "\\d{1," + a.length + "}";
                        })
                        .replace(/[+()]/g, "\\$&");
                    reg = new RegExp("^" + reg + "$");
                    if (
                        !reg.test(this.value) ||
                        this.value.length < 5 ||
                        (keyCode > 47 && keyCode < 58)
                    ) {
                        this.value = new_value;
                        if (this.classList.contains("js-input-mask")) {
                            this.classList.remove("not");
                        }
                    }
                    if (event.type == "blur" && this.value.length < 5) {
                        this.classList.add("not");
                    }

                    console.log(this.value);
                }

                input.addEventListener("input", mask, false);
                input.addEventListener("focus", mask, false);
                input.addEventListener("blur", mask, false);
                input.addEventListener("keydown", mask, false);
            }
        );
    });

    const formHandle = document.querySelectorAll(".form");

    formHandle.forEach((formItem) => {
        new Validator(formItem, function (err, res) {
            return res;
        });
    });
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

/* Add file for form vacancy */
(function () {
    window.onload = function () {
        if (document.forms.vacancy != null) {
            const divFiles =
                document.forms.vacancy.querySelector(".form__files"); // "vacancy" it is name form

            if (divFiles != null) {
                /!* Events form *!/;
                divFiles.addEventListener("change", eventChangeInput);
                divFiles.addEventListener("click", eventClickBtnDelete);

                /!* Functions *!/;
                function eventClickBtnDelete(e) {
                    if (e.target.classList.contains("file-delete")) {
                        e.preventDefault();
                        e.target.parentElement.parentElement.remove();
                    }
                }

                function eventChangeInput(e) {
                    if (e.target.tagName == "INPUT") {
                        if (e.target.files != null) {
                            let input = e.target;
                            let label = e.target.parentElement;
                            let divFiles = label.parentElement;
                            let span = label.querySelector("span");
                            let btnDelete = label.querySelector(".file-delete");
                            let countFormFile =
                                divFiles.querySelectorAll(".file").length;
                            if (countFormFile > 5) return;

                            /!* Update text *!/;
                            span.innerHTML = `
                          ${input.files[0].name}
                            <button type="button" title="удалить файл" aria-label="удалить файл" class="file-delete file__delete">
                                <svg width="16" height="16" class="file-delete__icon">
                                    <use xlink:href="./img/svg-sprite.svg#clear"></use>
                                </svg>
                            </button>
                      `;
                            /!* Add new block *!/;
                            if (btnDelete == null) {
                                divFiles.insertAdjacentHTML(
                                    "beforeend",
                                    `
                              <label class="file form__file">
                                  <input type="file" name="file${countFormFile}" hidden/>
                                  <span class="file__name">
                                      Прикрепить файл
                                      <svg
                                      width="16"
                                      height="20"
                                      class="file__icon"
                                  >
                                      <use
                                          xlink:href="./img/svg-sprite.svg#attach"
                                      ></use>
                                    </svg>
                                  </span>
                              </label>
                          `
                                );
                            }
                        }
                    }
                }
            }
        }
    };
})();
