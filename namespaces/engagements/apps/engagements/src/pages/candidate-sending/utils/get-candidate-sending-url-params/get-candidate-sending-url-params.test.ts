import { getCandidateSendingUrlParams } from './get-candidate-sending-url-params'

describe('getCandidateSendingUrlParams', () => {
  it('returns engagement object parameters', () => {
    const urlValues = {
      id: 'engagement_id_123',
      talent_id: 'talent_id_123',
      job_id: 'job_id_123',
      has_pending_assignment: true,

      engagement: {
        id: 'engagement_id_234',
        talent_id: 'talent_id_234',
        job_id: 'job_id_234',
        has_pending_assignment: true
      }
    }

    expect(getCandidateSendingUrlParams(urlValues)).toStrictEqual({
      engagementId: 'engagement_id_234',
      talentId: 'talent_id_234',
      jobId: 'job_id_234',
      hasPendingAssignment: true
    })
  })

  it('returns direct params when engagement object does not have some parameters', () => {
    const urlValues = {
      id: 'engagement_id_123',
      talent_id: 'talent_id_123',
      job_id: 'talent_id_123',
      has_pending_assignment: true,

      engagement: {
        id: 'engagement_id_234',
        has_pending_assignment: true
      }
    }

    expect(getCandidateSendingUrlParams(urlValues)).toStrictEqual({
      engagementId: 'engagement_id_234',
      talentId: 'talent_id_123',
      jobId: 'talent_id_123',
      hasPendingAssignment: true
    })
  })

  it('returns undefined for unexisted params', () => {
    const urlValues = {
      has_pending_assignment: undefined,

      engagement: {
        has_pending_assignment: true
      }
    }

    expect(getCandidateSendingUrlParams(urlValues)).toStrictEqual({
      engagementId: undefined,
      talentId: undefined,
      jobId: undefined,
      hasPendingAssignment: true
    })
  })
})
