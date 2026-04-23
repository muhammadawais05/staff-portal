import fixtures from '@staff-portal/billing/src/_fixtures'

import getCommissionsDetailedList from './getCommissionDetailedList'

const commissionData = fixtures.MockGetCommission

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (...args: (string | object)[]) => args
  })
}))

describe('#getCommissionsDetailedList', () => {
  describe('when claimer data is present', () => {
    describe('and referral commission data is missing', () => {
      it('includes Claimer section in the List', () => {
        const listContent = JSON.parse(
          JSON.stringify(
            getCommissionsDetailedList({
              commissionData: {
                ...commissionData,
                commissionReceiver: null
              },
              handleOnClick: jest.fn(),
              isActionsHidden: false
            })
          )
        )

        expect(listContent).toHaveLength(2)

        expect(listContent[0].label).toBe('Referrer')
        expect(listContent[0].value.props).toStrictEqual({
          operation: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          type: 'referrer'
        })
        expect(listContent[1].label).toBe('Claimer')
        expect(listContent[1].value.props).toStrictEqual({
          operation: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },

          type: 'claimer',
          webResource: {
            __typename: 'Link',
            text: 'Michal Raček',
            url: 'https://staging.toptal.net/platform/staff/staff/1209624'
          }
        })
      })
    })
  })

  describe('when its a referrer', () => {
    describe('when data has `RelativeSourcingCommission`', () => {
      it('includes referrer section in the List', () => {
        const listContent = JSON.parse(
          JSON.stringify(
            getCommissionsDetailedList({
              commissionData: {
                ...commissionData,
                commissions: {
                  commissionsPot: 5,
                  referralCommission: {
                    ratePercent: '17',
                    __typename: 'RelativeSourcingCommission'
                  },
                  __typename: 'ClientCommissions'
                }
              },
              handleOnClick: jest.fn(),
              isActionsHidden: false
            })
          )
        )

        expect(listContent).toHaveLength(2)

        expect(listContent[0].label).toBe('Referrer (17.0%)')
        expect(listContent[0].value.props).toStrictEqual({
          operation: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          type: 'referrer'
        })

        expect(listContent[1].label).toBe('Commission Receiver')
        expect(listContent[1].value.props).toStrictEqual({
          'data-testid': 'CommissionContentReferral-commissionReceiver-link',
          size: 'medium',
          webResource: {
            __typename: 'Link',
            text: 'Michal Raček',
            url: 'https://staging.toptal.net/platform/staff/staff/1209624'
          },
          weight: 'semibold'
        })
      })
    })

    describe('when data has `FixedSourcingCommission`', () => {
      it('includes referrer section in the List', () => {
        const listContent = JSON.parse(
          JSON.stringify(
            getCommissionsDetailedList({
              commissionData: {
                ...commissionData,
                commissions: {
                  commissionsPot: 5,
                  referralCommission: {
                    commission: '2000.0',
                    __typename: 'FixedSourcingCommission'
                  },
                  __typename: 'ClientCommissions'
                }
              },
              handleOnClick: jest.fn(),
              isActionsHidden: false
            })
          )
        )

        expect(listContent).toHaveLength(2)

        expect(listContent[0].label).toBe('Referrer ($2,000.00)')
        expect(listContent[0].value.props).toStrictEqual({
          operation: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          type: 'referrer'
        })

        expect(listContent[1].label).toBe('Commission Receiver')
        expect(listContent[1].value.props).toStrictEqual({
          'data-testid': 'CommissionContentReferral-commissionReceiver-link',
          size: 'medium',
          webResource: {
            __typename: 'Link',
            text: 'Michal Raček',
            url: 'https://staging.toptal.net/platform/staff/staff/1209624'
          },
          weight: 'semibold'
        })
      })
    })

    describe('when data it has no referral commission', () => {
      it('excludes referrer section from the List', () => {
        const listContent = JSON.parse(
          JSON.stringify(
            getCommissionsDetailedList({
              commissionData: {
                ...commissionData,
                referralCommission: undefined
              },
              handleOnClick: jest.fn(),
              isActionsHidden: false
            })
          )
        )

        expect(listContent).toHaveLength(2)

        expect(listContent[0].label).toBe('Referrer')
        expect(listContent[0].value.props).toStrictEqual({
          operation: {
            __typename: 'Operation',
            callable: 'ENABLED',
            messages: []
          },
          type: 'referrer'
        })

        expect(listContent[1].label).toBe('Commission Receiver')
        expect(listContent[1].value.props).toStrictEqual({
          'data-testid': 'CommissionContentReferral-commissionReceiver-link',
          size: 'medium',
          webResource: {
            __typename: 'Link',
            text: 'Michal Raček',
            url: 'https://staging.toptal.net/platform/staff/staff/1209624'
          },
          weight: 'semibold'
        })
      })
    })
  })

  describe('when data it has no claimer', () => {
    it('excludes Claimer section from the List', () => {
      const listContent = JSON.parse(
        JSON.stringify(
          getCommissionsDetailedList({
            commissionData: {
              ...commissionData,
              claimer: undefined
            },
            handleOnClick: jest.fn(),
            isActionsHidden: false
          })
        )
      )

      expect(listContent).toHaveLength(2)

      expect(listContent[0].label).toBe('Referrer')
      expect(listContent[0].value.props).toStrictEqual({
        operation: {
          __typename: 'Operation',
          callable: 'ENABLED',
          messages: []
        },
        type: 'referrer'
      })

      expect(listContent[1].label).toBe('Commission Receiver')
      expect(listContent[1].value.props).toStrictEqual({
        'data-testid': 'CommissionContentReferral-commissionReceiver-link',
        size: 'medium',
        webResource: {
          __typename: 'Link',
          text: 'Michal Raček',
          url: 'https://staging.toptal.net/platform/staff/staff/1209624'
        },
        weight: 'semibold'
      })
    })
  })
})
