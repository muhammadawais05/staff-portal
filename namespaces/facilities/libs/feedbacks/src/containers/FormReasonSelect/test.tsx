import { render } from '@testing-library/react'
import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { FeedbackReasonActions } from '@staff-portal/graphql/staff'

import { useGetFeedbackReasons } from './data'
import FormReasonSelect from './FormReasonSelect'
import { GetFeedbackReasonsQuery } from './data/get-feedback-reasons/get-feedback-reasons.staff.gql.types'

jest.mock('./data', () => ({
  __esModule: true,
  useGetFeedbackReasons: jest.fn()
}))

jest.mock('@toptal/picasso-forms', () => ({
  __esModule: true,
  Form: { Select: jest.fn() },
  useField: jest.fn()
}))

interface TestOptionsType {
  data: GetFeedbackReasonsQuery['feedbackReasons']['nodes']
  loading?: boolean
  grouped?: boolean
}

const arrangeTest = ({ grouped = false, ...mockedData }: TestOptionsType) => {
  const mockedSelect = Form.Select as unknown as jest.Mock
  const mockedUseField = useField as unknown as jest.Mock
  const mockedUseGetFeedbackReasons = useGetFeedbackReasons as jest.Mock

  mockedSelect.mockImplementation(jest.fn(() => null))
  mockedUseGetFeedbackReasons.mockReturnValue({ loading: false, ...mockedData })
  mockedUseField.mockReturnValue({ input: { value: undefined } })

  return render(
    <FormReasonSelect
      action={FeedbackReasonActions.JOB_CANCELLED}
      name='myField'
      label='My Field'
      grouped={grouped}
    />
  )
}

describe('FormReasonSelect', () => {
  it('renders select with correct data', () => {
    arrangeTest({
      data: [{ id: '1', identifier: 'reason-1', name: 'Reason 1', group: null }]
    })

    expect(Form.Select).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'My Field',
        loading: false,
        name: 'myField',
        noOptionsText: 'No results',
        options: [{ value: '1', identifier: 'reason-1', text: 'Reason 1' }]
      }),
      {}
    )
  })

  describe('when loading', () => {
    it('renders loading select', () => {
      arrangeTest({ data: [], loading: true })

      expect(Form.Select).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'My Field',
          loading: true,
          name: 'myField',
          noOptionsText: 'No results',
          options: []
        }),
        {}
      )
    })
  })

  describe('with grouped reasons', () => {
    it('renders select with grouped data', () => {
      const data = [
        {
          id: '1',
          identifier: 'reason-1',
          name: 'Reason 1',
          group: { id: 'g1', name: 'Group 1' }
        },
        {
          id: '2',
          identifier: 'reason-2',
          name: 'Reason 2',
          group: { id: 'g1', name: 'Group 1' }
        },
        {
          id: '3',
          identifier: 'reason-3',
          name: 'Reason 3',
          group: { id: 'g2', name: 'Group 2' }
        },
        {
          id: '4',
          identifier: 'reason-4',
          name: 'Reason 4',
          group: { id: 'g2', name: 'Group 2' }
        },
        { id: 'g1', identifier: 'g1', name: 'Group 1', group: null },
        { id: 'g2', identifier: 'g2', name: 'Group 2', group: null }
      ]

      arrangeTest({ data, grouped: true })

      expect(Form.Select).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'My Field',
          loading: false,
          name: 'myField',
          noOptionsText: 'No results',
          options: {
            'Group 1': [
              { value: '1', text: 'Reason 1' },
              { value: '2', text: 'Reason 2' }
            ],
            'Group 2': [
              { value: '3', text: 'Reason 3' },
              { value: '4', text: 'Reason 4' }
            ]
          }
        }),
        {}
      )
    })
  })
})
