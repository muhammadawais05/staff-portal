import React from 'react'
import { Table } from '@toptal/picasso'
import { useGetData } from '@staff-portal/data-layer-service'
import {
  NoSearchResultsMessage,
  TableSkeleton,
  TableSkeletonColumn
} from '@staff-portal/ui'

import { GetSkillPageSlugsListDocument } from '../../modals/EditSkillNameModal/data'
import { PAGE_SIZE } from '../../config'
import { useExpandableSkillName } from './hooks'
import { VerticalWithSkillCategoriesFragment } from '../../data/get-verticals-with-categories'
import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'
import { SkillNameListItem } from '../index'
import * as TableStyles from '../../styles'

const NO_RESULTS_MESSAGE = 'There are no skills for this search criteria'

const tableColumns: TableSkeletonColumn[] = [
  {
    key: 'skill',
    title: 'Skill',
    props: {
      css: TableStyles.skillColumn
    }
  },
  {
    key: 'verticals',
    title: 'Vertical(s)',
    props: {
      css: TableStyles.verticalsColumn
    }
  },
  {
    key: 'expanding_button',
    title: '',
    props: {
      css: TableStyles.expandingColumn
    }
  },
  {
    key: 'editor_check',
    title: 'Editor ✔',
    props: {
      css: TableStyles.checkColumn
    }
  },
  {
    key: 'vertical_check',
    title: 'Vertical ✔',
    props: {
      css: TableStyles.checkColumn
    }
  },
  {
    key: 'actions',
    title: '',
    props: {
      css: TableStyles.actionsColumn
    }
  }
]

export interface Props {
  data: SkillNamesListItemFragment[]
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
  loading?: boolean
}

const SkillNamesTable = ({
  data: skillNames,
  verticalsWithCategories,
  loading = false
}: Props) => {
  const getSkillPageSlugsList = useGetData(
    GetSkillPageSlugsListDocument,
    'skillPageSlugs'
  )

  const { data: skillPageSlugs, loading: loadingSkillPageSlugs } =
    getSkillPageSlugsList({})

  const { expandedSkillNameIds, expandCollapseSkillName } =
    useExpandableSkillName()

  if (loading || loadingSkillPageSlugs) {
    return (
      <TableSkeleton
        cols={tableColumns}
        rows={PAGE_SIZE}
        dataTestId='skills-loading'
        variant='striped'
      />
    )
  }

  if (!skillNames?.length) {
    return <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
  }

  return (
    <Table data-testid='SkillNamesTable-list'>
      <Table.Head>
        <Table.Row>
          {tableColumns.map(columnItem => (
            <Table.Cell key={columnItem.key} css={columnItem.props?.css}>
              {columnItem.title}
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {skillNames.map(
          (skillName: SkillNamesListItemFragment, index: number) => (
            <SkillNameListItem
              key={skillName.id}
              skillName={skillName}
              stripeEven={Boolean(index % 2)}
              isExpanded={expandedSkillNameIds[skillName.id]}
              verticalsWithCategories={verticalsWithCategories}
              skillPageSlugs={skillPageSlugs}
              expandCollapse={expandCollapseSkillName}
            />
          )
        )}
      </Table.Body>
    </Table>
  )
}

export default SkillNamesTable
