import { PathRewriteRule, PathRewriteRuleOptions } from '../../types'

const rewritePath = (
  pathRewriteRules: PathRewriteRule[],
  options: PathRewriteRuleOptions
) => {
  for (const pathRewriteRule of pathRewriteRules) {
    const newPath = pathRewriteRule(options)

    if (newPath !== undefined) {
      return newPath
    }
  }
}

export default rewritePath
