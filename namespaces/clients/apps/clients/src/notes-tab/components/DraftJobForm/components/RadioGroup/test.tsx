import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { act } from 'react-dom/test-utils'

import DraftJobFormRadioGroup from './DraftJobFormRadioGroup'

const mockSubmit = jest.fn()

const arrangeTest = () =>
  render(
    <Form initialValues={{ myname: 'value2' }} onSubmit={mockSubmit}>
      <DraftJobFormRadioGroup
        name='myname'
        options={[
          {
            label: 'mylabel1',
            value: null
          },
          {
            label: 'mylabel2',
            value: 'value2'
          }
        ]}
      />
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  )

describe('DraftJobFormRadioGroup', () => {
  beforeEach(() => {
    mockSubmit.mockReset()
  })

  it('renders radio buttons with correct labels', () => {
    arrangeTest()
    expect(screen.queryByText('mylabel1')).toBeInTheDocument()
    expect(screen.queryByText('mylabel2')).toBeInTheDocument()
  })

  it('keeps its key with null value in form data', async () => {
    arrangeTest()

    screen.getByText('mylabel1').click()
    screen.getByText('Submit').click()

    await act(() => Promise.resolve())

    expect(mockSubmit).toHaveBeenCalledWith(
      { myname: null },
      expect.anything(),
      expect.anything()
    )
  })
})
