import { renderHook } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'

import { useOnOpenJobBillingDeleteModal } from './useOnOpenJobBillingDeleteModal'

jest.mock('@staff-portal/billing/src/_lib/customHooks/useConfirmations')
jest.mock('../data', () => ({
  useSetDeleteJobTemplateMutation: () => [jest.fn()]
}))
jest.mock('@toptal/picasso/utils')
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockImplementation(() => ({
    t: (...args: (string | object)[]) => args
  }))
}))
const mockedHandleOnOpenConfirmation = jest.fn()

describe('useOnOpenJobBillingDeleteModal', () => {
  it('confirmation config has all required fields', () => {
    ;(useConfirmations as jest.Mock).mockReturnValue({
      handleOnOpenConfirmation: mockedHandleOnOpenConfirmation,
      handleOnCloseConfirmation: jest.fn(),
      handleOnSetConfirmation: jest.fn()
    })
    ;(useNotifications as jest.Mock).mockReturnValue({
      showError: jest.fn(),
      showSuccess: jest.fn()
    })

    const { result } = renderHook(() =>
      useOnOpenJobBillingDeleteModal('jobTemplateId')
    )

    result.current()

    expect(mockedHandleOnOpenConfirmation).toHaveBeenCalledWith(
      expect.objectContaining({
        actionTitle: ['common:actions.remove'],
        actionVariant: 'negative',
        description: ['billingDetails:modals.jobTemplateDelete.message'],
        title: ['billingDetails:modals.jobTemplateDelete.title']
      })
    )
  })
})
