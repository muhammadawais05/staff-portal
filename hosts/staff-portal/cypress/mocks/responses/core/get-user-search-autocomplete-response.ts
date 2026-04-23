import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getUserSearchAutocompleteResponse = () => ({
  data: {
    autocomplete: {
      edges: [
        {
          key: 'names-keywords-payees-managers-referral_partners-123',
          node: {
            id: encodeEntityId('123', 'ReferralPartner'),
            webResource: {
              text: 'Tyler Terry',
              url: 'https://staging.toptal.net/platform/staff/referral_partners/123',
              __typename: 'Link'
            },
            __typename: 'ReferralPartner'
          },
          nodeTypes: ['referral_partner'],
          label: 'Tyler Terry',
          labelHighlight:
            '{{strong}}T{{/strong}}yler {{strong}}T{{/strong}}erry',
          photo: null,
          __typename: 'AutocompleteEdge'
        }
      ],
      __typename: 'AutocompleteConnection'
    }
  }
})
