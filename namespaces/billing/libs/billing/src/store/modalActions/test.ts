import { modalActions, ShowModalAction } from '.'
import { ModalKey } from '../../@types/types'

describe('modalActions', () => {
  it('modalActions.showModal', () => {
    const MOCK_ACTION_DATA: ShowModalAction['payload'] = {
      modalName: ModalKey.commitmentChange,
      options: { engagementId: '1' }
    }

    expect(
      modalActions.showModal(
        {
          modal: {
            modalName: ModalKey.commitmentChange,
            visible: false,
            options: { engagementId: '1' },
            props: {}
          }
        },
        { payload: MOCK_ACTION_DATA }
      )
    ).toEqual({
      modal: {
        modalName: ModalKey.commitmentChange,
        visible: true,
        options: { engagementId: '1' },
        props: {}
      }
    })
  })

  it('modalActions.hideModal', () => {
    expect(
      modalActions.hideModal({
        modal: {
          modalName: ModalKey.commitmentChange,
          visible: true,
          options: { engagementId: '1' },
          props: {}
        }
      })
    ).toEqual({
      modal: {
        modalName: ModalKey.commitmentChange,
        visible: false,
        options: { engagementId: '1' },
        props: {}
      }
    })
  })
})
