import { windowOpen } from '@staff-portal/navigation'
import { Maybe } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'

const openLinkInNewTab = (link: Maybe<string> | undefined) => {
  if (!isNotNullish(link)) {
    return
  }
  windowOpen(link, '_blank')
}

export default openLinkInNewTab
