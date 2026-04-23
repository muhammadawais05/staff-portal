import { act, renderHook } from '@testing-library/react-hooks'
import React, { SyntheticEvent } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'

import {
  CommercialDocumentType,
  getTooltipContent,
  getDocumentStatusText,
  useCommercialDocumentCreditedMessage,
  useCommercialDocumentDebitedMessage,
  useCommercialDocumentIssueMessage,
  useListTableRowExpandState
} from '.'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (...args: (string | object)[]) => args
  })
}))

describe('#getDocumentStatusText', () => {
  describe('when status is Disputed and actionDueOn is set', () => {
    it('return disputedDueOn translated string', () => {
      expect(
        getDocumentStatusText({
          actionDueOn: '2020-02-20',
          status: DocumentStatus.DISPUTED
        })
      ).toBe('Disputed')

      expect(
        getDocumentStatusText(
          {
            actionDueOn: '2020-02-20',
            status: DocumentStatus.DISPUTED
          },
          { withDate: true }
        )
      ).toBe('Disputed due Feb 20, 2020')
    })
  })

  describe('when status is NOT Disputed and actionDueOn is set', () => {
    it('return translated status string', () => {
      expect(
        getDocumentStatusText({
          actionDueOn: '2020-02-20',
          status: DocumentStatus.OUTSTANDING
        })
      ).toBe('Outstanding')

      expect(
        getDocumentStatusText(
          {
            actionDueOn: '2020-02-20',
            status: DocumentStatus.OUTSTANDING
          },
          { withDate: true }
        )
      ).toBe('Outstanding')
    })
  })

  describe('when actionDueOn is NOT set', () => {
    it('return translated status string', () => {
      expect(
        getDocumentStatusText({
          status: DocumentStatus.PAID
        })
      ).toBe('Paid')
    })
  })
})

describe('#useCommercialDocumentCreditedMessage', () => {
  it('works properly', () => {
    expect(
      useCommercialDocumentCreditedMessage({
        creditedAmount: '123'
      })
    ).toEqual(['table.row.credited', { amount: '$123.00' }])

    expect(
      useCommercialDocumentCreditedMessage({
        creditedAmount: '0'
      })
    ).toBeUndefined()

    expect(
      useCommercialDocumentCreditedMessage({
        creditedAmount: '-1'
      })
    ).toBeUndefined()
  })
})

describe('#useCommercialDocumentDebitedMessage', () => {
  it('works properly', () => {
    expect(
      useCommercialDocumentDebitedMessage({
        debitedAmount: '123'
      })
    ).toEqual(['table.row.debited', { amount: '$123.00' }])

    expect(
      useCommercialDocumentDebitedMessage({
        debitedAmount: '0'
      })
    ).toBeUndefined()

    expect(
      useCommercialDocumentDebitedMessage({
        debitedAmount: '-1'
      })
    ).toBeUndefined()
  })
})

describe('#useCommercialDocumentIssueMessage', () => {
  it('works properly', () => {
    expect(
      useCommercialDocumentIssueMessage({
        issueDate: '2020-09-28'
      })
    ).toBe('Sep 28, 2020')

    expect(useCommercialDocumentIssueMessage({})).toBeUndefined()
  })
})

describe('#useListTableExpandState', () => {
  it('works properly', async () => {
    let state: unknown = {}
    const stateSetter = jest.fn().mockImplementation((fn: Function) => {
      state = Object.assign(state, fn(state))
    })

    jest.spyOn(React, 'useState').mockImplementation(() => [state, stateSetter])

    const rowId = 'test'

    const { result } = renderHook(() => useListTableRowExpandState())

    const { isExpanded, handleOnExpandClick } = result.current

    expect(isExpanded(rowId)).toBeFalsy()

    act(() =>
      handleOnExpandClick({ currentTarget: { value: rowId } } as SyntheticEvent<
        HTMLButtonElement,
        Event
      >)
    )

    expect(isExpanded(rowId)).toBeTruthy()

    act(() =>
      handleOnExpandClick({ currentTarget: { value: rowId } } as SyntheticEvent<
        HTMLButtonElement,
        Event
      >)
    )

    expect(isExpanded(rowId)).toBeFalsy()
  })
})

describe('#getTooltipContent', () => {
  describe('commercialDocument is a `payment` && has status of `ON_HOLD`', () => {
    it('returns `paymentsHoldDescription`', () => {
      const paymentsHoldDescription = 'Tooltip content from hold description'
      const statusComment = 'Tooltip content from hold description'

      const actual = getTooltipContent({
        document: {
          subjectObject: { paymentsHoldDescription },
          status: DocumentStatus.ON_HOLD,
          statusComment
        },
        nodeType: CommercialDocumentType.payment
      })

      expect(actual).toEqual(paymentsHoldDescription)
    })
  })

  it('returns `statusComment` as a default option', () => {
    const paymentsHoldDescription = 'Tooltip content from hold description'
    const statusComment = 'Tooltip content from hold description'
    const actual = getTooltipContent({
      document: {
        subjectObject: { paymentsHoldDescription },
        status: DocumentStatus.DISPUTED,
        statusComment
      },
      nodeType: CommercialDocumentType.payment
    })

    expect(actual).toEqual(statusComment)
  })
})
