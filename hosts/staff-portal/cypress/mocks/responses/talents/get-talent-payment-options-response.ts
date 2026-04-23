import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentPaymentOptionsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      paymentOptions: {
        manageLink: {
          text: '',
          url: 'https://staging.toptal.net/platform/staff/talents/3012798/payment_options',
          __typename: 'Link'
        },
        viewLink: {
          text: '',
          url: 'https://staging.toptal.net/platform/staff/talents/3012798/payment_methods',
          __typename: 'Link'
        },
        nodes: [
          {
            accountInfo: null,
            paymentMethod: 'PAYPAL',
            placeholder: true,
            preferred: false,
            __typename: 'PaymentOption'
          },
          {
            accountInfo: null,
            paymentMethod: 'BANK_WIRE',
            placeholder: true,
            preferred: false,
            __typename: 'PaymentOption'
          },
          {
            accountInfo: null,
            paymentMethod: 'PAYONEER',
            placeholder: true,
            preferred: false,
            __typename: 'PaymentOption'
          }
        ],
        __typename: 'PaymentOptionsConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
