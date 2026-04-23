import React, { useEffect } from 'react'
import {
  Button,
  Container,
  Modal,
  Notification,
  Typography
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { Form, FormSpy, useFormState, useForm } from '@toptal/picasso-forms'
import {
  Maybe,
  ClientParentUpdateCascadingOptions
} from '@staff-portal/graphql/staff'
import { usePrevious } from '@staff-portal/utils'

import UpdateCascadeParentRadioField from '../UpdateCascadeParentRadioField'
import { options, TITLE } from '../../constants'
import { Contract, ParentAttributeOption } from '../../types'

interface Props {
  webResource?: { text: string; url?: Maybe<string> }
  hasAnySTAContracts: boolean
  staContracts?: Contract[]
  hasClickableContracts?: boolean
  hasDeprecatedContracts?: boolean
  hideModal: () => void
  submitting: boolean
  getCascadeParentAttributeOption: (
    attribute: string
  ) => ParentAttributeOption | undefined
  initialParentStaIds: string[]
}

const UpdateCascadeParentFormContent = ({
  webResource,
  hasAnySTAContracts,
  staContracts,
  hasClickableContracts,
  hasDeprecatedContracts,
  hideModal,
  submitting,
  getCascadeParentAttributeOption,
  initialParentStaIds
}: Props) => {
  const {
    values: { cascadeParentSta }
  } = useFormState()
  const { change } = useForm()
  const previousCascadeParentSta = usePrevious(cascadeParentSta)

  useEffect(() => {
    if (cascadeParentSta === ClientParentUpdateCascadingOptions.NONE) {
      change('parentStaIds', [])

      return
    }

    if (
      previousCascadeParentSta === ClientParentUpdateCascadingOptions.NONE &&
      [
        ClientParentUpdateCascadingOptions.ALL,
        ClientParentUpdateCascadingOptions.ONLY_THIS_COMPANY
      ].includes(cascadeParentSta)
    ) {
      change('parentStaIds', initialParentStaIds)
    }
  }, [change, cascadeParentSta, previousCascadeParentSta, initialParentStaIds])

  return (
    <>
      <Modal.Title>{TITLE}</Modal.Title>
      <Modal.Content>
        <Typography size='medium'>
          Select which of the following fields to inherit from the company{' '}
          <Link href={webResource?.url as string}>{webResource?.text}</Link>
        </Typography>
        {options.map(({ attribute, name, label }) => {
          const { disabled, hintOrError } =
            getCascadeParentAttributeOption(attribute) || {}

          return (
            <Container top='medium' key={name}>
              <UpdateCascadeParentRadioField
                name={name}
                label={label}
                disabled={disabled}
                hintOrError={hintOrError || ''}
              />
            </Container>
          )
        })}
        {hasAnySTAContracts && (
          <>
            <FormSpy subscription={{ values: true }}>
              {({ values }) => {
                const isImportContractsDisabled =
                  values.cascadeParentSta ===
                  ClientParentUpdateCascadingOptions.NONE

                return (
                  <Container top='medium'>
                    <Form.CheckboxGroup
                      name='parentStaIds'
                      label='STA Contracts'
                      required={!isImportContractsDisabled}
                    >
                      {staContracts?.map(
                        ({ node: { id, title }, disabled }: Contract) => (
                          <Form.Checkbox
                            key={id}
                            value={id}
                            label={title}
                            disabled={disabled || isImportContractsDisabled}
                          />
                        )
                      )}
                    </Form.CheckboxGroup>
                  </Container>
                )
              }}
            </FormSpy>
            {hasClickableContracts && (
              <Container top='small'>
                <Notification>
                  This company has a clickable contract. Clickable contracts
                  cannot be imported.
                </Notification>
              </Container>
            )}
            {hasDeprecatedContracts && (
              <Container top='small'>
                <Notification>
                  This company has a deprecated contract. Deprecated contracts
                  cannot be imported.
                </Notification>
              </Container>
            )}
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={submitting} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive' loading={submitting}>
          Update
        </Form.SubmitButton>
      </Modal.Actions>
    </>
  )
}

export default UpdateCascadeParentFormContent
