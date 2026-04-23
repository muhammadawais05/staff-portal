import { confirmationActions } from '.'

describe('confirmationActions', () => {
  it('confirmationActions.showConfirmation', () => {
    const MOCK_ACTION_DATA = {
      actionTitle: 'example confirm title',
      onSuccess: jest.fn()
    }

    expect(
      confirmationActions.showConfirmation(
        { confirmation: {} },
        { payload: MOCK_ACTION_DATA }
      )
    ).toEqual({
      confirmation: MOCK_ACTION_DATA
    })
  })

  it('confirmationActions.setConfirmation', () => {
    const MOCK_ACTION_DATA = {
      actionTitle: 'example confirm title',
      onSuccess: jest.fn()
    }

    expect(
      confirmationActions.setConfirmation(
        { confirmation: MOCK_ACTION_DATA },
        { payload: { actionIsLoading: true } }
      )
    ).toEqual({
      confirmation: { ...MOCK_ACTION_DATA, actionIsLoading: true }
    })
  })

  it('confirmationActions.hideConfirmation', () => {
    expect(confirmationActions.hideConfirmation()).toEqual({
      confirmation: {}
    })
  })
})
