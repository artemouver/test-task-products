export default {
    build: {
        babel: {
            plugins: [
                '@babel/plugin-proposal-optional-chaining',
            ],
        },
    },

    head: {
        title: 'Goods',
        htmlAttrs: {
            lang: 'ru',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Test task',
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            },
        ],
    },

    css: [
        '@/assets/styles/index.styl',
    ],

    components: true,

    buildModules: [
        '@nuxtjs/eslint-module',
        '@nuxtjs/composition-api',
    ],
}
