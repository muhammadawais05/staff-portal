import React from 'react'
import { Container, Loader, Switch } from '@toptal/picasso'

import * as S from './styles'

export interface InlineSwitchProps {
  value: boolean
  onChange: (value: boolean) => void
  loading?: boolean
  disabled?: boolean
}

const InlineSwitch = ({
  value,
  loading,
  disabled,
  onChange
}: InlineSwitchProps) => {
  return <Container flex justifyContent='flex-start' css={S.container}>
    <Switch
      checked={value}
      disabled={disabled}
      onChange={(_, checked) => onChange(checked)}
      data-testid='inline-switch-editor-checkbox'
    />
    {loading && (
      <Container left='small' flex>
        <Loader size='small' inline data-testid='inline-switch-editor-loader' />
      </Container>
    )}
  </Container>
}

export default InlineSwitch
