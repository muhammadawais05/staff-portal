import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Button } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import { companyMetadataFragmentMock } from '../../data/get-client/company-metadata-fragment.mock'
import { companyHierarchyFragmentMock } from '../../data/get-client/company-hierarchy-fragment.mock'
import {
  ClientHierarchyFragment,
  ClientMetadataFragment
} from '../../data/get-client'
import CompanyProfileTitle from '.'

const ButtonMock = Button.Circular as jest.Mock

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: {
    Circular: jest.fn()
  }
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  decodeEntityId: (id: string) => ({ id })
}))
jest.mock('@staff-portal/routes', () => ({
  ...jest.requireActual('@staff-portal/routes'),
  getClientProfilePath: () => 'https://mock.url'
}))

const renderComponent = (
  overrides: ClientMetadataFragment | ClientHierarchyFragment = {}
) => {
  const client: ClientMetadataFragment & ClientHierarchyFragment = {
    ...companyMetadataFragmentMock,
    ...companyHierarchyFragmentMock,
    ...overrides
  }

  render(
    <TestWrapper>
      <CompanyProfileTitle client={client} />
    </TestWrapper>
  )
}

describe('CompanyHierarchyButton', () => {
  beforeEach(() => {
    ButtonMock.mockImplementation(() => null)
  })

  describe('when there is no present hierarchy', () => {
    it('does not render hierarchy button', () => {
      renderComponent({
        parent: undefined,
        children: {
          nodes: [],
          totalCount: 0
        }
      })

      expect(ButtonMock).not.toHaveBeenCalled()
    })
  })

  describe('when company has parent', () => {
    it('renders hierarchy button', () => {
      renderComponent({
        parent: {
          fullName: 'Company Name',
          id: '123'
        },
        children: {
          nodes: [],
          totalCount: 0
        }
      })

      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          href: 'https://mock.url/hierarchy'
        }),
        {}
      )
    })
  })

  describe('when company has children', () => {
    it('renders hierarchy button', () => {
      renderComponent({
        parent: undefined,
        children: {
          nodes: [
            {
              fullName: 'Company Name',
              id: '123'
            }
          ],
          totalCount: 1
        }
      })

      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          href: 'https://mock.url/hierarchy'
        }),
        {}
      )
    })
  })
})
