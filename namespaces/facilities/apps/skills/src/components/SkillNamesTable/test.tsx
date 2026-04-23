import React, { ComponentProps } from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { within } from '@toptal/picasso/test-utils'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createGetSkillPageSlugsListMock } from '../../modals/EditSkillNameModal/data/get-skill-page-slugs-list/mocks'
import SkillNamesTable from '.'
import { createSkillNamesListItemFragmentMock } from '../../data/get-skill-names-list/mocks'
import { SkillNameListItem } from '..'
import { useExpandableSkillName } from './hooks'
import { Props } from './SkillNamesTable'

jest.mock('../SkillNameListItem', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('./hooks', () => ({
  __esModule: true,
  useExpandableSkillName: jest.fn()
}))

const arrangeTest = ({ data, loading, verticalsWithCategories }: Props) =>
  render(
    <TestWrapperWithMocks mocks={[createGetSkillPageSlugsListMock()]}>
      <SkillNamesTable
        loading={loading}
        data={data}
        verticalsWithCategories={verticalsWithCategories}
      />
    </TestWrapperWithMocks>
  )

const SkillNameListItemMock = SkillNameListItem as jest.Mock
const useExpandableSkillNameMock = useExpandableSkillName as jest.Mock
const expandCollapseSkillNameMock = jest.fn()

describe('SkillNamesTable', () => {
  beforeEach(() => {
    SkillNameListItemMock.mockImplementation(() => {
      const { Table } = require('@toptal/picasso')

      return (
        <Table.Row data-testid='SkillNameListItem-mock'>
          <Table.Cell />
        </Table.Row>
      )
    })
    useExpandableSkillNameMock.mockImplementation(() => {
      return {
        expandedSkillNameIds: [],
        expandCollapseSkillName: expandCollapseSkillNameMock
      }
    })
  })
  describe("when there is 'loading' state", () => {
    it('renders the skeleton loader', () => {
      arrangeTest({ data: [], loading: true, verticalsWithCategories: [] })

      expect(screen.getByTestId('skills-loading')).toBeInTheDocument()
    })
  })

  describe('when there is no data', () => {
    it('renders no result message', async () => {
      arrangeTest({ data: [], loading: false, verticalsWithCategories: [] })

      await waitForElementToBeRemoved(() => screen.getAllByText('Loading...'))

      expect(
        screen.getByText('There are no skills for this search criteria')
      ).toBeInTheDocument()
    })
  })

  describe('when data available', () => {
    it('renders data grid', async () => {
      const data = [createSkillNamesListItemFragmentMock()]

      arrangeTest({ data, loading: false, verticalsWithCategories: [] })

      await waitForElementToBeRemoved(() => screen.getAllByText('Loading...'))

      const expectedSkillNameListItemProps: Partial<
        ComponentProps<typeof SkillNameListItemMock>
      > = {
        skillName: data[0],
        stripeEven: false,
        isExpanded: undefined,
        expandCollapse: expandCollapseSkillNameMock
      }

      expect(SkillNameListItemMock).toHaveBeenCalledWith(
        expect.objectContaining(expectedSkillNameListItemProps),
        expect.anything()
      )

      const table = screen.getByTestId('SkillNamesTable-list')

      expect(within(table).getByText('Skill')).toBeInTheDocument()
      expect(within(table).getByText('Vertical(s)')).toBeInTheDocument()
      expect(within(table).getByText('Editor ✔')).toBeInTheDocument()
      expect(within(table).getByText('Vertical ✔')).toBeInTheDocument()

      expect(
        within(table).queryByTestId('skills-loading')
      ).not.toBeInTheDocument()
      expect(
        within(table).getByTestId('SkillNameListItem-mock')
      ).toBeInTheDocument()
    })
  })
})
