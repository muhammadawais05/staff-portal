import React, { SyntheticEvent } from 'react'
import { Container, Plus16, Button } from '@toptal/picasso'
import { useForm, useFieldArray } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { CreatePurchaseOrderInput } from '@staff-portal/graphql/staff'

import PurchaseOrderLineField from '../PurchaseOrderLineField'

const PurchaseOrderLinesFormContent = () => {
  const { t: translate } = useTranslation('purchaseOrder')
  const { mutators } = useForm<CreatePurchaseOrderInput>()
  const { fields } = useFieldArray('purchaseOrderLinesAttributes')
  const showDelete = Number(fields?.length) > 1

  const handleOnRemove = (e: SyntheticEvent<HTMLButtonElement>) =>
    fields.remove(Number(e.currentTarget.value))
  const handleOnPOLineAdd = () =>
    mutators.push('purchaseOrderLinesAttributes', { number: '' })

  return (
    <>
      {fields.map((name, index) => (
        <PurchaseOrderLineField
          name={name}
          key={name}
          handleOnRemove={handleOnRemove}
          showDelete={showDelete}
          index={index}
          disabled={fields.value[index]?.disabled}
        />
      ))}
      <Container direction='row' flex justifyContent='flex-start' top='medium'>
        <Button.Action
          data-testid='addPOLine'
          onClick={handleOnPOLineAdd}
          icon={<Plus16 />}
        >
          {translate('createModal.form.actions.addPOLine')}
        </Button.Action>
      </Container>
    </>
  )
}

export default PurchaseOrderLinesFormContent
