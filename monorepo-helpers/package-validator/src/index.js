import { packageName } from './constants.js'
import { validateTest } from './validate-test.js'
import { validatePact } from './validate-pact.js'
import { validateLint } from './validate-lint.js'
import { validateStorybook } from './validate-storybook.js'
import { validateTypecheck } from './validate-typecheck.js'
import { validateTypesGeneration } from './validate-types-generation.js'

export const validatePackage = async () => {
  const packageValidators = [
    validateTest,
    validatePact,
    validateLint,
    validateStorybook,
    validateTypecheck,
    validateTypesGeneration
  ]

  const packageErrors = await Promise.all(
    packageValidators.map(validator => validator())
  )

  const errors = packageErrors.flat()

  if (errors.length) {
    // eslint-disable-next-line no-console
    console.error(
      `${packageName}: package is NOT OK, ${errors.length} validation ${
        errors.length === 1 ? 'error' : 'errors'
      } detected`
    )
    // eslint-disable-next-line no-console
    errors.forEach(err => console.log(err))

    process.exit(1)
  }

  // eslint-disable-next-line no-console
  console.log(`${packageName}: package is OK.`)
}
