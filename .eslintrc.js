module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: true
  },
  extends: [
    '@nuxtjs/eslint-config',
    '@nuxtjs/eslint-config-typescript',
    'plugin:tailwindcss/recommended'
  ],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/multi-word-component-names': ['error', {
      ignores: ['Header', 'Loader', 'Hero', 'default', 'error', 'index', '[slug]', '[[slug]]']
    }],
    'vue/no-v-html': 'off',
    'tailwindcss/no-custom-classname': 'off'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    tailwindcss: {
      config: './nuxt/tailwind.config.js',
      whitelist: []
    }
  }
}
