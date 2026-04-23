import React, { memo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Container } from '@toptal/picasso'

import { LineChartLevel } from '../../types'
import * as S from './styles'

const LEVEL_OPTIONS = [
  { value: LineChartLevel.ROLE, text: 'You' },
  { value: LineChartLevel.GLOBAL, text: 'Team' }
]

const LevelSelect = memo(() => (
  <Container left='small' css={S.levelFilterContainer}>
    <Form.Select
      size='small'
      width='full'
      options={LEVEL_OPTIONS}
      name='level'
    />
  </Container>
))

export default LevelSelect
