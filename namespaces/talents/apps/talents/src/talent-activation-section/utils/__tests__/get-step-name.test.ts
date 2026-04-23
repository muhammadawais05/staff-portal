import { StepType } from '@staff-portal/graphql/staff'

import { getStepName } from '../get-step-name'

describe('getStepName', () => {
  it('returns Platform Agreement name', () => {
    expect(getStepName(StepType.TALENT_AGREEMENT)).toMatchInlineSnapshot(
      `"Platform Agreement"`
    )
  })

  it('returns Toptal Training name', () => {
    expect(getStepName(StepType.TOPTAL_TRAINING)).toMatchInlineSnapshot(
      `"Toptal Training"`
    )
  })

  it('returns Profile Creation name', () => {
    expect(getStepName(StepType.PROFILE_CREATION)).toMatchInlineSnapshot(
      `"Profile Creation"`
    )
  })

  it('returns Profile Changes name', () => {
    expect(getStepName(StepType.PROFILE_CHANGES)).toMatchInlineSnapshot(
      `"Profile Changes"`
    )
  })

  it('returns Profile Approval name', () => {
    expect(getStepName(StepType.PROFILE_APPROVE)).toMatchInlineSnapshot(
      `"Profile Approval"`
    )
  })

  it('returns Profile Editing name', () => {
    expect(getStepName(StepType.PROFILE_EDITING)).toMatchInlineSnapshot(
      `"Profile Editing"`
    )
  })

  it('returns Legal Details name', () => {
    expect(getStepName(StepType.LEGAL)).toMatchInlineSnapshot(`"Legal Details"`)
  })

  it('returns Payment Method name', () => {
    expect(getStepName(StepType.PAYMENT)).toMatchInlineSnapshot(
      `"Payment Method"`
    )
  })

  it('returns Toptal Email name', () => {
    expect(getStepName(StepType.TOPTAL_EMAIL)).toMatchInlineSnapshot(
      `"Toptal Email"`
    )
  })
})
