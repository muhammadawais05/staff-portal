import React from 'react'
import { Container, TypographyOverflow, Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import { CompanyOverviewFragment } from '../../../../data'
import LegalStaTermsModal from './components/LegalStaTermsModal'

export type Props = Pick<CompanyOverviewFragment, 'activeStaContract'> & {
  legalName?: string
}

const LegalStaTerms = ({ activeStaContract = null, legalName }: Props) => {
  const { showModal } = useModal(LegalStaTermsModal, {
    activeStaContract,
    legalName
  })
  const staTerms = activeStaContract?.staTerms

  const getTerminationPeriod = () =>
    staTerms?.terminationPeriodApplicable
      ? `${staTerms?.terminationPeriodInDays} business days`
      : 'Not applicable'

  const getType = () => (staTerms?.standard ? 'Standard' : 'Custom')

  return (
    <Container flex justifyContent='space-between'>
      <TypographyOverflow size='medium'>
        {!activeStaContract?.staTerms || !activeStaContract ? (
          'Not applicable'
        ) : (
          <>
            Type: {getType()}. Termination period: {getTerminationPeriod()}
          </>
        )}
      </TypographyOverflow>

      {activeStaContract?.staTerms && (
        <Container left='small'>
          <Button
            variant='secondary'
            size='small'
            onClick={showModal}
            data-testid='legal-sta-terms-modal-button'
          >
            View Term Details
          </Button>
        </Container>
      )}
    </Container>
  )
}

export default LegalStaTerms
