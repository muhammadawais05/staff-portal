import React from 'react'
import { Form, ContainerProps, Container } from '@toptal/picasso'

import * as S from './styles'

// TODO: remove this workaround when https://toptal-core.atlassian.net/browse/FX-1400 is completed
const FormLabel = Form.Label

type Props = {
  label: string
  labelWidth?: number
  htmlFor?: string
  paddingLeftLabel?: number
} & Pick<ContainerProps, 'children' | 'alignItems'>

const FiltersField = ({
  label,
  labelWidth,
  htmlFor,
  children,
  alignItems = 'center',
  paddingLeftLabel = 0
}: Props) => {
  return (
    <Container
      flex
      alignItems={alignItems}
      data-testid={`FiltersField:${label}`}
    >
      <FormLabel
        htmlFor={htmlFor}
        css={S.filtersFieldLabel({
          labelWidthRem: labelWidth,
          paddingLeftRem: paddingLeftLabel
        })}
      >
        {label}
      </FormLabel>
      <Container css={S.filtersFieldContent}>{children}</Container>
    </Container>
  )
}

export default FiltersField
