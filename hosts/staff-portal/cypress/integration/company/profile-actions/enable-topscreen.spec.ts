import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TopscreenClient } from '@staff-portal/graphql/staff'

import { updateEnableTopscreenStubs } from '~integration/mocks/schema-updates/companies'
import { FormModal } from '~integration/modules/modals'
import { enabledOperationMock } from '~integration/mocks'
import CompanyProfilePage from '~integration/modules/pages/companies'
import { getClientOperations } from '~integration/mocks/fragments'

describe('Enable TopScreen Feature', () => {
  const page = new CompanyProfilePage()
  const formModal = new FormModal()

  describe('enables TopScreen Feature', () => {
    it('submits the form', () => {
      updateEnableTopscreenStubs({
        operations: getClientOperations({
          enableTopscreenFeature: enabledOperationMock()
        })
      })

      page.basicInfoTab.visitTab()

      page.primaryActions.openEnableTopscreenModalButton.should('be.visible')

      page.tabs.tabList.should('not.contain.text', 'TopScreen')

      page.primaryActions.openEnableTopscreenModalButton.click()

      formModal.submitButton.click()

      updateEnableTopscreenStubs({
        operations: getClientOperations(),
        topscreenClient: {
          id: encodeEntityId('123', 'TopscreenClient'),
          __typename: 'TopscreenClient'
        } as unknown as TopscreenClient
      })

      page.primaryActions.openEnableTopscreenModalButton.should('not.exist')

      page.tabs.tabList.should('contain.text', 'TopScreen')
    })
  })
})
