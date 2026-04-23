import { AnyObject, FORM_ERROR } from '@toptal/picasso-forms'
import { ApplyUnallocatedMemorandumsToCommercialDocumentInput } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

const validator = (values: AnyObject) => {
  const formError: AnyObject = {}
  const { applyPrepayments, memorandumIdsToAllocate } =
    values as ApplyUnallocatedMemorandumsToCommercialDocumentInput

  if (!applyPrepayments && memorandumIdsToAllocate.length === 0) {
    formError[FORM_ERROR] = i18n.t(
      'commercialDocument:modals.applyMemos.notification.error'
    )
  }

  return formError
}

export default validator
