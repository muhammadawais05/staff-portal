import { DetailedListItem } from '~integration/modules/components'
import { FormModal } from '~integration/modules/modals'
import {
  ChangeReferrerModal,
  ChangeSourcerModal,
  ApplicantSkillsField,
  NotesField,
  StatusField,
  ReapplicationDateField,
  AvailabilityField
} from '../components'

class GeneralSection {
  applicantSkillsField = new ApplicantSkillsField()
  notesField = new NotesField()
  changeReferrerModal = new ChangeReferrerModal()
  changeSourcerModal = new ChangeSourcerModal()
  statusField = new StatusField()
  reapplicationDate = new ReapplicationDateField()
  listItem = new DetailedListItem()
  availabilityField = new AvailabilityField()
  subscriptionModal = new FormModal()
  subscriptionCommentModal = new FormModal()

  get section() {
    return cy.getByTestId('talent-general-section')
  }

  get title() {
    return this.section.findByTestId('talent-general-section-title')
  }

  get applicationInfoLink() {
    return this.section.findByTestId('application-info-field-link')
  }

  get changeReferrerButton() {
    return this.section.findByTestId('change-referrer-button')
  }

  get changeSourcerButton() {
    return this.section.findByTestId('change-sourcer-button')
  }

  get communityLeaderField() {
    return this.section.findByTestId('item-field: Community Leader')
  }

  get skypeLink() {
    return this.section.findByTestId('skype-id')
  }

  get getPhoneLink() {
    return this.section.findByTestId('PhoneLink')
  }

  get profileType() {
    return this.listItem.getItemValue('Profile type')
  }

  get availability() {
    return this.listItem.getItemValue('Availability')
  }

  get currentCountry() {
    return this.listItem.getItemValue('Current country')
  }

  get currentCity() {
    return this.listItem.getItemValue('Current city')
  }

  get citizenship() {
    return this.listItem.getItemValue('Citizenship')
  }
}

export default GeneralSection
