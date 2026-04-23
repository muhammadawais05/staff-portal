import { JobBudgetDetails } from '@staff-portal/graphql/staff'

import { getInitialFormValues } from './get-initial-form-values'
import { JobDetails } from '../../../types'

describe('getInitialFormValues', () => {
  it('should add default values', () => {
    expect(
      getInitialFormValues({
        job: { client: {} } as JobDetails,
        inTalentMatchers: false,
        canManageJobMaxHourlyRate: false,
        activeJobPositionQuestionTemplates: []
      })
    ).toEqual(
      expect.objectContaining({
        skipSkillsChecks: true,
        skipQualityChecks: true,
        showNoRequiredSkillsConfirmation: true
      })
    )
  })

  it('should take raw values from the job', () => {
    const { longshotReasons, requiredApplicationPitch, hiddenForTalents } =
      getInitialFormValues({
        job: {
          longshotReasons: ['test'],
          requiredApplicationPitch: true,
          hiddenForTalents: true,
          client: {}
        } as JobDetails,
        inTalentMatchers: false,
        canManageJobMaxHourlyRate: false,
        activeJobPositionQuestionTemplates: []
      })

    expect(longshotReasons).toEqual(['test'])
    expect(requiredApplicationPitch).toBe(true)
    expect(hiddenForTalents).toBe(true)
  })

  it('should transform `positionQuestions` from job and `activeJobPositionQuestionTemplates`', () => {
    expect(
      getInitialFormValues({
        job: {
          positionQuestions: {
            nodes: [
              { id: '1', label: '1', required: true },
              {
                id: '2',
                label: '2',
                required: true,
                template: { id: '123', sticky: true }
              }
            ]
          },
          client: {}
        } as JobDetails,
        inTalentMatchers: false,
        canManageJobMaxHourlyRate: false,
        activeJobPositionQuestionTemplates: [
          { sticky: true, question: 'sticky question', id: '3' }
        ]
      }).jobPositionQuestions
    ).toEqual([
      {
        label: 'sticky question',
        jobPositionQuestionTemplateId: '3',
        sticky: true,
        required: true
      },
      {
        id: '2',
        label: '2',
        required: true,
        sticky: true,
        jobPositionQuestionTemplateId: '123'
      },
      { id: '1', label: '1', required: true }
    ])
  })

  it('should transform `categories` from job', () => {
    const categories = [{ id: '1' }, { id: '2' }]

    expect(
      getInitialFormValues({
        job: { categories: { nodes: categories }, client: {} } as JobDetails,
        inTalentMatchers: false,
        canManageJobMaxHourlyRate: false,
        activeJobPositionQuestionTemplates: []
      }).categoryIds
    ).toEqual(['1', '2'])
  })

  describe('when `availableSpecialization` has only one element', () => {
    it('should populate `specializationId`', () => {
      expect(
        getInitialFormValues({
          job: {
            availableSpecializations: { nodes: [{ id: '123' }] },
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        }).specializationId
      ).toBe('123')
    })
  })

  describe('when `availableSpecialization` has more than one element', () => {
    it('should not populate `specializationId`', () => {
      expect(
        getInitialFormValues({
          job: {
            availableSpecializations: { nodes: [{ id: '123' }, { id: '123' }] },
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        }).specializationId
      ).toBeUndefined()
    })
  })

  describe('when `availableSpecialization` has no elements', () => {
    it('should not populate `specializationId`', () => {
      expect(
        getInitialFormValues({
          job: {
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        }).specializationId
      ).toBeUndefined()
    })
  })

  describe('when `inTalentMatchers` and `claimer.id` are present', () => {
    it('should populate `claimerId`', () => {
      expect(
        getInitialFormValues({
          job: { claimer: { id: '123' }, client: {} } as JobDetails,
          inTalentMatchers: true,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        }).claimerId
      ).toBe('123')
    })
  })

  describe('when `inTalentMatchers` and `claimer.id` are not present', () => {
    it('should populate `claimerId`', () => {
      expect(
        getInitialFormValues({
          job: { client: {} } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        }).claimerId
      ).toBeUndefined()
    })
  })

  describe('when `possiblyRelatedMeetings` has only one element', () => {
    it('should populate `meetingId`', () => {
      expect(
        getInitialFormValues({
          job: {
            possiblyRelatedMeetings: { nodes: [{ id: '123' }] },
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        }).meetingId
      ).toBe('123')
    })
  })

  describe('when `possiblyRelatedMeetings` has more than one element', () => {
    it('should not populate `meetingId`', () => {
      expect(
        getInitialFormValues({
          job: {
            possiblyRelatedMeetings: { nodes: [{ id: '123' }, { id: '123' }] },
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        }).meetingId
      ).toBeUndefined()
    })
  })

  describe('when `possiblyRelatedMeetings` has no elements', () => {
    it('should not populate `meetingId`', () => {
      expect(
        getInitialFormValues({
          job: {
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        }).meetingId
      ).toBeUndefined()
    })
  })

  describe('when `jobDepositCanBeIssued` is present', () => {
    describe('when `depositInvoices` is empty', () => {
      it('should compute `createDeposit`', () => {
        const { createDeposit, deposit } = getInitialFormValues({
          job: {
            client: { jobDepositCanBeIssued: true }
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        })

        expect(createDeposit).toBe(true)
        expect(deposit).toBe('500')
      })
    })

    describe('when `depositInvoices` is not empty', () => {
      it('should compute `createDeposit`', () => {
        const { createDeposit, deposit } = getInitialFormValues({
          job: {
            client: {
              jobDepositCanBeIssued: true,
              depositInvoices: { nodes: [{}] }
            }
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        })

        expect(createDeposit).toBe(false)
        expect(deposit).toBeUndefined()
      })
    })
  })

  describe('when `jobDepositCanBeIssued` is not present', () => {
    it('should compute `createDeposit`', () => {
      const { createDeposit, deposit } = getInitialFormValues({
        job: { client: {} } as JobDetails,
        inTalentMatchers: false,
        canManageJobMaxHourlyRate: false,
        activeJobPositionQuestionTemplates: []
      })

      expect(createDeposit).toBeUndefined()
      expect(deposit).toBeUndefined()
    })
  })

  describe('when `canManageJobMaxHourlyRate` is present', () => {
    describe('when `job.budgetDetails` is `NO_RATE_LIMIT`', () => {
      it('should set `noRateLimit` to `true`', () => {
        const {
          noRateLimit,
          uncertainOfBudgetReason,
          uncertainOfBudgetReasonComment,
          uncertainOfBudget,
          maxHourlyRate
        } = getInitialFormValues({
          job: {
            budgetDetails: JobBudgetDetails.NO_RATE_LIMIT,
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: true,
          activeJobPositionQuestionTemplates: []
        })

        expect(noRateLimit).toBe(true)
        expect(uncertainOfBudget).toBeUndefined()
        expect(uncertainOfBudgetReason).toBeUndefined()
        expect(uncertainOfBudgetReasonComment).toBeUndefined()
        expect(maxHourlyRate).toBeUndefined()
      })
    })

    describe('when `job.budgetDetails` is `undefined` and `job.noRateLimit` is `true`', () => {
      it('should set `noRateLimit` to `true`', () => {
        const {
          noRateLimit,
          uncertainOfBudget,
          uncertainOfBudgetReason,
          uncertainOfBudgetReasonComment,
          maxHourlyRate
        } = getInitialFormValues({
          job: {
            budgetDetails: undefined,
            noRateLimit: true,
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: true,
          activeJobPositionQuestionTemplates: []
        })

        expect(noRateLimit).toBe(true)
        expect(uncertainOfBudget).toBeUndefined()
        expect(uncertainOfBudgetReason).toBeUndefined()
        expect(uncertainOfBudgetReasonComment).toBeUndefined()
        expect(maxHourlyRate).toBeUndefined()
      })
    })

    describe('when `job.budgetDetails` is `UNCERTAIN_OF_BUDGET`', () => {
      it('should set `uncertainOfBudget` to `true`', () => {
        const {
          noRateLimit,
          uncertainOfBudgetReason,
          uncertainOfBudgetReasonComment,
          uncertainOfBudget,
          maxHourlyRate
        } = getInitialFormValues({
          job: {
            budgetDetails: JobBudgetDetails.UNCERTAIN_OF_BUDGET,
            uncertainOfBudgetReason: 'Other',
            uncertainOfBudgetReasonComment: 'test',
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: true,
          activeJobPositionQuestionTemplates: []
        })

        expect(noRateLimit).toBeUndefined()
        expect(uncertainOfBudget).toBe(true)
        expect(uncertainOfBudgetReason).toBe('Other')
        expect(uncertainOfBudgetReasonComment).toBe('test')
        expect(maxHourlyRate).toBeUndefined()
      })
    })

    describe('when `job.budgetDetails` is `RATE_SPECIFIED`', () => {
      it('should set `maxHourlyRate` to `job.maxHourlyRate`', () => {
        const {
          noRateLimit,
          uncertainOfBudgetReason,
          uncertainOfBudgetReasonComment,
          uncertainOfBudget,
          maxHourlyRate
        } = getInitialFormValues({
          job: {
            budgetDetails: JobBudgetDetails.RATE_SPECIFIED,
            maxHourlyRate: 500,
            client: {}
          } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: true,
          activeJobPositionQuestionTemplates: []
        })

        expect(noRateLimit).toBeUndefined()
        expect(uncertainOfBudget).toBeUndefined()
        expect(uncertainOfBudgetReason).toBeUndefined()
        expect(uncertainOfBudgetReasonComment).toBeUndefined()
        expect(maxHourlyRate).toBe(500)
      })
    })

    describe('when `job.budgetDetails` is `undefined` and `job.noRateLimit` is `false`', () => {
      it('should set `maxHourlyRate` to `job.maxHourlyRate`', () => {
        const { noRateLimit, uncertainOfBudget, maxHourlyRate } =
          getInitialFormValues({
            job: {
              budgetDetails: undefined,
              noRateLimit: false,
              maxHourlyRate: 500,
              client: {}
            } as JobDetails,
            inTalentMatchers: false,
            canManageJobMaxHourlyRate: true,
            activeJobPositionQuestionTemplates: []
          })

        expect(noRateLimit).toBeUndefined()
        expect(uncertainOfBudget).toBeUndefined()
        expect(maxHourlyRate).toBe(500)
      })
    })
  })

  describe('when `canManageJobMaxHourlyRate` is not present', () => {
    it('should not set budget details', () => {
      const { noRateLimit, uncertainOfBudget, maxHourlyRate } =
        getInitialFormValues({
          job: { client: {} } as JobDetails,
          inTalentMatchers: false,
          canManageJobMaxHourlyRate: false,
          activeJobPositionQuestionTemplates: []
        })

      expect(noRateLimit).toBeUndefined()
      expect(uncertainOfBudget).toBeUndefined()
      expect(maxHourlyRate).toBeUndefined()
    })
  })

  describe('when `commitment` is hourly', () => {
    it('should set `expectedWeeklyHours`', () => {
      const { expectedWeeklyHours } = getInitialFormValues({
        job: {
          commitment: 'hourly',
          expectedWeeklyHours: 12,
          client: {}
        } as JobDetails,
        inTalentMatchers: false,
        canManageJobMaxHourlyRate: false,
        activeJobPositionQuestionTemplates: []
      })

      expect(expectedWeeklyHours).toBe(12)
    })
  })

  describe('when `commitment` is not hourly', () => {
    it('should set `expectedWeeklyHours`', () => {
      const { expectedWeeklyHours } = getInitialFormValues({
        job: { expectedWeeklyHours: 12, client: {} } as JobDetails,
        inTalentMatchers: false,
        canManageJobMaxHourlyRate: false,
        activeJobPositionQuestionTemplates: []
      })

      expect(expectedWeeklyHours).toBeUndefined()
    })
  })
})
