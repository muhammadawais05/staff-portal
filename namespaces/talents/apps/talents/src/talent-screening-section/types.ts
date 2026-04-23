import { RoleStepNextActionFragment } from './data/role-step-next-action-fragment'

type StepActionHookParams = {
  roleStepId: string
  talentId: string
  onSuccess: (nextActionData: RoleStepNextActionFragment) => void
}

export type StepActionHook = (params: StepActionHookParams) => {
  showModal?: () => void
}
