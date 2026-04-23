import { Container, Helpbox, ContainerProps } from '@toptal/picasso'
import { FormSpy } from '@toptal/picasso-forms'
import React, { FC, memo } from 'react'
import { Trans } from 'react-i18next'

const displayName = 'FormBaseErrorContainer'

type Props = Pick<ContainerProps, 'top' | 'bottom'> & {
  fieldErrorKeys?: string[]
}

const FormBaseErrorContainer: FC<Props> = memo(
  ({ fieldErrorKeys, ...containerProps }) => (
    <FormSpy subscription={{ submitError: true, submitErrors: true }}>
      {({ submitError, submitErrors }) => {
        let fieldErrors

        if (!submitError) {
          if (!submitErrors) {
            return null
          }

          fieldErrors = fieldErrorKeys
            ?.map(key => submitErrors[key])
            .filter(Boolean)
            .join('<br />')

          if (!fieldErrors) {
            return null
          }
        }

        return (
          <Container bottom={2} {...containerProps}>
            <Helpbox variant='red'>
              <Helpbox.Content data-testid={`${displayName}-error`}>
                <Trans>{submitError || fieldErrors}</Trans>
              </Helpbox.Content>
            </Helpbox>
          </Container>
        )
      }}
    </FormSpy>
  )
)

FormBaseErrorContainer.displayName = displayName

export default FormBaseErrorContainer
