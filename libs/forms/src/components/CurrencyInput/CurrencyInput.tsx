import { Form } from '@toptal/picasso-forms'
import { Props as InputProps } from '@toptal/picasso-forms/Input/Input'
import React, { useMemo } from 'react'
import { MAX_INT_LENGTH } from '@staff-portal/config'
import { Container } from '@toptal/picasso'

import { currencyInputFormatter } from '../../utils'

export interface Props extends InputProps {
  allowDecimals: boolean
  precision?: number
}

const CurrencyInput = ({
  allowDecimals,
  precision,
  'data-testid': dataTestId,
  ...restProps
}: Props) => {
  const currencyFormatter = useMemo(
    () => currencyInputFormatter({ allowDecimals, precision }),
    [allowDecimals, precision]
  )

  return (
    <Form.Input
      data-testid={dataTestId || 'currency-input'}
      maxLength={MAX_INT_LENGTH}
      min={0}
      formatOnBlur
      format={currencyFormatter}
      step='1'
      startAdornment={<Container right={0.25}>$</Container>}
      {...restProps}
    />
  )
}

export default CurrencyInput
