import { PlaybookTemplateDateRuleUnit } from '@staff-portal/graphql/staff'

import { dueDateFormat, recurringFormat } from './utils'

describe('utils', () => {
  describe('recurringFormat', () => {
    it('gets the message for 1 day', () => {
      expect(recurringFormat({ recurring: 1 })).toBe('Every day')
    })

    it('gets the message for more than one day', () => {
      expect(recurringFormat({ recurring: 3 })).toBe('Every 3 days')
    })
  })

  describe('dueDateFormat', () => {
    it('gets the messages for due date amount 0', () => {
      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.DAYS,
          dueDateRuleAmount: 0
        })
      ).toBe('Today')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAYS,
          dueDateRuleAmount: 0
        })
      ).toBe('Today or next business day')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAY_AFTER_DAYS,
          dueDateRuleAmount: 0
        })
      ).toBe('Today or next business day')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.BUSINESS_DAYS,
          dueDateRuleAmount: 0
        })
      ).toBe('Today or next business day')
    })

    it('gets the messages for due date amount 1', () => {
      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.DAYS,
          dueDateRuleAmount: 1
        })
      ).toBe('In 1 day')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAYS,
          dueDateRuleAmount: 1
        })
      ).toBe('In 1 working day')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAY_AFTER_DAYS,
          dueDateRuleAmount: 1
        })
      ).toBe('Workday after 1 day')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.BUSINESS_DAYS,
          dueDateRuleAmount: 1
        })
      ).toBe('In 1 business day')
    })

    it('gets the messages for due date amount more than 1', () => {
      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.DAYS,
          dueDateRuleAmount: 3
        })
      ).toBe('In 3 days')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAYS,
          dueDateRuleAmount: 3
        })
      ).toBe('In 3 working days')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.WORKDAY_AFTER_DAYS,
          dueDateRuleAmount: 3
        })
      ).toBe('Workday after 3 days')

      expect(
        dueDateFormat({
          dueDateRuleUnit: PlaybookTemplateDateRuleUnit.BUSINESS_DAYS,
          dueDateRuleAmount: 3
        })
      ).toBe('In 3 business days')
    })
  })
})
