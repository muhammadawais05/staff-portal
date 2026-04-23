import { getInterviewContacts } from './get-interview-contacts'

describe('getInterviewContacts', () => {
  describe('when interview contacts and available contacts are empty', () => {
    it('returns an empty list', () => {
      expect(getInterviewContacts({ edges: [] })).toStrictEqual([])
    })
  })

  describe('when passing the interview contact', () => {
    it('returns interview contacts', () => {
      expect(
        getInterviewContacts(
          {
            edges: [
              {
                node: {
                  id: '1',
                  fullName: 'Contact 1',
                  webResource: { text: 'Contact 1' }
                }
              }
            ]
          },
          {
            nodes: [
              {
                id: '2',
                fullName: 'Contact 2',
                webResource: { text: 'Contact 2' }
              }
            ]
          }
        )
      ).toStrictEqual(['1'])
    })
  })

  describe('when passing the available contacts and empty interview contacts', () => {
    it('returns available contacts', () => {
      expect(
        getInterviewContacts(
          {
            edges: []
          },
          {
            nodes: [
              {
                id: '2',
                fullName: 'Contact 2',
                webResource: { text: 'Contact 2' }
              }
            ]
          }
        )
      ).toStrictEqual(['2'])
    })
  })
})
