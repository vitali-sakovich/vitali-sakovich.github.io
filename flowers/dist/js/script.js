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
                    textarea.style.height = 75 + "px";
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
    });

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
        closeModalItem.addEventListener("click", modalHidden);
    });

    document.addEventListener("keydown", function (event) {
        const key = event.key;
        if (key === "Escape") {
            modalHidden();
        }
    });

    function modalHidden() {
        modal.classList.remove("popup--is-show");
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
                this._elTabs.querySelector(".tabs__btn--active");
            const elPaneShow = this._elTabs.querySelector(".tabs__panel--show");
            if (elLinkTarget === elLinkActive) {
                return;
            }
            elLinkActive
                ? elLinkActive.classList.remove("tabs__btn--active")
                : null;
            elPaneShow
                ? elPaneShow.classList.remove("tabs__panel--show")
                : null;
            elLinkTarget.classList.add("tabs__btn--active");
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
        const copyButton = document.querySelector(".js-btn-copy-btn");
        const copyInput = document.querySelector(".js-input-copy");
        const btnText = copyButton.querySelector("span");

        copyInput.value = window.location.href;

        copyButton.addEventListener("click", function (e) {
            copyInput.select();
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
            btnText.innerHTML = "Ссылка скопированна";
            copyButton.setAttribute("disabled", "true");

            setTimeout(() => {
                btnText.innerHTML = "Скопировать ссылку";
                copyButton.removeAttribute("disabled");
            }, 1000);
        });
    }
})();

// счетчик
(() => {
    function addHandlers(count) {
        const btnPlus = count.querySelector(".counter__btn--plus");
        const btnMinus = count.querySelector(".counter__btn--minus");
        const input = count.querySelector(".counter__input");

        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^\d,]/g, "");
            disabledBtn();
        });
        btnPlus.addEventListener("click", () => {
            input.value++;
            disabledBtn();
        });
        btnMinus.addEventListener("click", () => {
            input.value--;
            disabledBtn();
        });

        function disabledBtn() {
            if (input.value <= 1) {
                btnMinus.setAttribute("disabled", "disabled");
            } else {
                btnMinus.removeAttribute("disabled");
            }
        }
        disabledBtn();
    }
    const counts = document.querySelectorAll(".counter");
    counts.forEach(addHandlers);
})();