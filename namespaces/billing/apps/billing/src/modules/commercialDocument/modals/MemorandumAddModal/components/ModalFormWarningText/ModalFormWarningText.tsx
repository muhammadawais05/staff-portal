import React, { FC, memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Container, Helpbox, ColorType } from '@toptal/picasso'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'

import {
  GetAddMemorandumInvoiceFragment as InvoiceFragment,
  GetAddMemorandumPaymentFragment as PaymentFragment
} from '../../data'
import { getWarningText } from '../../utils'

type CommercialDocument = InvoiceFragment | PaymentFragment

interface Props {
  document?: CommercialDocument
}

const displayName = 'ModalFormWarningText'

const ModalFormWarningText: FC<Props> = memo<Props>(
  ({ document = {} as CommercialDocument }) => {
    const { t: translate } = useTranslation('memorandum')

    const { documentNumber, webResource } = document
    const { invoiceKind } = document as Partial<InvoiceFragment>

    const isCompanyDeposit = invoiceKind === InvoiceKind.COMPANY_DEPOSIT
    const helpBoxVariant: ColorType = isCompanyDeposit ? 'grey' : 'red'

    const warningText = getWarningText(document)

    if (!warningText) {
      return null
    }

    return (
      <Container bottom={2} data-testid={displayName}>
        <Helpbox variant={helpBoxVariant}>
          {!isCompanyDeposit && (
            <Helpbox.Title data-testid='memo-warning-title'>
              {translate('addModal.warning.title')}
            </Helpbox.Title>
          )}
          <Helpbox.Content data-testid='memo-warning-text'>
            <Trans
              components={[
                <LinkWrapper
                  data-testid='memo-invoice-link'
                  href={webResource?.url}
                  key={documentNumber}
                />
              ]}
              i18nKey={`addModal.warning.${warningText}`}
              t={translate}
              values={{ documentNumber }}
            />
          </Helpbox.Content>
        </Helpbox>
      </Container>
    )
  }
)

ModalFormWarningText.displayName = displayName

export default ModalFormWarningText
