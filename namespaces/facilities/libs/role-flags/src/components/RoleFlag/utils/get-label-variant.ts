import { FlagColor } from '@staff-portal/graphql/staff'

const getLabelVariant = (flagColor: FlagColor) => {
  switch (flagColor) {
    case FlagColor.RED:
      return 'red'
    case FlagColor.ORANGE:
      return 'yellow'
    case FlagColor.GREEN:
      return 'green'
    default:
      throw new Error(`Unsupported kind: ${JSON.stringify(flagColor)}`)
  }
}

export default getLabelVariant
