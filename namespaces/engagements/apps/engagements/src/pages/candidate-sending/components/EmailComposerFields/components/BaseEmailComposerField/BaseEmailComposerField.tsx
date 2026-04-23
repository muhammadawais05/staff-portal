import React, { ReactNode } from 'react'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { Container, Typography } from '@toptal/picasso'

type Props = {
  children: ReactNode | ((data: { disabled: boolean }) => ReactNode)
  label: string
  visibilityControlFieldName?: string
}

const BaseEmailComposerField = ({
  children,
  label,
  visibilityControlFieldName
}: Props) => {
  const shouldPassDisabledStateToChildren =
    typeof children === 'function' && visibilityControlFieldName

  return (
    <Container bottom='medium'>
      <Container flex justifyContent='space-between' bottom='xsmall'>
        <Typography variant='heading' size='small'>
          {label}
        </Typography>

        {!!visibilityControlFieldName && (
          <Form.Checkbox name={visibilityControlFieldName} label='Show' />
        )}
      </Container>

      {shouldPassDisabledStateToChildren ? (
        <FormSpy subscription={{ values: true }}>
          {({ values }) =>
            children({ disabled: !values[visibilityControlFieldName] })
          }
        </FormSpy>
      ) : (
        children
      )}
    </Container>
  )
}

export default BaseEmailComposerField
