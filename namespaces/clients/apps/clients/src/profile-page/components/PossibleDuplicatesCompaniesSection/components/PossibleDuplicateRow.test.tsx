import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { Client, ClientCumulativeStatus } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import { CompanyStatus } from '@staff-portal/clients'

import PossibleDuplicatesRow from './PossibleDuplicateRow'

const NO_VALUE_MOCK = '-'

jest.mock('@staff-portal/clients', () => ({
  CompanyStatus: jest.fn()
}))
jest.mock('@staff-portal/config', () => ({
  NO_VALUE: NO_VALUE_MOCK
}))
jest.mock('@staff-portal/string', () => ({
  ...jest.requireActual('@staff-portal/string'),
  titleize: jest.fn()
}))

const mockedCompanyStatus = CompanyStatus as jest.Mock
const titleizeMock = titleize as jest.Mock
const client = {
  cumulativeStatus: ClientCumulativeStatus.ACTIVE,
  investigations: {},
  webResource: {
    url: 'https://staging.toptal.net/companies/123/hierarchy',
    text: 'full name'
  }
}

const renderComponent = (explanation?: string) =>
  render(
    <table>
      <tbody>
        <PossibleDuplicatesRow
          node={client as Client}
          explanation={explanation}
        />
      </tbody>
    </table>
  )

describe('PossibleDuplicateRow', () => {
  beforeEach(() => {
    mockedCompanyStatus.mockReturnValue(null)
    titleizeMock.mockReturnValue(null)
  })

  describe('when you pass the expected props', () => {
    it('renders as expected', () => {
      renderComponent('some valuable explanation')

      expect(mockedCompanyStatus).toHaveBeenCalledWith(
        { cumulativeStatus: ClientCumulativeStatus.ACTIVE, investigations: {} },
        {}
      )
      expect(screen.getByTestId('PossibleDuplicateRow-name')).toHaveTextContent(
        client.webResource.text
      )
      expect(titleizeMock).toHaveBeenCalledWith('some valuable explanation', {
        capitalizeAllWords: false
      })
    })
  })

  describe('when explanation prop is missing', () => {
    it('renders placeholder for explanation column', () => {
      renderComponent()

      expect(
        screen.getByTestId('PossibleDuplicateRow-explanation')
      ).toHaveTextContent(NO_VALUE_MOCK)
    })
  })
})
