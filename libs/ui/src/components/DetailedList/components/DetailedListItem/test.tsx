import React, { ComponentProps } from 'react'
import { render, within } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DetailedList from '../../DetailedList'
import DetailedListRow from '../DetailedListRow'
import DetailedListItem from '.'

const renderComponent = (props: ComponentProps<typeof DetailedListItem>) =>
  render(
    <TestWrapper>
      <DetailedList defaultValue='-'>
        <DetailedListRow>
          <DetailedListItem {...props} />
          <DetailedListItem label='Test 01' />
          <DetailedListItem label='Test 02' />
          <DetailedListItem label='Test 03' />
        </DetailedListRow>
      </DetailedList>
    </TestWrapper>
  )

describe('DetailedListItem', () => {
  describe('when no value provided', () => {
    it('renders with defaultValue', () => {
      const { getAllByTestId } = renderComponent({
        label: 'Example label',
        isFullWidthLabel: false
      })

      expect(
        within(getAllByTestId('item-field-value')[0]).getByTestId(
          'item-field-typographyOverflow'
        ).textContent
      ).toBe('-')
    })
  })

  describe('when value provided', () => {
    it('renders with value', () => {
      const { getAllByTestId } = renderComponent({
        label: 'Example label',
        isFullWidthLabel: false,
        value: 'Example value'
      })

      expect(
        within(getAllByTestId('item-field-value')[0]).getByTestId(
          'item-field-typographyOverflow'
        ).textContent
      ).toBe('Example value')
    })
  })

  // Checking css props are not the current standard for tests in Staff Portal
  // Enable or remove it after the release for new testing guidelines from #tf-frontend-testing
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('renders with proper Item value', () => {
    const { getByTestId, getAllByTestId } = renderComponent({
      label: 'Example label',
      isFullWidthLabel: false
    })

    expect(getAllByTestId('item-field-value__wrapper')[0]).toHaveAttribute(
      'css',
      `
  width: ,calc(100% - 8rem),;
`
    )
    expect(getAllByTestId('item-field-label__wrapper')[0]).toHaveAttribute(
      'css',
      `
  width: ,8rem,;
`
    )

    expect(getByTestId('item-field: Example label')).toHaveAttribute(
      'css',
      `
  flex-basis: ,25,%;
  max-width: ,25,%;
`
    )
    expect(getByTestId('item-field: Test 01')).toHaveAttribute(
      'css',
      `
  flex-basis: ,25,%;
  max-width: ,25,%;
`
    )
    expect(getByTestId('item-field: Test 02')).toHaveAttribute(
      'css',
      `
  flex-basis: ,25,%;
  max-width: ,25,%;
`
    )
    expect(getByTestId('item-field: Test 03')).toHaveAttribute(
      'css',
      `
  flex-basis: ,25,%;
  max-width: ,25,%;
`
    )
  })
})
