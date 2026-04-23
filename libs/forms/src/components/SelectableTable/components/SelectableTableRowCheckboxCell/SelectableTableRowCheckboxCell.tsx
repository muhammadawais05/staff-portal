import { Form } from '@toptal/picasso-forms'
import { Table } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { CSSProp } from 'styled-components'

interface Props {
  /** Styled component styles applied to Cell element */
  style?: CSSProp
  /** react-final-form field name of the selectable field */
  fieldName: string
  /** Item's unique identifier */
  id: string
  'data-testid'?: string
  disabled?: boolean
}

const SelectableTableRowCheckboxCell: FC<Props> = memo(
  ({
    fieldName,
    id,
    style,
    'data-testid': dataTestId = 'SelectableTableRow',
    disabled = false
  }) => {
    return (
      <Table.Cell css={style} data-testid={dataTestId}>
        <Form.CheckboxGroup name={fieldName}>
          <Form.Checkbox
            name={fieldName}
            data-testid={`${dataTestId}__checkbox-${id}`}
            value={id}
            disabled={disabled}
          />
        </Form.CheckboxGroup>
      </Table.Cell>
    )
  }
)

export default SelectableTableRowCheckboxCell
