import { Section } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useState, useEffect, useRef } from 'react'
import { DetailedList } from '@staff-portal/ui'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import { GetPurchaseOrderDetailsNodeFragment } from '../../data/getPurchaseOrderDetails.graphql.types'
import getPurchaseOrderDetailsTableContent, {
  getTableContentForPurchaseOrderLines
} from '../utils'
import { useGetPurchaseOrderDetailsAttributesLazyQuery } from '../../data/getPurchaseOrderDetailsAttributes.graphql.types'
import { useGetPurchaseOrderArchiveStateQuery } from '../../../../data/getPurchaseOrderArchiveState.graphql.types'

const displayName = 'PurchaseOrderDetailsTableContent'

interface Props {
  purchaseOrder: GetPurchaseOrderDetailsNodeFragment
  poLinesEnabled: boolean
}

const PurchaseOrderDetailsTableContent: FC<Props> = memo<Props>(
  ({ purchaseOrder, poLinesEnabled = false }: Props) => {
    const purchaseOrderId = purchaseOrder.id
    const { t: translate } = useTranslation('purchaseOrder')
    const [activePropertyEditor, setActivePropertyEditor] = useState('')
    const [
      requestDetails,
      { data: purchaseOrderDetails, loading: propertyLoading }
    ] = useGetPurchaseOrderDetailsAttributesLazyQuery({
      variables: {
        id: purchaseOrderId
      }
    })

    const {
      data: { archived },
      refetch: refetchArchived
    } = useGetNode(useGetPurchaseOrderArchiveStateQuery)({
      purchaseOrderId
    })

    useRefetch(ApolloContextEvents.purchaseOrderArchiveToggle, refetchArchived)

    // Preserve last value of archived attribute
    const archivedRef = useRef(archived)

    // Detect change of archived attribute and force to close editor mode of DetailedList
    useEffect(() => {
      // In case when we don't have a data about archived we don't want to observer changes
      if (archivedRef.current == null) {
        // Update last local value of archived attribute
        archivedRef.current = archived

        return
      }

      const editorShouldClose =
        activePropertyEditor && archived !== archivedRef.current

      if (editorShouldClose) {
        unsetActiveEditor()
      }

      // Update last local value of archived attribute
      archivedRef.current = archived
    }, [archivedRef, archived, activePropertyEditor])

    const setActiveEditor = (name: string) => () => {
      requestDetails()

      if (name === activePropertyEditor) {
        unsetActiveEditor()
      } else {
        setActivePropertyEditor(name)
      }
    }

    const unsetActiveEditor = () => setActivePropertyEditor('')
    const items = poLinesEnabled
      ? getTableContentForPurchaseOrderLines(purchaseOrder)
      : getPurchaseOrderDetailsTableContent({
          purchaseOrder: { ...purchaseOrder, ...purchaseOrderDetails?.node },
          handleSetActiveEditor: setActiveEditor,
          handleUnSetActiveEditor: unsetActiveEditor,
          activePropertyEditor,
          propertyLoading
        })

    return (
      <Section
        title={translate('page.details.subtitle')}
        data-testid='PurchaseOrderDetailsTable'
      >
        {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
        <DetailedList striped columns={2} labelColumnWidth={8} items={items} />
      </Section>
    )
  }
)

PurchaseOrderDetailsTableContent.displayName = displayName

export default PurchaseOrderDetailsTableContent
