import React, { FC, memo } from 'react'
import {
  Amount,
  Button,
  Container,
  Modal,
  Table,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { FinalField, FormRenderProps } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { camelCase } from 'lodash-es'
import { MemorandumBalance } from '@staff-portal/graphql/staff'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import FormInputCheckbox from '@staff-portal/billing/src/components/FormInputCheckbox'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import { UnallocatedMemorandumFragment } from '../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import { ApplyUnallocatedMemorandumsFormValues } from '../../modals/ApplyUnallocatedMemorandums/components/ApplyUnallocatedMemorandums/ApplyUnallocatedMemorandums'
import MemosListWithHeader from '../MemosListWithHeader'
import * as S from './styles'

const displayName = 'ApplyUnallocatedMemorandumsForm'

interface Props {
  isApplyMemosAndPayFlow?: boolean
  availablePrepaymentBalance?: string | null
  formProps: FormRenderProps<ApplyUnallocatedMemorandumsFormValues>
  nodeId: string
  onSkipToNextStep?: () => void
  unallocatedMemorandums?: UnallocatedMemorandumFragment[]
}

const TableHead = Table.Head
const TableBody = Table.Body
const TableRow = Table.Row
const TableCell = Table.Cell
const TableSectionHead = Table.SectionHead

const ApplyUnallocatedMemorandumsForm: FC<Props> = memo(
  ({
    formProps: {
      form: { getState },
      handleSubmit
    },
    isApplyMemosAndPayFlow = false,
    availablePrepaymentBalance,
    nodeId,
    onSkipToNextStep,
    unallocatedMemorandums = []
  }) => {
    const { t: translate } = useTranslation('commercialDocument')

    const { submitting, values } = getState()
    const { applyPrepayments, creditMemorandums, debitMemorandums } = values
    const { id, type } = decodeRawIdAndType(nodeId)

    const prepaymentAmount = Number(availablePrepaymentBalance)
    const unallocatedDebitMemorandums = unallocatedMemorandums.filter(
      debitMemo => debitMemo.balance === MemorandumBalance.DEBIT
    )
    const unallocatedCreditMemorandums = unallocatedMemorandums.filter(
      creditMemo => creditMemo.balance === MemorandumBalance.CREDIT
    )

    const hasSelectedItems =
      applyPrepayments || creditMemorandums.length || debitMemorandums.length

    const shouldSkipThisModal = isApplyMemosAndPayFlow && !hasSelectedItems
    const hasPrepayment = prepaymentAmount > 0
    const buttonType = shouldSkipThisModal ? 'button' : 'submit'
    const buttonAction = shouldSkipThisModal ? onSkipToNextStep : undefined
    let buttonText = translate(`modals.applyMemos.actions.submit`)

    if (isApplyMemosAndPayFlow) {
      buttonText = hasSelectedItems
        ? translate(`modals.applyMemos.actions.submitAndContinue`)
        : translate(`modals.applyMemos.actions.skipAndContinue`)
    }
    const typedType = camelCase(type) as 'invoice' | 'payment'

    return (
      <form onSubmit={handleSubmit}>
        <Modal.Title data-testid={`${displayName}-title`}>
          {translate(`modals.applyMemos.title.${typedType}` as const, { id })}
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer />

          <Container bottom={2}>
            <Typography size='medium' data-testid={`${displayName}-intro`}>
              {translate(`modals.applyMemos.intro.${typedType}` as const)}
            </Typography>
          </Container>
          {isApplyMemosAndPayFlow && (
            <Typography
              size='medium'
              data-testid={`${displayName}-secondary-intro`}
            >
              {translate('modals.applyMemos.secondaryIntro')}
            </Typography>
          )}

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

            {hasPrepayment && (
              <>
                <TableSectionHead data-testid={`${displayName}-header`}>
                  {translate('modals.applyMemos.table.prepayments')}
                </TableSectionHead>
                <TableBody>
                  <TableRow stripeEven>
                    <TableCell>
                      <FinalField
                        component={FormInputCheckbox}
                        name='applyPrepayments'
                        testId='applyPrepayments'
                        type='checkbox'
                      />
                    </TableCell>
                    <TableCell />
                    <TableCell
                      css={S.cellAmount}
                      data-testid={`${displayName}-amount`}
                    >
                      <Amount amount={prepaymentAmount} />
                    </TableCell>
                    <TableCell data-testid={`${displayName}-description`}>
                      <TypographyOverflow size='medium'>
                        {translate(
                          'modals.applyMemos.table.prepaymentsDescription'
                        )}
                      </TypographyOverflow>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </>
            )}

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
