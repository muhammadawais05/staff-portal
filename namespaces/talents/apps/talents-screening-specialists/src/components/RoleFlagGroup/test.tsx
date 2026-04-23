import React from 'react'
import { render } from '@testing-library/react'
import { FlagColor } from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'
import { RoleFlagFragment } from '@staff-portal/role-flags'
import {
  createRoleFlagMock,
  DEFAULT_FLAG_ATTRIBUTES
} from '@staff-portal/role-flags/src/mocks'

import RoleFlagGroup from './RoleFlagGroup'

const createFlag = (attributes = {}) =>
  createRoleFlagMock({
    flag: {
      ...DEFAULT_FLAG_ATTRIBUTES,
      ...attributes
    }
  })

const arrangeTest = ({
  roleFlags,
  maxLineLength
}: {
  roleFlags: RoleFlagFragment[]
  maxLineLength: number
}) =>
  render(
    <TestWrapper>
      <RoleFlagGroup roleFlags={roleFlags} maxLineLength={maxLineLength} />
    </TestWrapper>
  )

describe('RoleFlagGroup', () => {
  describe('when there is enough space for all flags', () => {
    it('displays main flags without additional flags', () => {
      const vipFlag = createFlag({ title: 'VIP' })
      const uiFlag = createFlag({ title: 'UI' })

      const { getByText, queryByTestId } = arrangeTest({
        roleFlags: [vipFlag, uiFlag],
        maxLineLength: 5
      })

      expect(getByText('VIP')).toBeInTheDocument()
      expect(getByText('UI')).toBeInTheDocument()
      expect(queryByTestId('additional-flags')).not.toBeInTheDocument()
    })
  })

  describe('when there is not enough space for all flags', () => {
    it('displays main flags in text', () => {
      const vipFlag = createFlag({ title: 'VIP' })
      const uiFlag = createFlag({ title: 'UI' })
      const firstLongFlag = createFlag({ title: 'Onboarding' })
      const secondLongFlag = createFlag({ title: 'Reset Steps' })

      const { getByText } = arrangeTest({
        roleFlags: [vipFlag, uiFlag, firstLongFlag, secondLongFlag],
        maxLineLength: 5
      })

      expect(getByText('VIP')).toBeInTheDocument()
      expect(getByText('UI')).toBeInTheDocument()
    })

    it('displays additional flag titles in the tooltip(+N)', () => {
      const vipFlag = createFlag({ title: 'VIP' })
      const uiFlag = createFlag({ title: 'UI' })
      const firstLongFlag = createFlag({ title: 'Onboarding' })
      const secondLongFlag = createFlag({ title: 'Reset Steps' })

      const { getByText } = arrangeTest({
        roleFlags: [vipFlag, uiFlag, firstLongFlag, secondLongFlag],
        maxLineLength: 5
      })

      const additionalFlagsTooltip = getByText('+2')

      assertOnTooltipText(additionalFlagsTooltip, 'Onboarding, Reset Steps')
    })

    it('displays important(colored) flags first and hides less important into the tooltip', () => {
      const notImportantFlag = createFlag({
        title: 'Not important',
        color: null
      })
      const importantFlag = createFlag({
        title: 'Important',
        color: FlagColor.GREEN
      })

      const { getByText } = arrangeTest({
        roleFlags: [notImportantFlag, importantFlag],
        maxLineLength: 10
      })

      const additionalFlagsTooltip = getByText('+1')

      expect(getByText('Important')).toBeInTheDocument()
      assertOnTooltipText(additionalFlagsTooltip, 'Not important')
    })

    it('displays shorter flags first', () => {
      const importantFlag = createFlag({
        title: 'Long flag'
      })

      const shortFlag = createFlag({
        title: 'Short'
      })

      const { getByText } = arrangeTest({
        roleFlags: [shortFlag, importantFlag],
        maxLineLength: 10
      })

      const additionalFlagsTooltip = getByText('+1')

      expect(getByText('Short')).toBeInTheDocument()
      assertOnTooltipText(additionalFlagsTooltip, 'Long flag')
    })
  })
})
