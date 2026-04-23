import { ModalKey } from '../../../../@types/types'
import {
  StringParam,
  useQueryParams
} from '../../../../_lib/customHooks/useQueryParams'
import { NodeIdPrefix } from '../../../../_lib/helpers/apollo'
import { ModalData } from '../../../../store/modalActions'

type PageLoadModalData = {
  modalName: ModalKey
  modalOptions: ModalData
}

/**
 * For example, we have the Engagement page with 3 Billing widgets on it.
 * Because each billing widget has its own <Modals> component, when the user is opening the page with query parameter
 * containing modal name - each <Modals> component will read this parameter and trigger opening of the modal.
 *
 * Usage of global ModalsProvider on the SP level, etc, nothing works (or works only in SP),
 * because we still have local <Modals> components for each widget.
 * We can't use `useState` because each widget has its own state.
 * Also, we can't move this state to the global SP level, because each <Modals> component will react to state changes,
 * so as a result - still duplicated modals.
 * And we need to not break modals on platform...
 *
 * As a temporary solution, to share the initially opened modal name between all <Modals>, the global variable is used.
 * This variable is holding the already auto-opened modal name and prevents opening duplicated modals.
 */
let initiallyOpenedModalName: ModalKey | null = null

export const useGetPageLoadModalData = () => {
  const query = useQueryParams({
    billing_cycle_id: StringParam,
    engagement_id: StringParam,
    invoice_id: StringParam,
    memorandum_id: StringParam,
    modal: StringParam,
    node_id: StringParam,
    node_type: StringParam,
    notable_id: StringParam,
    notable_type: StringParam,
    note_id: StringParam,
    variant: StringParam,
    client_id: StringParam
  })

  return (): PageLoadModalData | null => {
    const modalName: ModalKey = query[0].modal as ModalKey
    const {
      billing_cycle_id: billingCycleId,
      engagement_id: engagementId,
      invoice_id: invoiceId,
      memorandum_id: memorandumId,
      node_id: nodeId,
      node_type: nodeType,
      notable_id: notableId,
      notable_type: notableType,
      note_id: noteId,
      variant,
      client_id: clientId
    } = query[0]

    if (!modalName || modalName === initiallyOpenedModalName) {
      return null
    }

    initiallyOpenedModalName = modalName

    const modalOptions: { [key: string]: string } = {
      billingCycleId: billingCycleId as string,
      engagementId: engagementId as string,
      invoiceId: invoiceId as string,
      memorandumId: memorandumId as string,
      nodeId: nodeId as string,
      nodeType: nodeType as keyof typeof NodeIdPrefix,
      notableId: notableId as string,
      notableType: notableType as string,
      noteId: noteId as string,
      variant: variant as string,
      clientId: clientId as string
    }

    return {
      modalName,
      modalOptions
    }
  }
}
