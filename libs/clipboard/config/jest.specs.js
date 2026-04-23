const globalConfig = require('../../../config/jest.specs.js')

module.exports = {
  ...globalConfig,
  // In davinci we have `setupFiles: [getAbsolutePath('./jest/dom-setup.js')]`.
  // It overrides `document` and we can't `spyOn` on `execCommand` in
  // `services/use-copy-rich-text-to-clipboard/use-copy-rich-text-to-clip-board.test.tsx`.
  // Here we overrides `setupFiles` with `[]` to discard this behavior
  setupFiles: []
}
