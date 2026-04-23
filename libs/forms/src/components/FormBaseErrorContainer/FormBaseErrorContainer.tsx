import React, { FC, memo } from 'react'
import { Container, ContainerProps, Helpbox } from '@toptal/picasso'
import { FormSpy, useForm } from '@toptal/picasso-forms'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  SimpleHtmlFormatter,
  UnsafeAdvancedHtmlFormatter
} from '@staff-portal/string'

import getUnexpectedErrors from './utils/get-unexpected-errors'

interface Props extends Pick<ContainerProps, 'top' | 'bottom'> {
  fieldErrorKeys?: string[]
  parseAllHtml?: boolean
}

const FormBaseErrorContainer: FC<Props> = memo(
  ({ parseAllHtml, fieldErrorKeys, top, bottom = 2 }) => {
    const { getRegisteredFields } = useForm()

    return (
      <FormSpy subscription={{ submitError: true, submitErrors: true }}>
        {({ submitError, submitErrors }) => {
          const registeredFields = getRegisteredFields()

          const errorText = getUnexpectedErrors({
            submitError,
            registeredFields,
            submitErrors,
            fieldErrorKeys
          })

          if (!errorText) {
            return null
          }

          return (
            <Container top={top} bottom={bottom}>
              <Helpbox variant='red'>
                <Helpbox.Content data-testid='FormBaseErrorContainer-error'>
                  {parseAllHtml ? (
                    <UnsafeAdvancedHtmlFormatter html={errorText} />
                  ) : (
                    <SimpleHtmlFormatter text={errorText} />
                  )}
                </Helpbox.Content>
              </Helpbox>
            </Container>
          )
        }}
      </FormSpy>
    )
  }
)

export default FormBaseErrorContainer
