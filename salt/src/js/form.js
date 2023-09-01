$(document).ready(function () {
    // очистка форм
    (function () {
        // очистка инпута
        function clearInput(clearInput) {
            const input = clearInput.querySelector('.input');
            const clearBtn = clearInput.querySelector('.clear-input');

            if (!clearBtn) {
                return;
            }

            clearBtn.addEventListener("click", function (e) {
                input.value = "";
            });
        }
        const label = document.querySelectorAll('.label');
        label.forEach(clearInput);

        // очистка Textarea
        function clearTextarea(clearTextarea) {
            const textarea = clearTextarea.querySelector('.textarea');
            const clearBtn = clearTextarea.querySelector('.clear-input');
            if (!clearBtn) {
                return;
            }
            clearBtn.addEventListener("click", function (e) {
                textarea.value = "";
            });
        }
        const labelTextarea = document.querySelectorAll('.label-textarea');
        labelTextarea.forEach(clearTextarea);
    })();

    // маска телефона
    jQuery(function ($) {
        $.mask.definitions['~'] = '[1,2,3,4,5,6,8,9]';
        $('.phone_validate').mask("+7 (~99) 999-99-99");
        $.mask.definitions['~'] = '[1,2,3,4,5,6,8,9]';
    });

    //   placeholder
    $('.input, .textarea').on('focusin', function () {
        $(this).addClass('is-active');
    });
    $('.input, .textarea').on('focusout', function () {
        if (!$(this).val()) {
            $(this).removeClass('is-active');
        }
    });




    //   автовысата textarea
    (function () {
        document.querySelectorAll('textarea').forEach(el => {
            el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
            el.classList.add('auto');
            el.addEventListener('input', e => {
                el.style.height = 'auto';
                el.style.height = (el.scrollHeight) + 'px';
            });
        });
    })();

    // Прикрепить файл
    (function () {
        const inputFile = document.querySelector('.input-file');
        const labelFileName = document.querySelector('.file-name');
        if (inputFile != null) {
            let clearFile = renderCloseBtn();

            inputFile.addEventListener('change', inputFileHendler)
            clearFile.addEventListener('click', cickCloseHeendler)

            function inputFileHendler(e) {
                let target = e.target;

                if (target == inputFile && target.files != null) {
                    let fileName = target.files[0].name;

                    labelFileName.textContent = fileName;
                    labelFileName.append(clearFile);
                }
            }

            function cickCloseHeendler(e) {
                e.preventDefault();
                inputFile.value = '';
                clearFile.remove();
                labelFileName.textContent = 'Прикрепить файл';
                const img = document.createElement('img');
                const contentCooperation = document.querySelector('.content__cooperation');
                img.classList.add('attach');
                img.src = '../img/attach.svg';
                labelFileName.appendChild(img);
            }

            function renderCloseBtn() {
                let span = document.createElement('span');
                span.classList.add('label-file__clear');
                span.innerHTML = '&times;';
                return span;
            }
        }
    })();
});