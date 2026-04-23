import { render, screen } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import { Table } from '@toptal/picasso'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import SelectableTableHeaderCheckboxCell from './'

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <Table>
          <Table.Head>
            <Table.Row>
              <SelectableTableHeaderCheckboxCell
                fieldName='invoiceIds'
                data-testid='example-cell'
                selectableIds={['a', 'b', 'c']}
              />
            </Table.Row>
          </Table.Head>
        </Table>
      </Form>
    </TestWrapper>
  )
}

describe('SelectableTableHeaderCheckboxCell', () => {
  it('renders properly', () => {
    arrangeTest()

    expect(screen.getByTestId('example-cell')).toBeInTheDocument()
    expect(screen.getByTestId('example-cell-checkbox-all')).toBeInTheDocument()
  })
})
