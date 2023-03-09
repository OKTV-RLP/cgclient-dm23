module.exports = {
    content: [
        './src/frontend/**/*.svelte',
        './src/frontent/**/*.html',
        './public/index.html',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
};
