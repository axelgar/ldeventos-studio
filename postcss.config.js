module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
