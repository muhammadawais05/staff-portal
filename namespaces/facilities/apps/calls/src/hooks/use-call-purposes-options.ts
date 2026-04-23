import { useMemo } from 'react'
import { SelectOption } from '@toptal/picasso'
import { Option } from '@toptal/picasso/Select'
import { useFormState } from '@toptal/picasso-forms'

import { PurposesListItemFragment } from '../components/EditableCallPurposeCell/data/get-purposes-options/purposes-list-item-fragment.staff.gql.types'

const useCallPurposesOptions = (
  options: PurposesListItemFragment[]
): [string | number | undefined, SelectOption[]] => {
  const { values } = useFormState()
  const optionsArr: Option[] = useMemo(() => {
    const currentOp = options.map(node => ({
      text: node.name as string,
      value: node.id as string
    }))

    currentOp.push({
      text: 'Other',
      value: 'other'
    })

    return currentOp
  }, [options])

  const currentValue = optionsArr.find(
    option => option.text === values.purpose || option.value === values.purpose
  )?.value

  return [currentValue, optionsArr]
}

export default useCallPurposesOptions
