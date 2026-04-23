import { Literal } from '../../types'

const switchModifier = (value: boolean): Literal[] =>
  value ? ['enabled'] : ['disabled']

export default switchModifier
