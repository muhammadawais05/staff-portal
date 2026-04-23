import { act, renderHook, HookResult } from '@testing-library/react-hooks'
import { MemorandumBalance } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'

import { useUpdateComment } from './useUpdateComment'

jest.mock('@staff-portal/billing/src/_lib/customHooks/useConfirmations')
jest.mock('@staff-portal/billing/src/_lib/context/externalIntegratorContext')
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (...args: (string | object)[]) => args
  })
}))

describe('useUpdateComment', () => {
  let MockOnOpenConfirmation: jest.Mock
  let MockModalContainer: jest.Mock
  let mockedFormChangeHandler: jest.Mock
  let result: HookResult<
    (commentBalanceType?: MemorandumBalance, commentCategoryId?: string) => void
  >
  const categoryId = 'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTE1'

  beforeEach(() => {
    MockOnOpenConfirmation = jest.fn()
    MockModalContainer = jest.fn()
    ;(useConfirmations as jest.Mock).mockImplementation(() => ({
      handleOnOpenConfirmation: MockOnOpenConfirmation
    }))
    ;(useExternalIntegratorContext as jest.Mock).mockImplementation(() => ({
      modalContainer: MockModalContainer
    }))
  })

  describe.each([
    [
      'The start date of the engagement with {talent} on {job} was updated from {old_engagement_start_date} to {new_engagement_start_date}. This resulted in an additional charge of {working_period}.',
      'The start date of the engagement with Bertie Davis on Job title was updated from {old_engagement_start_date} to {new_engagement_start_date}. This resulted in an additional charge of {working_period}.'
    ],
    [
      'The end date of the engagement with {talent} on {job} was updated from {old_engagement_end_date} to {new_engagement_end_date}. This resulted in an additional charge of {working_period}.',
      'The end date of the engagement with Bertie Davis on Job title was updated from {old_engagement_end_date} to {new_engagement_end_date}. This resulted in an additional charge of {working_period}.'
    ],
    [
      'The engagement with {talent} on {job} was closed on {engagement_end_date}. This resulted in a credit of {working_period} that has been applied to invoice #{invoice_id}.',
      'The engagement with Bertie Davis on Job title was closed on February 6, 2020. This resulted in a credit of {working_period} that has been applied to invoice #377249.'
    ],
    [
      'The {weekly_or_hourly} rate on the engagement with {client} on {job} was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.',
      'The weekly rate on the engagement with Some company on Job title was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.'
    ],
    [
      'The {weekly_or_hourly} rate on the engagement with {talent} for {job} was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.',
      'The weekly rate on the engagement with Bertie Davis for Job title was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.'
    ],
    [
      'The engagement with {talent} for {job} was updated from {old_commitment} to {new_commitment}. This resulted in an additional charge of {working_period} during the period from {date_from} to {date_to} that was applied to invoice #{invoice_id}.',
      'The engagement with Bertie Davis for Job title was updated from {old_commitment} to {new_commitment}. This resulted in an additional charge of {working_period} during the period from {date_from} to {date_to} that was applied to invoice #377249.'
    ],
    [
      'The trial period on the engagement with {talent} on {job} was rejected. This resulted in a credit of {working_period} that has been applied to invoice #{invoice_id}.',
      'The trial period on the engagement with Bertie Davis on Job title was rejected. This resulted in a credit of {working_period} that has been applied to invoice #377249.'
    ],
    [
      'The trial period on the engagement with {talent} on {job} was failed. This resulted in a credit of {working_period} that has been applied to invoice #{invoice_id}.',
      'The trial period on the engagement with Bertie Davis on Job title was failed. This resulted in a credit of {working_period} that has been applied to invoice #377249.'
    ],
    [
      'The hours worked during the billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} were reversed. This resulted in a credit of {working_period} that was applied to invoice #{invoice_id}.',
      'The hours worked during the billing period from July 21, 2020 to July 21, 2021 on the engagement with Bertie Davis for Job title were reversed. This resulted in a credit of {working_period} that was applied to invoice #377249.'
    ],
    [
      'A break from {break_from} to {break_to} on the engagement with {talent} for {job} was added to the billing period from {billing_date_from} to {billing_date_to}. This resulted in a credit of {working_period}.that was applied to invoice #{invoice_id}.',
      'A break from {break_from} to {break_to} on the engagement with Bertie Davis for Job title was added to the billing period from July 21, 2020 to July 21, 2021. This resulted in a credit of {working_period}.that was applied to invoice #377249.'
    ],
    [
      'The break during the billing period from {billing_date_from} to {billing_date_to} on the engagement with {talent} for {job} was updated from {old_break_from} - {old_break_to} to {new_break_from} - {new_break_to}. This resulted in a credit of {working_period} that was applied to invoice #{invoice_id}.',
      'The break during the billing period from July 21, 2020 to July 21, 2021 on the engagement with Bertie Davis for Job title was updated from {old_break_from} - {old_break_to} to {new_break_from} - {new_break_to}. This resulted in a credit of {working_period} that was applied to invoice #377249.'
    ],
    [
      'Debit memo issued for the talent payment as {payer_name} will be paying {talent} directly.',
      'Debit memo issued for the talent payment as {payer_name} will be paying Bertie Davis directly.'
    ],
    [
      'Adjustment for the monthly rebate of {rebate_per_hour} per hour. {hours_billed} hours billed.',
      'Adjustment for the monthly rebate of {rebate_per_hour} per hour. {hours_billed} hours billed.'
    ]
  ])('proper templates resolution', (template = '', comment = '') => {
    beforeEach(() => {
      mockedFormChangeHandler = jest.fn()
      ;({ result } = renderHook(() =>
        useUpdateComment({
          form: {
            change: mockedFormChangeHandler,
            getFieldState: jest.fn(),
            resetFieldState: jest.fn()
          },
          document: fixtures.MockInvoice,
          memorandumCategories: [
            {
              __typename: 'MemorandumCategory',
              debit: template,
              id: categoryId
            }
          ]
        })
      ))
    })

    it('fills comment template with appropriate values', () => {
      act(() => result.current(MemorandumBalance.DEBIT, categoryId))

      expect(mockedFormChangeHandler).toHaveBeenCalledWith('comment', comment)
    })
  })

  describe('when the document is payment', () => {
    beforeEach(() => {
      mockedFormChangeHandler = jest.fn()
      ;({ result } = renderHook(() =>
        useUpdateComment({
          form: {
            change: mockedFormChangeHandler,
            getFieldState: jest.fn(),
            resetFieldState: jest.fn()
          },
          document: fixtures.MockPayment,
          memorandumCategories: [
            {
              __typename: 'MemorandumCategory',
              credit:
                'The start date of the engagement with {client} on {job} was updated from {old_engagement_start_date} to {new_engagement_start_date}. This resulted in a credit of {working_period} that has been applied to payment #{payment_id}.',
              debit:
                'The start date of the engagement with {client} on {job} was updated from {old_engagement_start_date} to {new_engagement_start_date}. This resulted in a payment reduction of {working_period}.',
              id: categoryId,
              name: 'Start date'
            }
          ]
        })
      ))
    })

    it('fills comment template with appropriate {client} token value', () => {
      act(() => result.current(MemorandumBalance.DEBIT, categoryId))

      expect(mockedFormChangeHandler).toHaveBeenCalledWith(
        'comment',
        'The start date of the engagement with Baumbach-Willms UK on {job} was updated from {old_engagement_start_date} to {new_engagement_start_date}. This resulted in a payment reduction of {working_period}.'
      )
    })
  })

  describe('when the document is invoice', () => {
    beforeEach(() => {
      mockedFormChangeHandler = jest.fn()
      ;({ result } = renderHook(() =>
        useUpdateComment({
          form: {
            change: mockedFormChangeHandler,
            getFieldState: jest.fn(),
            resetFieldState: jest.fn()
          },
          document: fixtures.MockPayment,
          memorandumCategories: [
            {
              __typename: 'MemorandumCategory',
              credit:
                'The {weekly_or_hourly} rate on the engagement with {client} on {job} was updated from {old_rate} to {new_rate}. This resulted in a credit of {working_period} during the period from {date_from} to {date_to}',
              debit:
                'The {weekly_or_hourly} rate on the engagement with {client} on {job} was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.',
              id: categoryId,
              name: 'Talent rate'
            }
          ]
        })
      ))
    })

    it('fills comment template with appropriate {client} token value', () => {
      act(() => result.current(MemorandumBalance.DEBIT, categoryId))

      expect(mockedFormChangeHandler).toHaveBeenCalledWith(
        'comment',
        'The weekly rate on the engagement with Baumbach-Willms UK on {job} was updated from {old_rate} to {new_rate}. This resulted in a debit of {working_period} during the period from {date_from} to {date_to}.'
      )
    })
  })

  it('opens valid confirmation', () => {
    ;({ result } = renderHook(() =>
      useUpdateComment({
        form: {
          change: jest.fn(),
          getFieldState: jest.fn().mockReturnValue({ modified: true }),
          resetFieldState: jest.fn()
        },
        document: fixtures.MockInvoice,
        memorandumCategories: fixtures.MockMemorandumCategories.nodes
      })
    ))

    expect(result.current).toBeInstanceOf(Function)

    act(() =>
      result.current(
        MemorandumBalance.DEBIT,
        'VjEtTWVtb3JhbmR1bUNhdGVnb3J5LTE1'
      )
    )

    expect(MockOnOpenConfirmation).toHaveBeenCalledWith({
      description: ['addModal.confirmOverride.message'],
      onSuccess: expect.any(Function),
      actionTitle: ['addModal.confirmOverride.submitText'],
      title: ['addModal.confirmOverride.title']
    })
  })

  it('returns callback if no document specified', () => {
    ;({ result } = renderHook(() =>
      useUpdateComment({
        form: {
          change: jest.fn(),
          getFieldState: jest.fn().mockReturnValue({ modified: true }),
          resetFieldState: jest.fn()
        }
      })
    ))

    expect(result.current).toBeInstanceOf(Function)
  })
})
