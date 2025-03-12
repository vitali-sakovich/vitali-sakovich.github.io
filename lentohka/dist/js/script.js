window.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind("[data-fancybox]", {});

    var swiper = new Swiper('.js-preview-slider', {
        slidesPerView: 1,
        effect: 'fade',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });

    (() => {
        var swiper = new Swiper(".js-slider-thumbs", {
            loop: true,
            spaceBetween: 24,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                320: {
                    direction: "horizontal",
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 8,
                },
                650: {
                    direction: "horizontal",
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 20,
                },
                950: {
                    direction: "vertical",
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 24,
                },
                1500: {
                    direction: "vertical",
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 24,
                },
            },
        });
        var swiper2 = new Swiper(".js-slider-product", {
            loop: true,
            effect: "fade",
            navigation: {
                nextEl: ".js-slider-btn-next",
                prevEl: ".js-slider-btn-prev",
            },
            thumbs: {
                swiper: swiper,
            },
        });
    })();

    new NativejsSelect({
        selector: "select",
        disableMobile: false,
        enableSearch: false,
    });

    // события на инпут
    (() => {
        function inputEvent(label) {
            const input = label.querySelector(".js-input");
            const textarea = label.querySelector("textarea");
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

                    if (textarea) {
                        textarea.style.height = 104 + "px";
                    }
                });
            }

            if (textarea) {
                textarea.style.height = textarea.setAttribute(
                    "style",
                    "height: " + textarea.scrollHeight + "px"
                );
                textarea.addEventListener("input", (e) => {
                    textarea.style.height = textarea.scrollHeight + "px";
                });
            }

            inputValueСheck();
        }

        const label = document.querySelectorAll(".js-label");
        label.forEach(inputEvent);
    })();
    (() => {
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
                        this.classList.remove("not");
                    }
                    if (event.type == "blur" && this.value.length < 5) {
                        this.value = "";
                        this.classList.add("not");
                    }
                }

                input.addEventListener("input", mask, false);
                input.addEventListener("focus", mask, false);
                input.addEventListener("blur", mask, false);
                input.addEventListener("keydown", mask, false);
            }
        );

        const formHandle = document.querySelectorAll("form");

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
        modal.classList.add("popup--is-show");
    }

    // закрытие модалок
    function modal(modal) {
        const closeModal = modal.querySelectorAll(".js-popup-close");

        if (!closeModal) {
            return;
        }
        closeModal.forEach(function (closeModalItem) {
            closeModalItem.addEventListener("click", () => modalHidden(modal));
        });

        document.addEventListener("keydown", function (event) {
            const key = event.key;
            if (key === "Escape") {
                modalHidden(modal);
            }
        });
    }
    function modalHidden(modal) {
        modal.classList.remove("popup--is-show");
        document.body.classList.remove("hidden");
        window.setTimeout(function () {
            modal.style.display = "none";
        }, 300);
    }
    const modals = document.querySelectorAll(".js-popup");
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

    // функция инициализации слайдера
    const rangeSliderInit = (slider) => {
        const range = slider.querySelector(".js-range");
        const inputMin = slider.querySelector(".js-value-min");
        const inputMax = slider.querySelector(".js-value-max");
        const toValue = Number(range.dataset.to);
        const fromValue = Number(range.dataset.from);

        if (!range || !inputMin || !inputMax) return;

        const inputs = [inputMin, inputMax];

        noUiSlider.create(range, {
            start: [fromValue, toValue],
            connect: true,
            range: {
                min: fromValue,
                max: toValue,
            },
            step: 1,
        });

        range.noUiSlider.on("update", function (values, handle) {
            inputs[handle].value = parseInt(values[handle]);
        });

        inputMin.addEventListener("change", function () {
            range.noUiSlider.set([this.value, null]);
        });

        inputMax.addEventListener("change", function () {
            range.noUiSlider.set([null, this.value]);
        });
    };

    const init = () => {
        const ranges = document.querySelectorAll(".range");
        ranges.forEach(rangeSliderInit);
    };
    init();

    (() => {
        function showFilter(item) {
            const btn = item.querySelector(".filter-uncover");
            const checkboxs = item.querySelectorAll(".checkbox");
    
            if (!btn) return;
    
            if (checkboxs.length <= 6) {
                btn.remove();
            }
    
            btn.addEventListener("click", () => {
                if (!item.classList.contains("filter--is-show")) {
                    btn.firstElementChild.textContent = "Скрыть";
                    item.classList.add("filter--is-show");
                } else {
                    btn.firstElementChild.textContent = "Раскрыть все";
                    item.classList.remove("filter--is-show");
                }
            });
        }
        document.querySelectorAll(".filter").forEach(showFilter);
    })();

    // табы
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
                this._elPanes = this._elTabs.querySelectorAll(".tabs__panel");
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
                    this._elTabs.querySelector(".tab-btn--active");
                const elPaneShow = this._elTabs.querySelector(".tabs__panel--show");
                if (elLinkTarget === elLinkActive) {
                    return;
                }
                elLinkActive
                    ? elLinkActive.classList.remove("tab-btn--active")
                    : null;
                elPaneShow
                    ? elPaneShow.classList.remove("tabs__panel--show")
                    : null;
                elLinkTarget.classList.add("tab-btn--active");
                elPaneTarget.classList.add("tabs__panel--show");
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
});