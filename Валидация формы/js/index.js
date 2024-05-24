document.addEventListener("DOMContentLoaded", function() {
    // Функции для работы с ошибками
    function removeError(input) {
        const parent = input.parentNode;
        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error');
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');
        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;
        parent.classList.add('error');
        parent.append(errorLabel);
    }

    function validation(form) {
        let result = true;
        const allInputs = form.querySelectorAll('input');

        for (const input of allInputs) {
            removeError(input);

            if (input.dataset.minLength) {
                if (input.value.length < input.dataset.minLength) {
                    removeError(input)
                    createError(input, `Минимальное кол-во символов: ${input.dataset.minLength}`)
                    result = false
                }
            }

            if (input.dataset.maxLength) {
                if (input.value.length > input.dataset.maxLength) {
                    removeError(input)
                    createError(input, `Максимальное кол-во символов: ${input.dataset.maxLength}`)
                    result = false
                }
            }

            if (input.dataset.required == "true") {
                if (input.value == "") {
                    removeError(input)
                    createError(input, 'Поле не заполнено!')
                    result = false
                }
            }
        }

        return result;
    }

    
    // Валидация и отправка формы
    document.getElementById('add-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validation(this)) {
            window.location.href = this.getAttribute('action'); // Переход на страницу "спасибо"
        }
    });

    // Настройка маски для ввода номера телефона и фильтрация символов
    const phoneInputField = document.querySelector("#phone");
    $(phoneInputField).inputmask("+38 (999) 999-99-99", { clearMaskOnLostFocus: true });

    const phoneInput = window.intlTelInput(phoneInputField, {
        preferredCountries: ["ua"],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    // Фильтрация ввода электронной почты
    const emailInputField = document.querySelector(".email-input");
    emailInputField.addEventListener('input', function(event) {
        event.target.value = event.target.value.replace(/[^a-zA-Z0-9@.]/g, ''); // Удаляем все символы, кроме разрешенных
    });
});









