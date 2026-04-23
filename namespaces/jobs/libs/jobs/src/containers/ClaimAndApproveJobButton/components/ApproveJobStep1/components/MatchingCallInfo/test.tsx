import React from 'react'
import { render } from '@testing-library/react'
import { useField } from '@toptal/picasso-forms'

import MatchingCallInfo from './MatchingCallInfo'

const NO_MATCHING_CALL_FIELD_ID = 'noMatchingCall'
const NO_MATCHING_CALL_COMMENT_FIELD_ID = 'noMatchingCallComment'
const MATCHING_CALL_DATE_FIELD_ID = 'matchingCallDate'
const MATCHING_CALL_TIME_FIELD_ID = 'matchingCallTime'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Input: ({ name }: { name: string }) => <div data-testid={name} />,
    TimePicker: ({ name }: { name: string }) => <div data-testid={name} />,
    Checkbox: ({ name }: { name: string }) => <div data-testid={name} />
  },
  useField: jest.fn()
}))

jest.mock('@staff-portal/forms', () => ({
  FormDatePickerWrapper: ({ name }: { name: string }) => (
    <div data-testid={name} />
  )
}))

const useFieldMock = useField as jest.Mock

const arrangeTest = (requiresMatchingCallInfo?: boolean | null) =>
  render(
    <MatchingCallInfo requiresMatchingCallInfo={requiresMatchingCallInfo} />
  )

describe('MatchingCallInfo', () => {
  beforeEach(() => {
    useFieldMock.mockReturnValue({ input: {} })
  })

  it('listens for `noMatchingCall` field changes', () => {
    arrangeTest()

    expect(useFieldMock).toHaveBeenCalledWith(NO_MATCHING_CALL_FIELD_ID)
  })

  describe('when `requiresMatchingCallInfo` is not present', () => {
    it('does not render fields', () => {
      const { queryByTestId } = arrangeTest()

      expect(queryByTestId(NO_MATCHING_CALL_FIELD_ID)).not.toBeInTheDocument()
      expect(
        queryByTestId(NO_MATCHING_CALL_COMMENT_FIELD_ID)
      ).not.toBeInTheDocument()
      expect(queryByTestId(MATCHING_CALL_DATE_FIELD_ID)).not.toBeInTheDocument()
      expect(queryByTestId(MATCHING_CALL_TIME_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `requiresMatchingCallInfo` is present', () => {
    it('renders `noMatchingCall` field', () => {
      const { getByTestId } = arrangeTest(true)

      expect(getByTestId(NO_MATCHING_CALL_FIELD_ID)).toBeInTheDocument()
    })

    describe('when `noMatchingCall` is present', () => {
      beforeEach(() => {
        useFieldMock.mockReturnValue({ input: { value: true } })
      })

      it('renders `noMatchingCallComment` field', () => {
        const { getByTestId } = arrangeTest(true)

        expect(
          getByTestId(NO_MATCHING_CALL_COMMENT_FIELD_ID)
        ).toBeInTheDocument()
      })

      it('does not render `matchingCallDate` field', () => {
        const { queryByTestId } = arrangeTest(true)

        expect(
          queryByTestId(MATCHING_CALL_DATE_FIELD_ID)
        ).not.toBeInTheDocument()
      })

      it('does not render `matchingCallTime` field', () => {
        const { queryByTestId } = arrangeTest(true)

        expect(
          queryByTestId(MATCHING_CALL_TIME_FIELD_ID)
        ).not.toBeInTheDocument()
      })
    })

    describe('when `noMatchingCall` is not present', () => {
      beforeEach(() => {
        useFieldMock.mockReturnValue({ input: { value: false } })
      })

      it('does not render `noMatchingCallComment` field', () => {
        const { queryByTestId } = arrangeTest(true)

        expect(
          queryByTestId(NO_MATCHING_CALL_COMMENT_FIELD_ID)
        ).not.toBeInTheDocument()
      })

      it('renders `matchingCallDate` field', () => {
        const { getByTestId } = arrangeTest(true)

        expect(getByTestId(MATCHING_CALL_DATE_FIELD_ID)).toBeInTheDocument()
      })

      it('renders `matchingCallTime` field', () => {
        const { getByTestId } = arrangeTest(true)

        expect(getByTestId(MATCHING_CALL_TIME_FIELD_ID)).toBeInTheDocument()
      })
    })
  })
})
