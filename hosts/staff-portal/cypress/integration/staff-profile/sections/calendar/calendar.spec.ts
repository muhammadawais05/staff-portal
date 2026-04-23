import StaffProfilePage from '~integration/modules/pages/staff-profile'
import { updateCalendarStubs } from '~integration/mocks/schema-updates/staff-profile'

describe('renders the calendar days with the correct background color', () => {
  const staffProfilePage = new StaffProfilePage()

  beforeEach(() => {
    updateCalendarStubs({
      GetDayOffs: {
        data: {
          node: {
            daysOff: {
              totalCount: 1,
              nodes: [
                {
                  start: '2022-06-04',
                  finish: '2022-06-05',
                  __typename: 'DayOff'
                }
              ],
              __typename: 'DayOffConnection'
            },
            __typename: 'Staff'
          }
        }
      }
    })

    staffProfilePage.visit()
  })

  it('Calendar', () => {
    staffProfilePage.calendarIncrease.click()

    staffProfilePage.getDayOffCalendarContainer(4).should('have.css', 'background-color', 'rgb(251, 237, 241)')
    staffProfilePage.getDayOffCalendarContainer(5).should('have.css', 'background-color', 'rgb(251, 237, 241)')
  })
})
