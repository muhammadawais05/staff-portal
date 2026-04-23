import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Form as PicassoForm } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { CreateConsolidationDefaultInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import ClientMultiSelector from '../ClientMultiSelector'
import { ClientOption } from '../ClientMultiSelector/ClientMultiSelector'
import FormEngagementList from '../FormEngagementList'
import { getSortedUniqueClientsWithId } from '../../utils'
import { ConsolidationDefaultEngagementFragment } from '../../data/getDataForConsolidationDefaultModal.graphql.types'

interface Props {
  handleOnSubmit: (values: CreateConsolidationDefaultInput) => void
  initialValues?: Pick<
    CreateConsolidationDefaultInput,
    'clientId' | 'engagementIds' | 'name'
  > & { consolidationDefaultId?: string }
  initialCompanies?: string[]
  title: string
  submitButtonText: string
  engagements: ConsolidationDefaultEngagementFragment[]
}

const displayName = 'ConsolidationDefaultModalForm'

const ConsolidationDefaultModalForm = ({
  initialValues,
  title,
  handleOnSubmit,
  submitButtonText,
  engagements,
  initialCompanies
}: Props) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])

  const { modalContainer } = useExternalIntegratorContext()

  const isUpdateForm = !!initialValues?.consolidationDefaultId

  const [selectedClientIds, setSelectedClientIds] = useState(
    isUpdateForm && initialCompanies
      ? initialCompanies
      : [initialValues?.clientId || '']
  )

  const uniqueClients = useMemo(() => {
    return getSortedUniqueClientsWithId(
      engagements,
      initialValues?.consolidationDefaultId
    )
  }, [engagements, initialValues?.consolidationDefaultId]) as ClientOption[]

  const handleClientSelectionChange = (values: string[]) => {
    setSelectedClientIds(values)
  }

  const initialFormValues = isUpdateForm
    ? { ...initialValues, clientId: undefined }
    : initialValues

  return (
    <Form<CreateConsolidationDefaultInput>
      data-testid={`${displayName}-form`}
      onSubmit={handleOnSubmit}
      initialValues={initialFormValues}
      keepDirtyOnReinitialize
    >
      <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        <Form.Input
          width='full'
          name='name'
          data-testid={`${displayName}-name`}
          label={translate(
            'billingDetails:modals.consolidationDefault.fields.name.label'
          )}
          required
        />
        <PicassoForm.Field>
          <PicassoForm.Label>
            {translate(
              'billingDetails:modals.consolidationDefault.fields.relatedCompanies.label'
            )}
          </PicassoForm.Label>
          <ClientMultiSelector
            clients={uniqueClients}
            placeholder={translate(
              'billingDetails:modals.consolidationDefault.clientSelector.placeholder'
            )}
            selectAllLabel={translate(
              'billingDetails:modals.consolidationDefault.clientSelector.selectAll'
            )}
            initialValues={selectedClientIds}
            popperContainer={modalContainer}
            onValuesChange={handleClientSelectionChange}
          />
        </PicassoForm.Field>
        <FormEngagementList
          engagements={engagements}
          selectedClientIds={selectedClientIds}
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton
          data-testid={`${displayName}-submit`}
          variant='positive'
        >
          {submitButtonText}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

ConsolidationDefaultModalForm.displayName = displayName

export default ConsolidationDefaultModalForm
