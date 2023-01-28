import { createI18n } from 'vue-i18n'

const messages = {
    ru: {
        register: 'Регистрация',
        inputphone: 'Вводите номер телефона',
        phone: 'Телефон',
        next: "Next",
        enter: "enter",
        passwordforget: "passwordforget",
        singup: "singup",
        loginDesc: "loginDesc",
        password: "password",
        registered: "registered",
    },
    uz: {
        register: "Ro'yhatdan o'tish",
        inputphone: 'Telefon raqamizni kiriting',
        phone: 'Telefon',
        next: "Next",
        enter: "enter",
        passwordforget: "passwordforget",
        singup: "singup",
        loginDesc: "loginDesc",
        password: "password",
        registered: "registered",
    },
    uzb: {
        register: "Руйхатдан утиш",
        inputphone: 'Телефон ракамингизни киритинг',
        phone: 'Телефон',
        next: "Next",
        enter: "enter",
        passwordforget: "passwordforget",
        singup: "singup",
        loginDesc: "loginDesc",
        password: "password",
        registered: "registered",
    }
}

// Create VueI18n instance with options
export default createI18n({
    globalInjection: true,
    legacy: false,
    locale: 'uz', // set locale
    fallbackLocale: 'uz', // set fallback locale
    messages: messages, // set locale messages
})


