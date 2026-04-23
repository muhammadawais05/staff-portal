module.exports = {
  extends:
    './node_modules/@toptal/davinci-engine/src/configs/babel/babel-package-config.json',
  plugins: ['@babel/plugin-proposal-class-properties'],
  ignore: [
    '**/test.ts',
    '**/test.tsx',
    '**/__snapshots__',
    '**/__mocks__',
    '**/story',
    '**/*.pact.ts'
  ]
}
