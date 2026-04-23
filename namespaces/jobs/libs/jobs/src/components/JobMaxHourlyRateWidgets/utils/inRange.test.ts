import { inRange } from './inRange'

describe('inRange', () => {
  it('returns true if the number is inside the range', () => {
    expect(inRange(100, {})).toBeTruthy()
    expect(inRange(100, { to: 101 })).toBeTruthy()
    expect(inRange(100, { from: 0 })).toBeTruthy()
    expect(inRange(100, { from: 0, to: 9999 })).toBeTruthy()
    expect(inRange(100, { from: 99 })).toBeTruthy()
    expect(inRange(100, { from: 99, to: 101 })).toBeTruthy()
    expect(inRange(100, { from: 99, to: 500 })).toBeTruthy()
  })

  it('returns false if the number is inside the range', () => {
    expect(inRange(99, { from: 100 })).toBeFalsy()
    expect(inRange(99, { from: 100, to: 9999 })).toBeFalsy()
    expect(inRange(98, { from: 99 })).toBeFalsy()
    expect(inRange(98, { from: 99, to: 101 })).toBeFalsy()
    expect(inRange(98, { from: 99, to: 500 })).toBeFalsy()
  })

  it('returns true if value <= range, typeof range === "number"', () => {
    expect(inRange(100, 101)).toBeTruthy()
    expect(inRange(100, 102)).toBeTruthy()
    expect(inRange(100, 200)).toBeTruthy()
    expect(inRange(100, 500)).toBeTruthy()
  })

  it('returns false if value <= range, typeof range === "number"', () => {
    expect(inRange(200, 101)).toBeFalsy()
    expect(inRange(200, 102)).toBeFalsy()
    expect(inRange(201, 200)).toBeFalsy()
    expect(inRange(501, 500)).toBeFalsy()
  })
})
