window.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind("[data-fancybox]", {});

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
});