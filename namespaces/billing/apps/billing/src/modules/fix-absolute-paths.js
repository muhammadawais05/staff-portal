/* eslint-disable */

import path from 'path'

const getRelativePath = ({ pathToTransform, currentFilePath }) => {
  const relativePath = path.relative(
    path.resolve(currentFilePath, '..'),
    pathToTransform.replace('src/', path.join(__dirname, 'src', '/'))
  )

  return relativePath.startsWith('..') ? relativePath : `./${relativePath}`
}

const getIsAbsolutePath = path =>
  path?.startsWith?.('src/') && !path?.startsWith?.('~/billing-graphql')

module.exports = (fileInfo, api) => {
  const jsc = api.jscodeshift
  const { path: currentFilePath } = fileInfo
  const root = jsc(fileInfo.source)

  // imports
  root
    .find(jsc.ImportDeclaration)
    .filter(node => {
      const pathToTransform = node.value.source.value?.toString() || ''

      return getIsAbsolutePath(pathToTransform)
    })
    .replaceWith(node => {
      const pathToTransform = node.value.source.value?.toString() || ''

      return jsc.importDeclaration(
        node.value.specifiers,
        jsc.literal(getRelativePath({ pathToTransform, currentFilePath }))
      )
    })

  // calls
  root
    .find(jsc.CallExpression)
    .filter(node => {
      const fnArguments = node.value.arguments

      return (
        ((node.value.callee?.object?.name === 'jest' &&
          ['mock', 'requireActual', 'requireMock'].includes(
            node.value.callee?.property?.name
          )) ||
          node.value.callee.type === 'Import') &&
        fnArguments.length &&
        getIsAbsolutePath(fnArguments?.[0].value)
      )
    })
    .replaceWith(node => {
      const [pathToTransform, ...restArguments] = node.value.arguments

      return jsc.callExpression(node.value.callee, [
        jsc.literal(
          getRelativePath({
            pathToTransform: pathToTransform.value,
            currentFilePath
          })
        ),
        ...restArguments
      ])
    })

  // export
  root
    .find(jsc.ExportNamedDeclaration)
    .filter(node => {
      const pathToTransform = node?.value.source?.value?.toString() || ''

      return pathToTransform && getIsAbsolutePath(pathToTransform)
    })
    .replaceWith(node => {
      const pathToTransform = node.value.source.value?.toString() || ''

      return jsc.exportNamedDeclaration(
        node.value.declaration,
        node.value.specifiers,
        jsc.literal(getRelativePath({ pathToTransform, currentFilePath }))
      )
    })

  return root.toSource({
    quote: 'single'
  })
}
