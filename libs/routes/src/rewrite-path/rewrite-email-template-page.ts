import { matchPath } from '@staff-portal/navigation'

import { RoutePath } from '../enums'
import { PathRewriteRule } from '../types'

const rewriteEmailTemplatePage: PathRewriteRule = ({ pathname }) => {
  const emailTemplatePage = matchPath<{ id: string }>(pathname, {
    path: RoutePath.EmailTemplate,
    exact: true,
    strict: false
  })

  if (!emailTemplatePage) {
    return
  }

  return `/email_templates#modal=/platform/staff/email_templates/${emailTemplatePage.params.id}`
}

export default rewriteEmailTemplatePage
