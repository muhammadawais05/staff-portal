import indefinite from 'indefinite'

const withIndefiniteArticleModifier = (value: string): string => {
  // TODO: remove once typedefinitions are published for 2.3.0 version
  // @ts-ignore
  return indefinite(value)
}

export default withIndefiniteArticleModifier
