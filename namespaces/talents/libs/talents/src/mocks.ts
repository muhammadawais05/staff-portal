export {
  createGetTalentSkillSetsFailedMock,
  createGetTalentSkillSetsMock,
  createTalentSkillSetMock
} from './components/SkillSetFields/data/mocks'
export { createGetClientWillHireAgainMock } from './data/get-client-will-hire-again/mocks'
export { createGetTalentEngagementsRatesMock } from './components/EngagementsRatesField/data/get-talent-engagements-rates/mocks'
export { createTalentFragmentMock } from './data/get-talent/mocks'
export { createGetTalentApplicationsSkillsAutoCompleteMock } from './data/get-talent-applicant-skills-autocomplete/mocks'
// These test-utils are actually just functions to create mocks
// Maybe they can be moved or even removed in the future
export { createOperation, createStaff } from './test-utils'

export { createClientWillHireAgainFragmentMock } from './data/client-will-hire-again-fragment/mocks'
export { createTalentAvailabilitySubscriptionFragmentMock } from './data/talent-availability-subscription-fragment/mocks'
export { createUnsubscribeFromTalentAvailabilityUpdatesMock } from './hooks/use-unsubscribe-from-talent-availability-updates/mocks'
export { createTalentAvailabilityFragmentMock } from './data/talent-availability-fragment/mocks'
