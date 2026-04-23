import React from 'react'
import { Table, EmptyState } from '@toptal/picasso'
import {
  ContainerLoader,
  TableSkeleton,
  TableSkeletonColumn
} from '@staff-portal/ui'
import { titleize } from '@staff-portal/string'
import { isNotNullish } from '@staff-portal/utils'

import * as TableStyles from '../../styles'
import { useGetSkillsVerticals } from '../../data/get-skills-verticals'
import { SkillNamesListItemSkillFragment } from '../../data/get-skill-names-list'

const tableColumns: TableSkeletonColumn[] = [
  {
    key: 'vertical',
    title: 'Vertical',
    props: {
      css: TableStyles.verticalColumn
    }
  },
  {
    key: 'category',
    title: 'Category',
    props: {
      css: TableStyles.verticalColumn
    }
  },
  {
    key: 'parent',
    title: 'Parent Skill',
    props: {
      css: TableStyles.verticalColumn
    }
  },
  {
    key: 'identifier',
    title: 'Identifier',
    props: {
      css: TableStyles.boolColumn
    }
  }
]

export interface Props {
  skills: SkillNamesListItemSkillFragment[]
}

const SkillNameVerticalsList = ({ skills }: Props) => {
  const skillIds = skills.map(skill => skill.id)
  const { data, loading, initialLoading } = useGetSkillsVerticals(skillIds)

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <TableSkeleton
          cols={tableColumns}
          rows={skills.length}
          dataTestId='SkillNameVerticalsList-loading'
        />
      }
    >
      {data?.length ? (
        <Table variant='striped'>
          <Table.Head>
            <Table.Row>
              {tableColumns.map(columnItem => (
                <Table.Cell key={columnItem.title} css={columnItem.props?.css}>
                  {columnItem.title}
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.filter(isNotNullish).map(skill => (
              <Table.Row key={skill.id}>
                <Table.Cell css={TableStyles.verticalColumn}>
                  {skill.category.vertical &&
                    titleize(skill.category.vertical.talentType)}
                </Table.Cell>
                <Table.Cell css={TableStyles.verticalColumn}>
                  {skill.category.title}
                </Table.Cell>
                <Table.Cell css={TableStyles.verticalColumn}>
                  {skill.parent?.name || 'Vertical Root'}
                </Table.Cell>
                <Table.Cell css={TableStyles.boolColumn}>
                  {skill.isIdentifier ? 'Yes' : 'No'}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <EmptyState.Collection>No Verticals</EmptyState.Collection>
      )}
    </ContainerLoader>
  )
}

export default SkillNameVerticalsList
