import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Contract,
  ContractKind,
  ContractOperations,
  ContractOrTalentAgreementEdge,
  ContractsAndTalentAgreementsEdgedConnection,
  Link,
  Staff,
  Talent
} from '@staff-portal/graphql/staff'

import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'
import updateTalentContractsAndAgreementsStubs from '~integration/mocks/schema-updates/talents/talent-contracts-and-agreements-section-stubs-update'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

describe('Talent Profile Tab > Contracts and Agreements Section', () => {
  const page = new TalentProfilePage()
  const { contractsAndAgreementsSection } = page
  const { deleteContractModal } = contractsAndAgreementsSection

  describe('Delete Contract button', () => {
    it('opens & submits the delete contract modal', () => {
      updateTalentContractsAndAgreementsStubs({
        contractsAndAgreements: {
          edges: [
            {
              legacy: false,
              node: {
                id: encodeEntityId('123', 'Contract'),
                kind: 'TALENT_AGREEMENT' as ContractKind,
                contractSender: {
                  id: 'VjEtU3RhZmYtMTI4OTE3',
                  fullName: 'Nova Champlin',
                  __typename: 'Staff'
                } as unknown as Staff,
                sentAt: '2017-11-22T00:08:02+03:00',
                contractStatus: 'SIGNED',
                signatureReceivedAt: '2017-11-22T01:41:46+03:00',
                webResource: {
                  text: 'Toptal Freelance Talent Agreement',
                  url: 'https://staging.toptal.net/platform/staff/contracts/143596',
                  __typename: 'Link'
                } as Link,
                operations: {
                  resendContract: hiddenOperationMock(),
                  verifyContract: hiddenOperationMock(),
                  destroyContract: enabledOperationMock(),
                  __typename: 'ContractOperations'
                } as ContractOperations,
                __typename: 'Contract'
              } as Contract,
              __typename: 'ContractOrTalentAgreementEdge'
            } as ContractOrTalentAgreementEdge
          ],
          __typename: 'ContractsAndTalentAgreementsEdgedConnection'
        } as ContractsAndTalentAgreementsEdgedConnection,
        __typename: 'Talent'
      } as unknown as Talent)

      page.visit()

      contractsAndAgreementsSection.talentContractItems
        .first()
        .getByTestId('delete-contract-button')
        .click()

      deleteContractModal.comment.click().type('C')
      deleteContractModal.submitButton.click()
      cy.getNotification().should('have.text', 'Contract has been deleted.')
    })
  })
})
