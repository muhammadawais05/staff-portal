import React, { useMemo } from 'react'
import { Form as PicassoForm } from '@toptal/picasso-forms'
import { titleize } from '@staff-portal/string'

import { DraftJobFormFields } from '../../../../enums/DraftJobFormFields'
import { DraftJobFragment } from '../../../DraftJobSection/data/draft-job-fragment'
import Field from '../Field'

type Props = {
  verticals: DraftJobFragment['verticals']
}

const DraftJobFormVerticalField = ({ verticals }: Props) => {
  const verticalOptions = useMemo(
    () =>
      verticals.edges.map(({ node: { id, talentType } }) => ({
        text: titleize(talentType),
        value: id
      })),
    [verticals]
  )

  return (
    <Field label='Type of Talent'>
      <PicassoForm.Select
        name={DraftJobFormFields.VerticalId}
        placeholder='Type of Talent'
        width='full'
        options={verticalOptions}
      />
    </Field>
  )
}

export default DraftJobFormVerticalField
