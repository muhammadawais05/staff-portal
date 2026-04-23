export const orderArguments = () => ({
  fullCommand: process.argv.slice(2),
  scriptName: process.argv[2],
  options: process.argv.slice(3)
})
