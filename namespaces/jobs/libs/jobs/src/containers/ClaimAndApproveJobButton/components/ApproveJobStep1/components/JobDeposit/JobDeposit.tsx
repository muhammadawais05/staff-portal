import React, { Fragment } from 'react'
import { Form as PicassoForm, Input, Typography } from '@toptal/picasso'
import { Form, useField } from '@toptal/picasso-forms'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { LinkWrapper } from '@staff-portal/ui'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { ApproveJobForm } from '../../../../types'

export interface Props {
  jobDepositCanBeIssued?: boolean | null
  depositInvoices?:
    | { id: string; webResource: { url?: string | null } }[]
    | null
}

const CreateDepositHint = ({
  depositInvoices
}: Pick<Props, 'depositInvoices'>) => {
  if (!depositInvoices?.length) {
    return (
      <>There are no deposit invoices in the system for this company yet.</>
    )
  }

  return (
    <Typography size='inherit' color='red'>
      Please note that the following deposit invoices have already been created:{' '}
      {depositInvoices.map(({ id, webResource: { url } }, index) => (
        <Fragment key={id}>
          {index > 0 && ', '}
          <LinkWrapper
            wrapWhen={Boolean(url)}
            href={url as string}
            target='_blank'
          >
            #{decodeEntityId(id).id}
          </LinkWrapper>
        </Fragment>
      ))}
    </Typography>
  )
}

const JobDeposit = ({ jobDepositCanBeIssued, depositInvoices }: Props) => {
  const {
    input: { value: createDeposit }
  } = useField<ApproveJobForm['createDeposit']>('createDeposit')

  if (!jobDepositCanBeIssued) {
    return null
  }

  return (
    <>
      {createDeposit && (
        <Form.NumberInput
          name='deposit'
          label='Deposit'
          titleCase={false}
          width='full'
          hideControls
          icon={<ReferralBonus16 />}
        />
      )}

      {!createDeposit && (
        <PicassoForm.Field>
          <PicassoForm.Label titleCase={false}>Deposit</PicassoForm.Label>
          <Input width='full' disabled value='No invoice will be generated' />
        </PicassoForm.Field>
      )}

      <Form.Checkbox
        name='createDeposit'
        label='Generate deposit invoice'
        titleCase={false}
        hint={<CreateDepositHint depositInvoices={depositInvoices} />}
      />
    </>
  )
}

export default JobDeposit
