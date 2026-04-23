import { Literal, EmphasisType, TypographyColor } from '../../types'

type EmphasisTypeToColorMap = { [index in EmphasisType]: TypographyColor }

const emphasisTypeToColorMap: EmphasisTypeToColorMap = {
  good: 'green',
  bad: 'red',
  warning: 'yellow',
  neutral: 'dark-grey'
}

const emphazisedModifier = (
  value: string,
  emphasisType?: EmphasisType
): Literal => ({
  kind: 'typography',
  text: value,
  color: emphasisType && emphasisTypeToColorMap[emphasisType],
  weight: 'semibold'
})

export default emphazisedModifier
