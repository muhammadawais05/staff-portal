import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { OperationCallableTypes, Scalars } from '@staff-portal/graphql/staff'
import { MockedResponse, gql, useQuery } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import ReapplicationDateField from './ReapplicationDateField'
import {
  createUpdateTalentReapplicationDateFailedMock,
  createUpdateTalentReapplicationDateMock
} from './data/update-talent-reapplication-date/mocks'
import {
  createResetTalentReapplicationDateFailedMock,
  createResetTalentReapplicationDateMock
} from './data/reset-talent-reapplication-date/mocks'

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

jest.unmock('@staff-portal/editable')

const TEST_QUERY = gql`
  query GetTalent {
    talent {
      id
      reapplicationDate
    }
  }
`
const createGetTalentMock = ({
  talentId,
  reapplicationDate
}: {
  talentId: string
  reapplicationDate: string
}) => ({
  request: { query: TEST_QUERY },
  result: {
    data: {
      talent: { id: talentId, reapplicationDate, __typename: 'Talent' },
      __typename: 'Query'
    }
  }
})

const TestComponent = ({ talentId }: { talentId: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, loading } = useQuery<{ talent: any }>(TEST_QUERY)

  return (
    <>
      {!loading && data && (
        <ReapplicationDateField
          talentId={talentId}
          date={data.talent.reapplicationDate}
          operation={{
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }}
        />
      )}
    </>
  )
}

const arrangeTest = (talentId: string, mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestComponent talentId={talentId} />
    </TestWrapperWithMocks>
  )

const TestDisabledComponent = ({
  talentId,
  errorMessage
}: {
  talentId: string
  errorMessage: string
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, loading } = useQuery<{ talent: any }>(TEST_QUERY)

  return (
    <>
      {!loading && data && (
        <ReapplicationDateField
          talentId={talentId}
          date={data.talent.reapplicationDate}
          operation={{
            callable: OperationCallableTypes.DISABLED,
            messages: [errorMessage]
          }}
        />
      )}
    </>
  )
}

const arrangeTestWithDisabledComponent = (
  talentId: string,
  errorMessage: string,
  mocks: MockedResponse[]
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestDisabledComponent talentId={talentId} errorMessage={errorMessage} />
    </TestWrapperWithMocks>
  )

describe('ReapplicationDateField', () => {
  it('updates reapplication date field', async () => {
    const nextYear = new Date().getFullYear() + 1
    const TALENT_ID = 'abc123'
    const INITIAL_REAPPLICATION_DATE: Scalars['Date'] = `${nextYear}-01-14`
    const NEW_REAPPLICATION_DATE: Scalars['Date'] = `${nextYear}-01-15`

    arrangeTest(TALENT_ID, [
      createGetTalentMock({
        talentId: TALENT_ID,
        reapplicationDate: INITIAL_REAPPLICATION_DATE
      }),
      createUpdateTalentReapplicationDateMock({
        talentId: TALENT_ID,
        reapplicationDate: NEW_REAPPLICATION_DATE
      })
    ])

    await screen.findByText(`Jan 14, ${nextYear}`)
    fireEvent.click(screen.getByTestId('edit-button'))
    const selectedCalendarDay = '15'

    fireEvent.click(screen.getByText(selectedCalendarDay))

    userEvent.type(screen.getByRole('textbox'), '{esc}')

    await waitFor(() => {
      expect(screen.getByText(`Jan 15, ${nextYear}`)).toBeInTheDocument()
      expect(screen.getByTestId('edit-button')).toBeInTheDocument()
    })
  })

  it('resets reapplication date field', async () => {
    const nextYear = new Date().getFullYear() + 1
    const TALENT_ID = 'abc456'
    const INITIAL_REAPPLICATION_DATE = `${nextYear}-01-14`

    arrangeTest(TALENT_ID, [
      createGetTalentMock({
        talentId: TALENT_ID,
        reapplicationDate: INITIAL_REAPPLICATION_DATE
      }),
      createResetTalentReapplicationDateMock({
        talentId: TALENT_ID
      })
    ])

    await screen.findByText(`Jan 14, ${nextYear}`)
    fireEvent.click(screen.getByTestId('edit-button'))

    // Workaround to get child Reset button
    fireEvent.click(screen.getByTestId('reset-adornment').childNodes[0])

    userEvent.type(screen.getByRole('textbox'), '{esc}')

    await waitFor(() => {
      expect(screen.getByText('—')).toBeInTheDocument()
      expect(screen.getByTestId('edit-button')).toBeInTheDocument()
    })
  })

  describe('when update reapplication date request fails', () => {
    it('shows error notification', async () => {
      const nextYear = new Date().getFullYear() + 1
      const TALENT_ID = 'abc456'
      const INITIAL_REAPPLICATION_DATE = `${nextYear}-02-14`
      const NEW_REAPPLICATION_DATE = `${nextYear}-02-15`

      arrangeTest(TALENT_ID, [
        createGetTalentMock({
          talentId: TALENT_ID,
          reapplicationDate: INITIAL_REAPPLICATION_DATE
        }),
        createUpdateTalentReapplicationDateFailedMock({
          talentId: TALENT_ID,
          reapplicationDate: NEW_REAPPLICATION_DATE
        })
      ])

      await screen.findByText(`Feb 14, ${nextYear}`)
      fireEvent.click(screen.getByTestId('edit-button'))
      const selectedCalendarDay = '15'

      fireEvent.click(screen.getByText(selectedCalendarDay))

      userEvent.type(screen.getByRole('textbox'), '{esc}')

      await waitFor(() => {
        expect(
          screen.getByText('Unable to update reapplication date.')
        ).toBeInTheDocument()
        expect(screen.getByText(`Feb 14, ${nextYear}`)).toBeInTheDocument()
        expect(screen.getByTestId('edit-button')).toBeInTheDocument()
      })
    })
  })

  describe('when reset reapplication date request fails', () => {
    it('shows error notification', async () => {
      const nextYear = new Date().getFullYear() + 1
      const TALENT_ID = 'abc456'
      const INITIAL_REAPPLICATION_DATE = `${nextYear}-02-14`

      arrangeTest(TALENT_ID, [
        createGetTalentMock({
          talentId: TALENT_ID,
          reapplicationDate: INITIAL_REAPPLICATION_DATE
        }),
        createResetTalentReapplicationDateFailedMock({
          talentId: TALENT_ID
        })
      ])

      await screen.findByText(`Feb 14, ${nextYear}`)
      fireEvent.click(screen.getByTestId('edit-button'))

      // Workaround to get child Reset button
      fireEvent.click(screen.getByTestId('reset-adornment').childNodes[0])

      userEvent.type(screen.getByRole('textbox'), '{esc}')

      await waitFor(() => {
        expect(
          screen.getByText('Unable to update reapplication date.')
        ).toBeInTheDocument()
        expect(screen.getByText(`Feb 14, ${nextYear}`)).toBeInTheDocument()
        expect(screen.getByTestId('edit-button')).toBeInTheDocument()
      })
    })
  })

  describe('when operation is disabled', () => {
    it('shows tooltip with error message', async () => {
      const errorMessage = 'This operation is disabled.'
      const talentId = '123'
      const nextYear = new Date().getFullYear() + 1
      const reapplicationDate = `${nextYear}-02-14`

      arrangeTestWithDisabledComponent(talentId, errorMessage, [
        createGetTalentMock({
          talentId: talentId,
          reapplicationDate: reapplicationDate
        })
      ])

      await screen.findByText(`Feb 14, ${nextYear}`)
      userEvent.hover(screen.getByTestId('ReapplicationDate-tooltip'))
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
      })
    })
  })
})
