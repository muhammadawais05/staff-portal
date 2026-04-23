module.exports = {
  '*.{yml,json,js,jsx,ts,tsx}': ['yarn prettier --write'],
  '*.{js,jsx,ts,tsx}': ['davinci syntax lint code'],
  '**/translations/**/*.json': ['davinci syntax lint code'],
  '*.md': ['markdownlint --ignore-path .markdownlintignore --fix'],
  'styles.{js,jsx,ts,tsx}': ['davinci syntax lint styles'],
  'package.json': ['syncpack format']
}
