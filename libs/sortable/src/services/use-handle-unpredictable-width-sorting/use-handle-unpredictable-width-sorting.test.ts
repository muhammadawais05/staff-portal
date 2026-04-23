import { act, renderHook } from '@testing-library/react-hooks'
import { DragEndEvent, DragStartEvent, rectIntersection } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

import useHandleUnpredictableWidthSorting, {
  noOpSortingStrategy
} from './use-handle-unpredictable-width-sorting'
import { PointerSensor } from '../../index'

describe('useHandleUnpredictableWidthSorting', () => {
  describe('when `sortType` is `multiline`', () => {
    it('returns the correct result', () => {
      const onDragStateUpdateMock = jest.fn()

      const {
        result: { current }
      } = renderHook(() =>
        useHandleUnpredictableWidthSorting({
          sortType: 'multiline',
          onDragStateUpdate: onDragStateUpdateMock
        })
      )

      expect(current).toStrictEqual({
        activeId: null,
        sortableContextProps: {
          collisionDetection: rectIntersection,
          modifiers: [restrictToWindowEdges],
          strategy: noOpSortingStrategy,
          sensors: [{ options: {}, sensor: PointerSensor }],
          onDragStart: expect.any(Function),
          onDragOver: onDragStateUpdateMock,
          onDragEnd: expect.any(Function)
        }
      })
    })

    describe('when `onDragStart` and `onDragEnd` handlers are called', () => {
      it('returns the correct result', () => {
        const onDragStateUpdateMock = jest.fn()

        const { result, rerender } = renderHook(() =>
          useHandleUnpredictableWidthSorting({
            sortType: 'multiline',
            onDragStateUpdate: onDragStateUpdateMock
          })
        )

        act(() => {
          result.current.sortableContextProps.onDragStart?.({
            active: { id: '123' }
          } as DragStartEvent)
        })

        rerender()

        expect(result.current).toEqual(
          expect.objectContaining({
            activeId: '123'
          })
        )

        act(() => {
          result.current.sortableContextProps.onDragEnd?.({
            active: { id: '123' }
          } as DragEndEvent)
        })

        rerender()

        expect(result.current).toEqual(
          expect.objectContaining({
            activeId: null
          })
        )
      })
    })
  })
})
