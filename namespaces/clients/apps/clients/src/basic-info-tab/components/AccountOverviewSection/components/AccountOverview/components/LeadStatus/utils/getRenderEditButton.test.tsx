import { LazyOperationRenderProps } from '@staff-portal/operations'

import getRenderEditButton from './getRenderEditButton'
import EditButton from '../components/EditButton'

const PARTIAL_RENDER_PROPS = ({
  checkOperation: () => {},
  disabled: 'disabled'
} as unknown) as LazyOperationRenderProps

describe('getRenderEditButton', () => {
  it('returns function', () => {
    const renderFunction = getRenderEditButton(true)

    expect(renderFunction).toEqual(expect.any(Function))
  })

  describe('returned function', () => {
    it.each([
      { dataLoading: true, operationLoading: false, expectedLoading: true },
      { dataLoading: false, operationLoading: true, expectedLoading: true },
      { dataLoading: false, operationLoading: false, expectedLoading: false }
    ])(
      'renders button with correct loading state',
      ({ dataLoading, operationLoading, expectedLoading }) => {
        const renderFunction = getRenderEditButton(dataLoading)

        const editButton = renderFunction({
          ...PARTIAL_RENDER_PROPS,
          loading: operationLoading
        })

        const { checkOperation, disabled } = PARTIAL_RENDER_PROPS

        expect(editButton).toEqual(
          expect.objectContaining({
            type: EditButton,
            props: expect.objectContaining({
              disabled,
              checkOperation,
              loading: expectedLoading
            })
          })
        )
      }
    )
  })
})
