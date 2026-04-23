import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'

import { useGetTalentMatchers } from './data'
import { matcherTeamName } from './utils'

export type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required' | 'titleCase'
> & {}

const FormClaimerSelect = ({ ...props }: Props) => {
  const { data, loading } = useGetTalentMatchers()

  const options = useMemo(
    () =>
      data?.roles.nodes?.map(({ id, fullName, teams }) => ({
        text: fullName + matcherTeamName(teams?.nodes ?? []),
        value: id
      })) || [],
    [data]
  )

  return <Form.Select {...props} loading={loading} options={options} />
}

export default FormClaimerSelect
