import { Table } from '@toptal/picasso'
import React, { FC, SyntheticEvent, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Entities } from '@staff-portal/billing/src/components/ListContext/ListContext'
import ListTable from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable/ListTable'

import MemorandumListTableHeader from '../MemorandumListTableHeader'
import MemorandumListRow from '../MemorandumListRow'
import { GetMemorandumsListQuery } from '../../data'

const displayName = 'MemorandumListTable'

type Memorandums = Exclude<
  GetMemorandumsListQuery['memorandums'],
  null | undefined
>

interface Props {
  memorandums?: Entities<Memorandums>
  handleOnActionClick: (event: SyntheticEvent<HTMLElement, Event>) => void
}

const MemorandumListTable: FC<Props> = memo<Props>(
  ({
    memorandums: {
      data: { nodes: memorandums = [] } = {},
      loading,
      initialLoading
    } = {},
    handleOnActionClick
  }) => {
    const { t: translate } = useTranslation('memorandumList')

    return (
      <ListTable
        loading={loading}
        initialLoading={initialLoading}
        emptyMessage={translate('table.empty.message')}
        header={<MemorandumListTableHeader />}
        body={
          !!memorandums.length && (
            <Table.Body>
              {memorandums.map((memorandum, index) => {
                const { id } = memorandum

                return (
                  <MemorandumListRow
                    handleOnActionClick={handleOnActionClick}
                    memorandum={memorandum}
                    key={id}
                    isEven={Boolean(index % 2)}
                  />
                )
              })}
            </Table.Body>
          )
        }
      />
    )
  }
)

MemorandumListTable.displayName = displayName

export default MemorandumListTable
