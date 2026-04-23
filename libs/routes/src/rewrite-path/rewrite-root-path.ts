import { PathRewriteRule } from '../types'
import { RoutePath } from '../enums'

const rewriteRootPath: PathRewriteRule = ({ pathname }) =>
  pathname === RoutePath.Root ? RoutePath.Dashboard : undefined

export default rewriteRootPath
