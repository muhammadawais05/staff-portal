import React, { ComponentProps } from 'react'

import fixtures from '../../../../_fixtures'
import ListState from '.'
import renderComponent from '../../../../utils/tests'
import { ApolloContextEvents } from '../../../../@types/types'
import * as refetch from '../../../../_lib/helpers/apollo/useRefetch'
import { createListContext } from '../../../ListContext'

jest.mock('../../../../_lib/helpers/apollo/useRefetch')
jest.mock('@apollo/client')

const mockedRefetch = jest.fn()

const render = (props: Omit<ComponentProps<typeof ListState>, 'children'>) =>
  renderComponent(<ListState {...props}>{() => <></>}</ListState>)

const eventsList = [
  ApolloContextEvents.commercialDocumentApplyMemos,
  ApolloContextEvents.invoiceAssignPurchaseOrder,
  ApolloContextEvents.memorandumAdd,
  ApolloContextEvents.transferPostpone
]

describe('ListState', () => {
  describe('listening for Apollo context events', () => {
    it('refetches data on predefined events', () => {
      jest.spyOn(refetch, 'useRefetch')

      render({
        options: {
          context: createListContext(),
          updateDataEvents: eventsList,
          getQueryParamsConfig: jest.fn(),
          getGqlParamsConfig: jest.fn(),
          useGetList: jest.fn().mockReturnValue({
            data: fixtures.MockInvoiceList,
            error: false,
            loading: false,
            refetch: mockedRefetch
          })
        }
      })

      expect(refetch.useRefetch).toHaveBeenCalledTimes(2)
      expect(refetch.useRefetch).toHaveBeenCalledWith(eventsList, mockedRefetch)
    })
  })
})
