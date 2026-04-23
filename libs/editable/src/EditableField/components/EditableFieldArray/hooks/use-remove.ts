import { FieldArrayRenderProps, useForm } from '@toptal/picasso-forms'

const useRemove = (formName: string) => {
  const { change } = useForm()

  const remove = ({
    itemIndex,
    fields
  }: {
    itemIndex: number
    fields: FieldArrayRenderProps<
      {
        destroy: boolean
        primary: boolean
        id: string
      },
      HTMLElement
    >['fields']
  }) => {
    const item = fields.value[itemIndex]

    if (item.primary) {
      const primaryItemIndex = fields.value.findIndex(
        ({ destroy, primary }) => !destroy && !primary
      )

      if (primaryItemIndex > -1) {
        change(`${formName}.${primaryItemIndex}.primary`, true)
      }
    }

    if (!item.id) {
      fields.remove(itemIndex)

      return
    }

    fields.update(itemIndex, {
      ...item,
      primary: false,
      destroy: true
    })
  }

  return {
    remove
  }
}

export default useRemove
