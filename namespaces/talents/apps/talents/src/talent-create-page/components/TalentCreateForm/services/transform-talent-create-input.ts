import {
  CreateCommonTalentInput,
  CreateTopscreenTalentInput
} from '@staff-portal/graphql/staff'
import {
  parseApplicantSkills,
  parseNewApplicantSkillNames
} from '@staff-portal/talents-profile'

import { TalentCreateFormValues } from '../../../types'

const parseApplicationAnswers = (applicationAnswers?: Record<string, string>) =>
  applicationAnswers &&
  Object.entries(applicationAnswers).map(answer => ({
    questionId: answer[0],
    answers: [answer[1]]
  }))

export const transformCommonTalentCreateInput = (
  verticalId: string,
  {
    applicationAnswers,
    applicantSkillIds,
    resume,
    ...rest
  }: TalentCreateFormValues
): CreateCommonTalentInput =>
  ({
    ...rest,
    verticalId,
    applicationAnswers: parseApplicationAnswers(applicationAnswers),
    applicantSkillIds: parseApplicantSkills(applicantSkillIds),
    newApplicantSkillNames: parseNewApplicantSkillNames(applicantSkillIds),
    resume: resume?.[0]?.file
  } as CreateCommonTalentInput)

export const transformTopscreenTalentCreateInput = ({
  applicantSkillIds,
  resume,
  ...rest
}: TalentCreateFormValues): CreateTopscreenTalentInput =>
  ({
    ...rest,
    applicantSkillIds: parseApplicantSkills(applicantSkillIds),
    newApplicantSkillNames: parseNewApplicantSkillNames(applicantSkillIds),
    resume: resume?.[0]?.file
  } as unknown as CreateTopscreenTalentInput)
