import { SubmissionErrors } from '@toptal/picasso-forms'
import { ReactNode } from 'react'
import { FormErrors } from '@staff-portal/mutation-result-handlers'

import { TalentSpecializationFragment } from './data/get-resume-talent-application-details'

export interface RestoreTalentActivationFormData {
  specializationId: string
  comment: string
}

export interface ResumeTalentApplicationFormData {
  automatedActionAllowed?: boolean
  specializationId: string
  comment: string
}

export type GenericFormData =
  | RestoreTalentActivationFormData
  | ResumeTalentApplicationFormData

type OnSubmitReturnType = Promise<void | SubmissionErrors | FormErrors>

export interface ResumeTalentApplicationGenericModalProps {
  isResumeTalentApplicationModal?: boolean
  talentId: string
  hideModal?: () => void
  onSubmit: (formData: GenericFormData) => OnSubmitReturnType
  isSubmitting: boolean
}
export interface ResumeTalentApplicationGenericModalContentProps {
  isResumeTalentApplicationModal?: boolean
  manualRestorationAvailable?: boolean
  eligibleForAutomaticRestore?: boolean
  specializations?: TalentSpecializationFragment[] | null
  specializationApplications?: TalentSpecializationFragment[] | null
  talentId: string
  hideModal?: () => void
  onSubmit: (formData: GenericFormData) => OnSubmitReturnType
  loading: boolean
  isSubmitting: boolean
}

export interface ResumeTalentApplicationFormProps {
  initialSpecializationId?: string
  onSubmit: (formData: ResumeTalentApplicationFormData) => OnSubmitReturnType
  children?: ReactNode
}

export interface RestoreTalentActivationFormProps {
  initialSpecializationId?: string
  onSubmit: (formData: RestoreTalentActivationFormData) => OnSubmitReturnType
  children?: ReactNode
}
