import { encodeEntityId } from '@staff-portal/data-layer-service'

import { parentLinkMock } from '~integration/mocks'

export const getUpdateCascadeParentInfoResponse = () => ({
  data: {
    parent: parentLinkMock(),
    client: {
      id: encodeEntityId('123', 'Client'),
      cascadeParentUpdateInfo: {
        parentAttributeOptions: [
          {
            attribute: 'cascade_discount_eligible',
            checked: 'ALL',
            disabled: false,
            hintOrError: 'Will be updated to No',
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_client_partner_category',
            checked: 'ALL',
            disabled: false,
            hintOrError: 'Will be updated to None',
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_claimer_category',
            checked: 'ALL',
            disabled: false,
            hintOrError: 'Will be updated to Prospect',
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_sales_claimer',
            checked: 'ALL',
            disabled: false,
            hintOrError: 'Will be updated to Bruce Jones',
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_client_partner',
            checked: 'ALL',
            disabled: false,
            hintOrError: 'Will be updated to None',
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_tier',
            checked: 'ALL',
            disabled: false,
            hintOrError: 'Will be updated to Mid-tier',
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_regions',
            checked: 'ALL',
            disabled: false,
            hintOrError: 'Will be updated to South Central, None',
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_parent_sta',
            checked: 'NONE',
            disabled: true,
            hintOrError: null,
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_billing_information_note',
            checked: 'NONE',
            disabled: true,
            hintOrError:
              'The selected parent company does not have a billing note set.',
            __typename: 'CascadeParentAttributeOption'
          },
          {
            attribute: 'cascade_billing_details',
            checked: 'ALL',
            disabled: false,
            hintOrError:
              '<p>Billing name will not be changed for: Nader, Witting and Collier (current).</p>\n\n<p>Billing address will not be changed for: Nader, Witting and Collier (current).</p>\n\n<p>Billing phone will not be changed for: Nader, Witting and Collier (current).</p>',
            __typename: 'CascadeParentAttributeOption'
          }
        ],
        parentStaContracts: {
          edges: [],
          hasClickableContracts: false,
          hasDeprecatedContracts: true,
          __typename: 'ClientCascadeParentUpdateContractConnection'
        },
        __typename: 'ClientCascadeParentUpdateInfo'
      },
      __typename: 'Client'
    }
  }
})
