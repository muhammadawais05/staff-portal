import { OnlineTestAttemptsFragment } from '../../../ClaimOnlineTestStepModal/data/get-online-test-data/get-online-test-data.staff.gql.types'
import { getOnlineTestAttemptColor } from './get-online-test-attempt-color'

const mockProperty = (
  data?: Partial<OnlineTestAttemptsFragment>
): OnlineTestAttemptsFragment => ({
  id: '1',
  createdAt: '',
  ...data
})

describe('getOnlineTestAttemptColor', () => {
  it('returns undefined when pure score or reject threshold is missing', () => {
    expect(getOnlineTestAttemptColor(mockProperty())).toBeUndefined()
  })

  it('returns red value', () => {
    expect(
      getOnlineTestAttemptColor(
        mockProperty({
          pureScore: 5,
          test: {
            id: '',
            name: '',
            service: '',
            acceptThreshold: 10,
            rejectThreshold: 10
          }
        })
      )
    ).toBe('red')
  })

  it('returns green value', () => {
    expect(
      getOnlineTestAttemptColor(
        mockProperty({
          pureScore: 15,
          test: {
            id: '',
            name: '',
            service: '',
            acceptThreshold: 10,
            rejectThreshold: 10
          }
        })
      )
    ).toBe('green')
  })

  it('returns yellow value', () => {
    expect(
      getOnlineTestAttemptColor(
        mockProperty({
          pureScore: 15,
          test: {
            id: '',
            name: '',
            service: '',
            acceptThreshold: 20,
            rejectThreshold: 10
          }
        })
      )
    ).toBe('yellow')
  })
})
