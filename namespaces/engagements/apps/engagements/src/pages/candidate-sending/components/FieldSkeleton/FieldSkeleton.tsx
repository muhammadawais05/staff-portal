import React from 'react'
import { Form, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

type Props = {
  label?: string
}

const FieldSkeleton = ({ label }: Props) => (
  <>
    <Form.Label>
      {label ? label : <SkeletonLoader.Typography css={S.label} />}
    </Form.Label>
    <SkeletonLoader.Typography />
  </>
)

export default FieldSkeleton
