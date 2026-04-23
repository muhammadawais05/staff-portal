import computeEmphasizedLiterals from './compute-emphasized-literals'
import { EMPHASIZED_MODIFIER } from './constants'
import { interpolate } from './interpolate'

jest.mock('./compute-emphasized-literals')

describe('interpolate', () => {
  describe('when passing emphasized modifier', () => {
    it('triggers the compute emphasized literals function', () => {
      const mockComputeEmphasizedLiterals =
        computeEmphasizedLiterals as jest.Mock

      interpolate({
        payload: '2021-11-17',
        key: 'end_date',
        modifier: EMPHASIZED_MODIFIER
      })

      expect(mockComputeEmphasizedLiterals).toHaveBeenCalled()
    })
  })

  describe('when passing a non-emphasized modifier', () => {
    it("doesn't triggers the compute emphasized literals function", () => {
      const mockComputeEmphasizedLiterals =
        computeEmphasizedLiterals as jest.Mock

      interpolate({
        payload: '2021-11-17',
        key: 'end_date',
        modifier: undefined
      })

      expect(mockComputeEmphasizedLiterals).not.toHaveBeenCalled()
    })
  })
})
