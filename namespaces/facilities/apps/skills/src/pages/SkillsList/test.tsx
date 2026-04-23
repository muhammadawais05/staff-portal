import React, { ComponentProps } from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createGetVerticalsWithCategoriesMock } from '../../data/get-verticals-with-categories/mocks'
import { createGetSkillPageSlugsListMock } from '../../modals/EditSkillNameModal/data/get-skill-page-slugs-list/mocks'
import {
  createGetSkillNamesListMock,
  createSkillNamesListItemFragmentMock
} from '../../data/get-skill-names-list/mocks'
import {
  createGetSkillsVerticalsMock,
  createSkillWithVerticalFragment
} from '../../data/get-skills-verticals/mocks'
import { SkillNamesTable } from '../../components'
import SkillsList from './SkillsList'

jest.mock('../../components', () => ({
  SkillNamesTable: jest.fn()
}))

const SkillNamesTableMock = SkillNamesTable as jest.Mock

interface Props {
  mocks?: MockedResponse[]
}

const App = ({ mocks }: Props) => (
  <MemoryRouter>
    <TestWrapperWithMocks mocks={mocks}>
      <SkillsList />
    </TestWrapperWithMocks>
  </MemoryRouter>
)

const arrangeTest = async (mocks?: MockedResponse[]) => {
  render(<App mocks={mocks} />)

  await waitForElementToBeRemoved(() =>
    screen.getAllByText('Loading, please wait…')
  )
}

describe('SkillsList', () => {
  beforeEach(() => {
    SkillNamesTableMock.mockImplementation(() => (
      <div data-testid='SkillNamesTable-mock' />
    ))
  })

  describe('when there is no data', () => {
    it('shows filters and renders table', async () => {
      const data = [
        createGetSkillNamesListMock(),
        createGetSkillPageSlugsListMock(),
        createGetVerticalsWithCategoriesMock()
      ]

      await arrangeTest(data)

      expect(await screen.findByTestId('content-title')).toHaveTextContent(
        'Skills (0)'
      )

      expect(screen.getByTestId('filters-header')).toBeInTheDocument()
      expect(screen.getByTestId('Sort Order')).toBeInTheDocument()
      expect(screen.getByTestId('toggle-filters-form')).toBeInTheDocument()
      expect(screen.getByTestId('SkillNamesTable-mock')).toBeInTheDocument()
    })
  })

  describe('when data is available', () => {
    it('shows filters and renders table', async () => {
      const skillWithVerticalFragment = createSkillWithVerticalFragment()
      const data = createSkillNamesListItemFragmentMock()
      const mocks = [
        createGetSkillNamesListMock([data]),
        createGetSkillsVerticalsMock(
          [skillWithVerticalFragment.id],
          [skillWithVerticalFragment]
        ),
        createGetSkillPageSlugsListMock(),
        createGetVerticalsWithCategoriesMock()
      ]

      await arrangeTest(mocks)

      expect(await screen.findByTestId('content-title')).toHaveTextContent(
        'Skills (1)'
      )

      expect(screen.getByTestId('filters-header')).toBeInTheDocument()
      expect(screen.getByTestId('Sort Order')).toBeInTheDocument()
      expect(screen.getByTestId('toggle-filters-form')).toBeInTheDocument()
      expect(screen.getByTestId('SkillNamesTable-mock')).toBeInTheDocument()

      const expectedSkillNamesTableProps: Partial<
        ComponentProps<typeof SkillNamesTableMock>
      > = {
        data: [data]
      }

      expect(SkillNamesTableMock).toHaveBeenCalledWith(
        expect.objectContaining(expectedSkillNamesTableProps),
        expect.anything()
      )
    })
  })
})
