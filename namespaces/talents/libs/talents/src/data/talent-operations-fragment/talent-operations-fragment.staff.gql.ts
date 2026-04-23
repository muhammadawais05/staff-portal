import { gql } from '@staff-portal/data-layer-service'

export const TALENT_OPERATIONS_FRAGMENT = gql`
  fragment TalentOperationsFragment on Talent {
    operations {
      ...TalentProfileOperationsFragment
    }
  }

  fragment TalentProfileOperationsFragment on TalentOperations {
    updateTalentReapplicationDate {
      callable
      messages
    }
    updateTalentSpecialHandling {
      callable
      messages
    }
    changeRoleReferrer {
      callable
      messages
    }
    changeTalentSourcer {
      callable
      messages
    }
    updateTalentSigningBonusDeadline {
      callable
      messages
    }
    updateEligibleForRestoration {
      callable
      messages
    }
    discardTalentPrescreeningVideo {
      callable
      messages
    }
    approveTalentIdVerification {
      callable
      messages
    }
    updateBillingNotes {
      messages
      callable
    }
    updateTalentApplicantSkills {
      messages
      callable
    }
    subscribeToTalentAvailabilityUpdates {
      messages
      callable
    }
    addRoleFlag {
      callable
      messages
    }
  }
`
