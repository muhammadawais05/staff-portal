import { EditableField, TrialLengthEdit } from '~integration/modules/components'
import { ENTER_KEY } from '~integration/utils'
import { PurchaseOrderEditModal } from '../components'

export default class TalentSection {
  editableField = new EditableField()
  purchaseOrderEditModal = new PurchaseOrderEditModal()
  trialLengthEdit = new TrialLengthEdit()

  getTalentSection() {
    return cy.getByTestId('engagement-talent-section')
  }

  getSkypeLink() {
    return this.getTalentSection().findByTestId('skype-id')
  }

  getSkypeModal() {
    return cy.getByTestId('SkypeContact-modal')
  }

  getSkypeModalCloseButton() {
    return this.getSkypeModal().findByTestId('SkypeContact-close-modal-button')
  }

  getPhoneLink() {
    return this.getTalentSection().findByTestId('PhoneLink')
  }

  getPhoneModal() {
    return cy.getByTestId('PhoneContact-modal')
  }

  getPhoneModalCloseButton() {
    return this.getPhoneModal().findByTestId('CustomPromptButton-cancel-button')
  }

  getTrialLengthEditButton() {
    return this.getTalentSection().findByTestId('TrialLengthEdit-button')
  }

  getTrialLengthEditModal() {
    return cy.getByTestId('TrialLengthEdit-modal')
  }

  getTrialLengthEditLengthSelector() {
    return this.getTrialLengthEditModal().findByTestId(
      'TrialLengthEditModal-trial-length'
    )
  }

  getTrialLength() {
    return this.getTalentSection().findByTestId('TrialLengthField-value')
  }

  getEditMinCommitmentButton() {
    return this.getTalentSection().findByTestId('min-commitment-edit-button')
  }

  getEditMinCommitmentModal() {
    return cy.getByTestId('edit-min-commitment-modal')
  }

  getMinimumHoursSelector() {
    return this.getEditMinCommitmentModal().findByTestId(
      'edit-min-commitment-modal-minimum-hours'
    )
  }

  selectMinimumHours() {
    this.getMinimumHoursSelector().within(() => {
      cy.get('input:last')
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
    })
  }

  getEditMinCommitmentComment() {
    return this.getEditMinCommitmentModal().findByTestId(
      'edit-min-commitment-modal-comment'
    )
  }

  getEditMinCommitmentSubmitButton() {
    return this.getEditMinCommitmentModal().findByTestId(
      'edit-min-commitment-modal-submit-button'
    )
  }

  getMinCommitment() {
    return this.getTalentSection().findByTestId('min-commitment-value')
  }

  editExtraHoursEnabled() {
    this.editableField.toggleEditMode('extraHoursEnabled')
  }

  setExtraHoursEnabled(value: string) {
    this.editableField.selectDropdownValue({
      key: 'extraHoursEnabled',
      value
    })
  }

  getExtraHoursEnabled() {
    return this.editableField.get('extraHoursEnabled')
  }

  getTalentRate() {
    return cy.getByTestId('TalentRateField')
  }

  getPurchaseOrderEditButton() {
    return this.getTalentSection().findByTestId('purchase-order-edit-button')
  }

  getPurchaseOrderNumber() {
    return this.getTalentSection().findByTestId('PurchaseOrderField-po-number')
  }

  getPurchaseOrderField() {
    return this.getTalentSection().findByTestId('purchase-order-id')
  }

  getPurchaseOrderLineNumber() {
    return this.getTalentSection().findByTestId(
      'PurchaseOrderField-po-line-number'
    )
  }

  getStatus() {
    return this.getTalentSection()
      .findByTestId('item-field: Status')
      .findByTestId('item-field-value')
  }
}
