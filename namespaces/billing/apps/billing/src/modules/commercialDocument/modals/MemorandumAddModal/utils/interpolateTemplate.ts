import i18n from '@staff-portal/billing/src/utils/i18n'

export const interpolateTemplate = (
  templateArg?: string | null,
  tokensToReplace = {}
) => {
  const template = templateArg || ''

  // a special syntax of t() function which allows for passing an arbitrary
  // template for interpolation
  const interpolatedTemplate = i18n.t('', {
    defaultValue: template,
    interpolation: {
      prefix: '{',
      suffix: '}'
    },
    // When a token is not found in `replace` object, i18next by default
    // removes it from template. To retain it and prevent infinite loop
    // during  interpolation, it is surrounded with something else than
    // interpolation prefix/suffix.
    missingInterpolationHandler: (text: string, value: string[]) =>
      `<<${value[1]}>>`,
    replace: tokensToReplace
  })

  // after interpolation original curly brackets are restored
  return interpolatedTemplate?.replace(/<</g, '{').replace(/>>/g, '}')
}
