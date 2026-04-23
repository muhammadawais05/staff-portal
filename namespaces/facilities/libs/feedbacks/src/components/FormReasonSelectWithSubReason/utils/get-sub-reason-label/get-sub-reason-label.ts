const HIRING_REPLACEMENT = 'hiring_replacement'
const DISSATISFIED_WITH_MY_TALENT = 'dissatisfied_with_my_talent'

export const getSubReasonLabel = (identifier: string) => {
  switch (identifier) {
    case HIRING_REPLACEMENT:
      return 'How did you find a replacement?'
    case DISSATISFIED_WITH_MY_TALENT:
      return 'Why were you dissatisfied?'
    default:
      return ''
  }
}
