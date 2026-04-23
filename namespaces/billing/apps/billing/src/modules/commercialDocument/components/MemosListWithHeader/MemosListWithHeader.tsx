import React, { FC, memo } from 'react'
import { Amount, Table, TypographyOverflow } from '@toptal/picasso'
import { FinalField } from '@toptal/picasso-forms'
import FormInputCheckbox from '@staff-portal/billing/src/components/FormInputCheckbox'

import { UnallocatedMemorandumFragment } from '../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import * as S from './styles'

const displayName = 'MemosListWithHeader'

interface Props {
  header: string
  memorandums: UnallocatedMemorandumFragment[]
  fieldArrayName: string
}

const TableBody = Table.Body
const TableRow = Table.Row
const TableCell = Table.Cell
const TableSectionHead = Table.SectionHead

const MemosListWithHeader: FC<Props> = memo(
  ({ header, memorandums, fieldArrayName }) => {
    if (memorandums.length === 0) {
      return null
    }

    return (
      <>
        <TableSectionHead data-testid={`${displayName}-header`}>
          {header}
        </TableSectionHead>
        <TableBody>
          {memorandums.map((memorandum, index) => (
            <TableRow stripeEven={Boolean(index % 2)} key={memorandum.id}>
              <TableCell>
                <FinalField
                  component={FormInputCheckbox}
                  name={fieldArrayName}
                  testId={`MemosListWithHeader-${fieldArrayName}-${index}`}
                  type='checkbox'
                  value={memorandum.id}
                />
              </TableCell>
              <TableCell data-testid={`${displayName}-id`}>
                {memorandum.number}
              </TableCell>
              <TableCell
                css={S.cellAmount}
                data-testid={`${displayName}-amount`}
              >
                <Amount amount={memorandum.amountDue} />
              </TableCell>
              <TableCell data-testid={`${displayName}-description`}>
                {memorandum.description && (
                  <TypographyOverflow>
                    {memorandum.description}
                  </TypographyOverflow>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    )
  }
)

MemosListWithHeader.displayName = displayName

export default MemosListWithHeader
