import { BasePage } from '~integration/modules/pages'
import { EditableField, EditableCountry } from '~integration/modules/components'
import {
  LikelihoodToClose,
  LeadStatusModal,
  TimeZone,
  LeadSource,
  BusinessType,
  BillingOptionsUpdate,
  Location,
  ActualSignDate,
  PhoneContacts,
  LegalStaTerms
} from '../components'

class AccountOverviewSection extends BasePage {
  editableField = new EditableField()
  editableCountry = new EditableCountry()
  phoneContacts = new PhoneContacts()
  likelihoodToClose = new LikelihoodToClose()
  leadStatus = new LeadStatusModal()
  timeZone = new TimeZone()
  leadSource = new LeadSource()
  businessType = new BusinessType()
  billingOptionsUpdate = new BillingOptionsUpdate()
  location = new Location()
  actualSignDate = new ActualSignDate()
  legalStaTerms = new LegalStaTerms()
}

export default AccountOverviewSection
