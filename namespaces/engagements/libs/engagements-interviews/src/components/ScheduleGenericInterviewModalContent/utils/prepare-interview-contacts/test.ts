import { prepareInterviewContacts } from './prepare-interview-contacts'

describe('prepareInterviewContacts', () => {
  it('prepares interview contacts', () => {
    expect(prepareInterviewContacts([])).toStrictEqual([])

    expect(prepareInterviewContacts(['1', '2', '3'])).toStrictEqual([
      { id: '1', main: false },
      { id: '2', main: false },
      { id: '3', main: false }
    ])

    expect(prepareInterviewContacts(['1', '2', '3'], '2')).toStrictEqual([
      { id: '1', main: false },
      { id: '2', main: true },
      { id: '3', main: false }
    ])
  })
})
