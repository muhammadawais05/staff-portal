import { StatusMessageFragment } from '../../../../data/status-message-fragment'

export const compareStickyFirst = (
  statusMessageA: StatusMessageFragment,
  statusMessageB: StatusMessageFragment
) => {
  if (statusMessageA.sticky === statusMessageB.sticky) {
    return 0
  }
  if (statusMessageA.sticky) {
    return -1
  }

  return 1
}
