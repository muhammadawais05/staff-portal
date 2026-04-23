import { MeetingItem } from '~integration/modules/pages/meetings/components'

export default class MeetingsListSection {
  meetingItem = new MeetingItem()

  get section() {
    return cy.getByTestId('MeetingsList-section')
  }

  get items() {
    return this.section.findByTestId('meeting')
  }

  get firstItem() {
    return this.items.first()
  }
}
