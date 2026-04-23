import React, { FC, memo } from 'react'
import { Modal } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select/types'
import { useTranslation } from 'react-i18next'
import { UpdateClientBillingAddressInput } from '@staff-portal/graphql/staff'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

const displayName = 'BillingAddressEditModalForm'

interface Props {
  handleOnSubmit: (values: UpdateClientBillingAddressInput) => void
  companyName: string
  countries: Option<string>[]
  usaStates: Option<string>[]
  usaCountryId: string
  initialValues: Omit<UpdateClientBillingAddressInput, 'clientId'>
}

const BillingAddressEditModalForm: FC<Props> = memo(
  ({
    handleOnSubmit,
    companyName,
    countries = [],
    usaStates = [],
    usaCountryId,
    initialValues
  }) => {
    const { t: translate } = useTranslation('billingDetails')
    const { modalContainer } = useExternalIntegratorContext()

    return (
      <Form<UpdateClientBillingAddressInput>
        data-testid={displayName}
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
      >
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate('modals.billingAddressEdit.title', { companyName })}
        </Modal.Title>

        <Modal.Content>
          <FormBaseErrorContainer />
          <Form.Input
            autoFocus
            label={translate('modals.billingAddressEdit.fields.name.label')}
            name='billingName'
            required
            width='full'
          />
          <Form.Input
            label={translate('modals.billingAddressEdit.fields.address.label')}
            name='billingAddress'
            required
            width='full'
          />
          <Form.Select
            data-testid={`${displayName}-country`}
            label={translate('modals.billingAddressEdit.fields.country.label')}
            enableReset
            name='billingCountryId'
            options={countries}
            popperContainer={modalContainer}
            width='full'
            required
          />
          <FormSpy subscription={{ values: true }}>
            {({ values }) =>
              values.billingCountryId === usaCountryId ? (
                <Form.Select
                  data-testid={`${displayName}-state-select`}
                  label={translate(
                    'modals.billingAddressEdit.fields.state.label'
                  )}
                  enableReset
                  name='billingStateSelect'
                  options={usaStates}
                  placeholder={translate(
                    'modals.billingAddressEdit.fields.state.placeholder'
                  )}
                  popperContainer={modalContainer}
                  width='full'
                  required
                />
              ) : (
                <Form.Input
                  data-testid={`${displayName}-state-input`}
                  label={translate(
                    'modals.billingAddressEdit.fields.state.label'
                  )}
                  name='billingStateInput'
                  width='full'
                />
              )
            }
          </FormSpy>
          <Form.Input
            label={translate('modals.billingAddressEdit.fields.city.label')}
            name='billingCity'
            required
            width='full'
          />
          <Form.Input
            label={translate('modals.billingAddressEdit.fields.zip.label')}
            name='billingZip'
            required
            width='full'
          />
          <Form.Input
            label={translate('modals.billingAddressEdit.fields.phone.label')}
            name='billingPhone'
            required
            width='full'
          />
          <Form.Input
            label={translate(
              'modals.billingAddressEdit.fields.additionalInfo.label'
            )}
            name='billingAdditionalInfo'
            width='full'
          />
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('modals.billingAddressEdit.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

BillingAddressEditModalForm.displayName = displayName

export default BillingAddressEditModalForm
