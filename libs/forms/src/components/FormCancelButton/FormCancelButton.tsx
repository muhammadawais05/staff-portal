import { Button } from '@toptal/picasso'
import { FormSpy } from '@toptal/picasso-forms'
import React from 'react'

export interface Props {
  onClick: () => void
  'data-testid'?: string
}

const FormCancelButton = ({
  onClick,
  'data-testid': dataTestId = 'FormCancelButton'
}: Props) => (
  <FormSpy subscription={{ submitting: true }}>
    {({ submitting }) => (
      <Button
        variant='secondary'
        disabled={submitting}
        onClick={onClick}
        data-testid={dataTestId}
      >
        Cancel
      </Button>
    )}
  </FormSpy>
)

export default FormCancelButton
