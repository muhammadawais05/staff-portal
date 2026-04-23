import { FieldArrayRenderProps, useForm } from '@toptal/picasso-forms'

const useSetPrimary = (formName: string) => {
  const { change, batch } = useForm()

  const setPrimary = ({
    itemIndex,
    fields
  }: { itemIndex: number, fields: FieldArrayRenderProps<{}, HTMLElement>['fields'] }) => {
    batch(() =>
      fields.value.forEach((_, index) => change(`${formName}.${index}.primary`, false))
    )
    fields.update(itemIndex, {
      ...fields.value[itemIndex],
      primary: true
    })
  }

  return {
    setPrimary
  }
}

export default useSetPrimary
