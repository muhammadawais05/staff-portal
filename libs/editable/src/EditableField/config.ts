import { Option } from '@toptal/picasso/Select'

export enum YesNoDropdownValue {
  YES = 'Yes',
  NO = 'No'
}

export const YES_OR_NO_OPTIONS: Option[] = [
  { text: YesNoDropdownValue.YES, value: 1 },
  { text: YesNoDropdownValue.NO, value: 0 }
]
