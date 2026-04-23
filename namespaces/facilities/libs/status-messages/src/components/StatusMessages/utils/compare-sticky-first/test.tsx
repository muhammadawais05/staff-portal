import { compareStickyFirst } from './compare-sticky-first'
import { createStatusMessageFragmentMock } from '../../../../data/status-message-fragment/mocks'

const statusMessageStickyA = createStatusMessageFragmentMock({
  sticky: true,
  text: 'A'
})
const statusMessageStickyB = createStatusMessageFragmentMock({
  sticky: true,
  text: 'B'
})
const statusMessageStickyC = createStatusMessageFragmentMock({
  sticky: true,
  text: 'C'
})
const statusMessageNonStickyD = createStatusMessageFragmentMock({
  sticky: false,
  text: 'D'
})
const statusMessageNonStickyE = createStatusMessageFragmentMock({
  sticky: false,
  text: 'E'
})
const statusMessageNonStickyF = createStatusMessageFragmentMock({
  sticky: false,
  text: 'F'
})

describe('`compare-sticky-first`', () => {
  it('keeps sticky messages original order', () => {
    expect(
      [statusMessageStickyC, statusMessageStickyA, statusMessageStickyB].sort(
        compareStickyFirst
      )
    ).toEqual([
      statusMessageStickyC,
      statusMessageStickyA,
      statusMessageStickyB
    ])
  })

  it('keeps non-sticky messages original order', () => {
    expect(
      [
        statusMessageNonStickyE,
        statusMessageNonStickyF,
        statusMessageNonStickyD
      ].sort(compareStickyFirst)
    ).toEqual([
      statusMessageNonStickyE,
      statusMessageNonStickyF,
      statusMessageNonStickyD
    ])
  })
  it('`compare-sticky-first` sets sticky messages first, keeping the order of messages with the same "stickyness"', () => {
    expect(
      [
        statusMessageNonStickyE,
        statusMessageStickyC,
        statusMessageNonStickyF,
        statusMessageNonStickyD,
        statusMessageStickyB,
        statusMessageStickyA
      ].sort(compareStickyFirst)
    ).toEqual([
      statusMessageStickyC,
      statusMessageStickyB,
      statusMessageStickyA,
      statusMessageNonStickyE,
      statusMessageNonStickyF,
      statusMessageNonStickyD
    ])
  })
})
