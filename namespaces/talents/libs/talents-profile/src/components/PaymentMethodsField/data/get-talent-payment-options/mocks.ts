import { GET_TALENT_PAYMENT_OPTIONS } from './get-talent-payment-options.staff.gql'
import { TalentPaymentOptionsFragment } from './get-talent-payment-options.staff.gql.types'

export const createGetTalentPaymentOptionsMock = ({
  talentId = '123',
  paymentOptions
}: {
  talentId?: string
  paymentOptions?: TalentPaymentOptionsFragment['paymentOptions']
}) => ({
  request: { query: GET_TALENT_PAYMENT_OPTIONS, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        paymentOptions: {
          ...paymentOptions,
          manageLink: {
            text: '★ Toptal Payments',
            url: 'https://staging.toptal.net/platform/staff/talents/2172491/payment_options',
            ...paymentOptions?.manageLink,
            __typename: 'Link'
          },
          viewLink: {
            text: '★ Toptal Payments',
            url: 'https://staging.toptal.net/platform/staff/talents/2172491/payment_methods',
            ...paymentOptions?.viewLink,
            __typename: 'Link'
          },
          nodes: paymentOptions
            ? paymentOptions?.nodes.map(payment => {
                return {
                  ...payment,
                  __typename: 'PaymentOption'
                }
              })
            : [],
          __typename: 'PaymentOptionsConnection'
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentPaymentOptionsFailedMock = ({
  talentId,
  errorMessage = 'Network error.'
}: {
  talentId: string
  errorMessage?: string
}) => ({
  request: { query: GET_TALENT_PAYMENT_OPTIONS, variables: { talentId } },
  error: new Error(errorMessage)
})
