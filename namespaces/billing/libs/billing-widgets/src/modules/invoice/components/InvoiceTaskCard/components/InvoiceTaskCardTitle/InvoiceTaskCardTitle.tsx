import { Link } from '@topkit/react-router'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { WebResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql.types'

type Invoice = { id: string; webResource: WebResourceFragment }

interface Props {
  consolidatedDocument?: Maybe<Invoice | { id: string }>
  taskCardSubtitle?: string
}

const InvoiceTaskCardTitle = ({
  consolidatedDocument,
  taskCardSubtitle
}: Props) => {
  const { t: translate } = useTranslation('invoice')

  if (!taskCardSubtitle && !consolidatedDocument) {
    return null
  }

  if (!(consolidatedDocument as Invoice)?.webResource) {
    return <>{taskCardSubtitle}</>
  }

  const {
    webResource: { text, url }
  } = consolidatedDocument as Invoice

  return (
    <>
      {taskCardSubtitle}
      {url && (
        <>
          <br />
          <Link data-testid='consolidated-link' href={url}>
            {translate('taskCard.title.subTitle', {
              consolidatedInvoiceText: text
            })}
          </Link>
        </>
      )}
    </>
  )
}

InvoiceTaskCardTitle.displayName = 'InvoiceTaskCardTitle'

export default InvoiceTaskCardTitle
