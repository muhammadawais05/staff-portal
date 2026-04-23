import React from 'react'
import { Button, Container, Tag } from '@toptal/picasso'
import { FinalField } from '@toptal/picasso-forms'

import * as S from './styles'

type Props = {
  itemIndex: number
  setPrimary: () => void
  formName: string
  disabled: boolean
}

const MarkAsPrimaryButton = ({
  itemIndex,
  setPrimary,
  formName,
  disabled
}: Props) => (
  <FinalField name={`${formName}.${itemIndex}.primary`}>
    {({ input: { value } }) => (
      <Container left='xsmall' flex alignItems='flex-start' css={S.container}>
        {value ? (
          <Container
            right='xlarge'
            data-testid={`MarkAsPrimaryButton-${itemIndex}-label`}
          >
            <Tag.Rectangular variant='light-grey'>Primary</Tag.Rectangular>
          </Container>
        ) : (
          <Button.Action
            onClick={setPrimary}
            disabled={disabled}
            data-testid={`MarkAsPrimaryButton-${itemIndex}-button`}
          >
            Mark as primary
          </Button.Action>
        )}
      </Container>
    )}
  </FinalField>
)

export default MarkAsPrimaryButton
