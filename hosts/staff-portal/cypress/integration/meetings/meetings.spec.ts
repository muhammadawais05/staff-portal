import { MeetingsPage } from '~integration/modules/pages'
import { updateMeetingsPageStubs } from '~integration/mocks/schema-updates/meetings'

describe('Meeting list page', () => {
  const page = new MeetingsPage()

  describe('no meetings', () => {
    it('renders empty message, if there are no meetings', () => {
      updateMeetingsPageStubs()

      page.visit()

      page
        .getEmptyMessage()
        .should('exist')
        .should('contain', 'No meetings scheduled for today')
    })
  })
})
