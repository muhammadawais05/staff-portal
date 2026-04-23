import { render, screen } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import { Table } from '@toptal/picasso'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import SelectableTableRowCheckboxCell from './'

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <Table>
          <Table.Body>
            <Table.Row>
              <SelectableTableRowCheckboxCell
                fieldName='invoiceIds'
                id='abc123'
                data-testid='example-cell'
              />
            </Table.Row>
          </Table.Body>
        </Table>
      </Form>
    </TestWrapper>
  )
}

describe('SelectableTableRowCheckboxCell', () => {
  it('renders properly', () => {
    arrangeTest()

    expect(screen.getByTestId('example-cell')).toBeInTheDocument()
    expect(
      screen.getByTestId('example-cell__checkbox-abc123')
    ).toBeInTheDocument()
  })
})
