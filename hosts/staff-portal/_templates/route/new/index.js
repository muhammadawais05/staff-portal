const DEFAULT_NEWCOMPONENT_COMMAND = 'new'

module.exports = {
  prompt: ({ prompter, args }) => {
    const argvName = process.argv[process.argv.length - 2]
    const argvModuleName = process.argv[process.argv.length - 1]

    if (argvName && argvName !== DEFAULT_NEWCOMPONENT_COMMAND) {
      return Promise.resolve({ name: argvName, moduleName: argvModuleName })
    } else if (args.name && args.moduleName) {
      return Promise.resolve({ name: args.name, moduleName: args.moduleName })
    }

    return prompter.prompt([
      {
        type: 'input',
        name: 'name',
        message: "What's the page name?"
      },
      {
        type: 'input',
        name: 'moduleName',
        message: "What's the module name?"
      }
    ])
  }
}
