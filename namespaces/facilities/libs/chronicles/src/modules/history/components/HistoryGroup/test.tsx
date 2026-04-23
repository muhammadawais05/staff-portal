import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Section } from '@toptal/picasso'

import HistoryGroup from './HistoryGroup'

jest.mock('@toptal/picasso', () => ({
  Section: jest.fn(),
  Table: {
    ...jest.requireActual('@toptal/picasso').Table,
    Body: jest.fn()
  }
}))
jest.mock('../Timeline', () => ({
  __esModule: true,
  default: () => <div data-testid='timeline' />
}))

const SectionMock = Section as unknown as jest.Mock

const renderComponent = (
  props?: Partial<ComponentProps<typeof HistoryGroup>>
) =>
  render(
    <TestWrapper>
      <HistoryGroup title='some title' {...props}>
        some content
      </HistoryGroup>
    </TestWrapper>
  )

describe('HistoryGroup', () => {
  beforeEach(() => {
    SectionMock.mockImplementation(() => null)
  })

  describe('when `variant` equals `table`', () => {
    it('renders `section` in `withHeaderBar` variant', () => {
      renderComponent({ variant: 'table' })

      expect(SectionMock).toHaveBeenCalledWith(
        expect.objectContaining({ variant: 'withHeaderBar' }),
        {}
      )
    })
  })

  describe('when `variant` equals `timeline`', () => {
    it('renders `section` in `default` variant', () => {
      renderComponent()

      expect(SectionMock).not.toHaveBeenCalledWith(
        expect.objectContaining({ variant: 'withHeaderBar' }),
        {}
      )
    })
  })
})
