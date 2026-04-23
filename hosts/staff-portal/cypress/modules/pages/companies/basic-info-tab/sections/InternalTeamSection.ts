import { BasePage } from '~integration/modules/pages'
import { EditableField } from '~integration/modules/components'
import {
  AccountManager,
  AccountOwner,
  EnterpriseSalesExecutive,
  ClaimerCategory,
  Matcher,
  StaffRequestTransferModal,
  ClientPartner,
  ParentLink
} from '../components'

class InternalTeamSection extends BasePage {
  editableField = new EditableField()
  claimerCategory = new ClaimerCategory()
  accountManager = new AccountManager()
  accountOwner = new AccountOwner()
  enterpriseSalesExecutive = new EnterpriseSalesExecutive()
  matcher = new Matcher()
  requestTransfer = new StaffRequestTransferModal()
  clientPartner = new ClientPartner()
  parentLink = new ParentLink()
}

export default InternalTeamSection
