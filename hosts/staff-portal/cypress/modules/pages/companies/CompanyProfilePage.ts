import { BasePage } from '~integration/modules/pages'
import WebAndSocialTab from './web-and-social-tab'
import InternalDataTab from './internal-data-tab'
import NotesTab from './notes-tab'
import BasicInfoTab from './basic-info-tab'
import JobsTab from './jobs-tab/JobsTab'
import TopscreenTab from './topscreen-tab/TopscreenTab'
import { CompanyPrimaryActions, RepauseCompanyModal, Tabs } from './components'

class CompanyProfilePage extends BasePage {
  primaryActions = new CompanyPrimaryActions()
  basicInfoTab = new BasicInfoTab()
  webAndSocialTab = new WebAndSocialTab()
  internalDataTab = new InternalDataTab()
  notesTab = new NotesTab()
  repauseCompanyModal = new RepauseCompanyModal()
  jobsTab = new JobsTab()
  topscreenTab = new TopscreenTab()
  tabs = new Tabs()
}

export default CompanyProfilePage
