import { EmailTemplateTargetRoleFragment } from '../../../../../data'

export const sortByTargetRoleTitle = (
  itemA: EmailTemplateTargetRoleFragment,
  itemB: EmailTemplateTargetRoleFragment
) => itemA.title.localeCompare(itemB.title)
