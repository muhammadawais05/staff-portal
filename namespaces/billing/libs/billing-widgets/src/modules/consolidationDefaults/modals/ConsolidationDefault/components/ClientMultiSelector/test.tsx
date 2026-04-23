import React, { ComponentProps } from 'react'
import { fireEvent } from '@toptal/picasso/test-utils'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures/index'

import ClientMultiSelector from '.'

const { displayName } = ClientMultiSelector

const render = (props: ComponentProps<typeof ClientMultiSelector>) =>
  renderComponent(<ClientMultiSelector {...props} />)

const mockClients = [
  fixtures.MockClient,
  {
    ...fixtures.MockClient,
    id: `${fixtures.MockClient.id}2`,
    fullName: `${fixtures.MockClient.fullName}2`
  }
]

const commonProps = {
  clients: mockClients,
  placeholder: 'Select multiple companies',
  selectAllLabel: 'Select All Companies'
}

describe('ClientMultiSelector', () => {
  it('renders multiple client options', () => {
    const { getByTestId } = render({
      ...commonProps,
      initialValues: [mockClients[0].id, mockClients[1].id],
      onValuesChange: () => {}
    })

    mockClients.forEach(client => {
      expect(getByTestId(`${displayName}-container`)).toContainHTML(
        client.fullName
      )
    })
  })

  it('has a checkbox that toggles all options', () => {
    const { getByTestId } = render({
      ...commonProps,
      initialValues: [],
      onValuesChange: jest.fn()
    })

    expect(getByTestId(`${displayName}-container`)).not.toContainHTML(
      mockClients[0].fullName
    )

    fireEvent.click(getByTestId(`${displayName}-checkbox`))

    mockClients.forEach(client => {
      expect(getByTestId(`${displayName}-container`)).toContainHTML(
        client.fullName
      )
    })
  })

  it('returns correct data in onValuesChange', () => {
    const mockOnChange = jest.fn((values: string[]) => values)
    const { getByTestId } = render({
      ...commonProps,
      initialValues: [],
      onValuesChange: mockOnChange
    })

    fireEvent.click(getByTestId(`${displayName}-checkbox`))

    expect(mockOnChange).toHaveBeenCalledWith(
      mockClients.map(client => client.id)
    )
  })
})
