const { MISCELLANEOUS } = require('../../config');

const patterns = [
  {
    __name: 'root-libs',
    expression: /^libs\/([\w-]+)\//,
    getName: (libraryName) => `root/libs/${libraryName}`,
  },
  {
    __name: 'namespaces',
    expression: /^namespaces\/([\w-]+)\/(libs|apps)\/([\w-]+)\//,
    getName: (namespace, packageType, packageName) =>
      `${namespace}/${packageType}/${packageName}`,
  },
  {
    __name: 'cypress-tests',
    expression: /^hosts\/([\w-]+)\/cypress\//,
    getName: (hostName) => `hosts/${hostName}/cypress`,
  },
  {
    __name: 'hosts',
    expression: /^hosts\/([\w-]+)\//,
    getName: (hostName) => `hosts/${hostName}`,
  },
];

function fileNameToPackage(fileName) {
  for (const pattern of patterns) {
    const result = pattern.expression.exec(fileName);

    if (result) {
      return pattern.getName(...result.slice(1));
    }
  }

  return MISCELLANEOUS;
}

module.exports = fileNameToPackage;
