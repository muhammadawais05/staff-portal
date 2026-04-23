import { createCallableClientFragmentMock } from '@staff-portal/communication/src/mocks'

export const createExpiredCallTimerMessageFragmentMock = (
  clientName = 'Test Company'
) => ({
  client: createCallableClientFragmentMock({ clientName }),
  __typename: 'ClientConnection'
})
