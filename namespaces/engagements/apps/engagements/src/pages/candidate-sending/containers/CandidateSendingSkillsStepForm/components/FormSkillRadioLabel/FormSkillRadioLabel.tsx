import React from 'react'
import { Typography } from '@toptal/picasso'

type Props = {
  title: string
  description: string
}

const FormSkillRadioLabel = ({ title, description }: Props) => (
  <>
    <Typography variant='heading'>{title}</Typography>
    <Typography size='xsmall'>{description}</Typography>
  </>
)

export default FormSkillRadioLabel
