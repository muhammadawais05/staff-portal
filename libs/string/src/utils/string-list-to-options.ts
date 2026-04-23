import { Option } from '@toptal/picasso/Select'

export const stringListToOptions = (
  list?: (string | number)[] | null
): Option[] => list?.map(item => ({ text: String(item), value: item })) || []
