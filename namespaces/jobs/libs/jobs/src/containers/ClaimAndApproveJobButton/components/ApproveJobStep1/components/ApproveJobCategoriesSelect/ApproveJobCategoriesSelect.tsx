import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { TypographyOverflow } from '@toptal/picasso'

type Props = {
  availableCategories?: { id: string; name?: string | null }[]
}

const ApproveJobCategoriesSelect = ({ availableCategories }: Props) => {
  if (!availableCategories?.length) {
    return null
  }

  return (
    <Form.CheckboxGroup
      name='categoryIds'
      label='Category'
      titleCase={false}
      horizontal
      small={6}
      required
    >
      {availableCategories.map(item => (
        <Form.Checkbox
          key={item.id}
          value={item.id}
          label={<TypographyOverflow>{item.name}</TypographyOverflow>}
        />
      ))}
    </Form.CheckboxGroup>
  )
}

export default ApproveJobCategoriesSelect
