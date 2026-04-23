import { pick } from 'lodash-es'
import MockPaymentGroupList from '@staff-portal/billing/src/_fixtures/graphql/gateway/getPaymentGroupList'
import MockGetPaymentGroupListHeaderActions from '@staff-portal/billing/src/_fixtures/graphql/gateway/getPaymentGroupListHeader'
import MockAutocompleteSearchResultsInvoiceListTalents from '@staff-portal/billing/src/_fixtures/graphql/gateway/autocompleteInvoiceListTalent'
import MockPaymentGroup from '@staff-portal/billing/src/_fixtures/graphql/gateway/getPaymentGroup'

import paymentGroupMutations from './paymentGroupListMutations'

export default {
  ...paymentGroupMutations,
  GetPaymentGroupsList: {
    data: MockPaymentGroupList
  },
  GetOperations: {
    data: {
      node: {
        ...pick(MockPaymentGroup, ['__typename', 'id', 'webResource']),
        operations: {
          __typename: 'PaymentGroupOperations',
          cancelPaymentGroup: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          }
        }
      }
    }
  },
  GetPaymentGroupsListHeader: {
    data: MockGetPaymentGroupListHeaderActions
  },
  QueryAutocomplete: {
    data: MockAutocompleteSearchResultsInvoiceListTalents
  },
  GetApplyUnallocatedMemorandumsToPaymentGroup: {
    data: {
      node: {
        ...pick(MockPaymentGroup, ['__typename', 'id', 'number', 'subject'])
      }
    }
  }
}
