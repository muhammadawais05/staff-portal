import { Table } from '@toptal/picasso'
import { Form, FormSpy, OnChange } from '@toptal/picasso-forms'
import React, { FC, memo } from 'react'
import { CSSProp } from 'styled-components'

import * as S from './styles'

interface Props {
  /** All possible ids in an array format */
  selectableIds: string[]
  /** react-final-form field name of the selectable field */
  fieldName: string
  /** Styled component styles applied to Cell element */
  style?: CSSProp
  'data-testid'?: string
  disabled?: boolean
}

const SelectableTableHeaderCheckboxCell: FC<Props> = memo(
  ({
    fieldName,
    style,
    'data-testid': dataTestId = 'SelectableTableHeaderCheckboxCell',
    disabled = false,
    selectableIds
  }) => {
    return (
      <Table.Cell css={[S.checkbox, style]} data-testid={dataTestId}>
        <>
          <Form.Checkbox
            name='isEverythingSelected'
            data-testid={`${dataTestId}-checkbox-all`}
            disabled={disabled}
          />
          <FormSpy subscription={{ pristine: true }}>
            {({ form: { change } }) => (
              <OnChange name='isEverythingSelected'>
                {(value: boolean) =>
                  change(fieldName, value ? selectableIds : [])
                }
              </OnChange>
            )}
          </FormSpy>
        </>
      </Table.Cell>
    )
  }
)

export default SelectableTableHeaderCheckboxCell
