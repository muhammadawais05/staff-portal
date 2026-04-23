import React, { PropsWithChildren, ReactNode } from 'react'
import { render } from '@testing-library/react'

import LongShotReasons from './LongShotReasons'

const LONG_SHOT_REASONS_FIELD_ID = 'longshotReasons'
const REASON_ID = 'REASON_ID'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    CheckboxGroup: ({
      name,
      children
    }: PropsWithChildren<{ name: string }>) => (
      <div data-testid={name}>{children}</div>
    ),
    Checkbox: ({ label, value }: { label: ReactNode; value: string }) => (
      <div data-testid={`${REASON_ID}-${value}`}>{label}</div>
    )
  }
}))

const arrangeTest = (jobLongshotReasons: string[]) =>
  render(<LongShotReasons jobLongshotReasons={jobLongshotReasons} />)

describe('LongShotReasons', () => {
  describe('when `jobLongshotReasons` is empty', () => {
    it('does not render `longshotReasons` field', () => {
      const { queryByTestId } = arrangeTest([])

      expect(queryByTestId(LONG_SHOT_REASONS_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `jobLongshotReasons` is not empty', () => {
    it('renders `longshotReasons` field', () => {
      const reason1 = 'reason1'
      const reason2 = 'reason2'
      const { getByTestId } = arrangeTest([reason1, reason2])

      expect(getByTestId(LONG_SHOT_REASONS_FIELD_ID)).toBeInTheDocument()
      expect(getByTestId(`${REASON_ID}-${reason1}`)).toBeInTheDocument()
      expect(getByTestId(`${REASON_ID}-${reason1}`)).toHaveTextContent(reason1)
      expect(getByTestId(`${REASON_ID}-${reason2}`)).toBeInTheDocument()
      expect(getByTestId(`${REASON_ID}-${reason2}`)).toHaveTextContent(reason2)
    })
  })
})
