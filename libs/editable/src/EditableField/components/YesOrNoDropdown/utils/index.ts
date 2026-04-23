import { YesNoDropdownValue } from '../../../config'

export const getYesOrNoDisplay = (value: number | undefined) =>
  value ? YesNoDropdownValue.YES : YesNoDropdownValue.NO
