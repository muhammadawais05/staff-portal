import { Button, Container, Modal, Table, Typography } from '@toptal/picasso'
import { FormRenderProps } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { MemorandumBalance } from '@staff-portal/graphql/staff'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import { UnallocatedMemorandumFragment } from '../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import * as S from './styles'
import { ApplyUnallocatedMemorandumsFormValues } from '../../modals/Pay/components/PaymentGroupApplyUnallocatedMemos/PaymentGroupApplyUnallocatedMemos'
import MemosListWithHeader from '../../../commercialDocument/components/MemosListWithHeader'

const displayName = 'ApplyUnallocatedMemorandumsForm'

interface Props {
  formProps: FormRenderProps<ApplyUnallocatedMemorandumsFormValues>
  nodeId: string
  onSkipToNextStep?: () => void
  unallocatedMemorandums?: UnallocatedMemorandumFragment[]
}

const TableHead = Table.Head
const TableRow = Table.Row
const TableCell = Table.Cell

const ApplyUnallocatedMemorandumsForm: FC<Props> = memo(
  ({
    formProps: {
      form: { getState },
      handleSubmit
    },
    nodeId,
    onSkipToNextStep,
    unallocatedMemorandums = []
  }) => {
    const { t: translate } = useTranslation('paymentGroup')

    const { submitting, values } = getState()
    const { creditMemorandums, debitMemorandums } = values
    const { id } = decodeRawIdAndType(nodeId)

    const unallocatedDebitMemorandums = unallocatedMemorandums.filter(
      debitMemo => debitMemo.balance === MemorandumBalance.DEBIT
    )
    const unallocatedCreditMemorandums = unallocatedMemorandums.filter(
      creditMemo => creditMemo.balance === MemorandumBalance.CREDIT
    )

    const hasSelectedItems = creditMemorandums.length || debitMemorandums.length

    const shouldSkipThisModal = !hasSelectedItems
    const buttonType = shouldSkipThisModal ? 'button' : 'submit'
    const buttonAction = shouldSkipThisModal ? onSkipToNextStep : undefined
    const buttonText = hasSelectedItems
      ? translate(`modals.applyMemos.actions.submitAndContinue`)
      : translate(`modals.applyMemos.actions.skipAndContinue`)

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate(`modals.applyMemos.title`, { id })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />

          <Container bottom={2}>
            <Typography size='medium' data-testid={`${displayName}-intro`}>
              {translate(`modals.applyMemos.intro`)}
            </Typography>
          </Container>
          <Typography
            size='medium'
            data-testid={`${displayName}-secondaryIntro`}
          >
            {translate('modals.applyMemos.secondaryIntro')}
          </Typography>

          <Table css={S.table}>
            <TableHead>
              <TableRow>
                <TableCell css={S.cellHeaderCheckbox} />
                <TableCell css={S.cellHeaderId}>ID</TableCell>
                <TableCell css={S.cellHeaderAmount}>
                  {translate('modals.applyMemos.table.amount')}
                </TableCell>
                <TableCell css={S.cellHeaderDescription}>
                  {translate('modals.applyMemos.table.description')}
                </TableCell>
              </TableRow>
            </TableHead>

            <MemosListWithHeader
              fieldArrayName='debitMemorandums'
              header={translate('modals.applyMemos.table.debit')}
              memorandums={unallocatedDebitMemorandums}
            />

            <MemosListWithHeader
              fieldArrayName='creditMemorandums'
              header={translate('modals.applyMemos.table.credit')}
              memorandums={unallocatedCreditMemorandums}
            />
          </Table>
        </Modal.Content>
        <ModalFooter>
          <Button
            data-testid='submit'
            disabled={submitting}
            loading={submitting}
            onClick={buttonAction}
            type={buttonType}
            variant='positive'
          >
            {buttonText}
          </Button>
        </ModalFooter>
      </form>
    )
  }
)

ApplyUnallocatedMemorandumsForm.displayName = displayName

export default ApplyUnallocatedMemorandumsForm
