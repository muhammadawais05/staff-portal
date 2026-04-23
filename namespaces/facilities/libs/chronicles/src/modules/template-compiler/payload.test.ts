import {
  getPayloadModelDescriptions,
  getRecordIds,
  getUniqueIds,
  getAssociationReferenceValueByPath,
  getPayloadDataSource
} from './payload'
import { GID_FIELD } from './constants'
import { ModelDescription } from './types'
import { NO_PAYLOAD_TEMPLATE } from './fixtures/no-payload-template'
import NO_PERFORMED_GID_TEMPLATE from './fixtures/no-performed-gid-template.json'
import { SIMPLE_OBJECT_PAYLOAD_TEMPLATE } from './fixtures/simple-object-payload'
import NESTED_OBJECT_PAYLOAD_RECORD from './fixtures/nested-object-payload.json'

describe('getRecordIds', () => {
  describe('no payload object in performed action record', () => {
    const performedActionRecord = NO_PAYLOAD_TEMPLATE

    it('should return only subject and performer ids in the list', () => {
      const result = getRecordIds(performedActionRecord)

      expect(result).toHaveLength(2)
      expect(result).toEqual(
        expect.arrayContaining([
          performedActionRecord.subjectGID,
          performedActionRecord.performerGID
        ])
      )
    })
  })

  describe('no payload ids and no performed gid in performed action record', () => {
    const performedActionRecord = NO_PERFORMED_GID_TEMPLATE

    it('should return only subject id in the list', () => {
      const result = getRecordIds(performedActionRecord)

      expect(result).toHaveLength(1)
      expect(result).toEqual(
        expect.arrayContaining([performedActionRecord.subjectGID])
      )
    })
  })

  describe('simple object payload in performed action record', () => {
    const performedActionRecord = SIMPLE_OBJECT_PAYLOAD_TEMPLATE

    it('should return subject, performer ids and 1 id from the payload', () => {
      const result = getRecordIds(performedActionRecord)
      const payloadId = JSON.parse(performedActionRecord.payload).flag.gid

      expect(result).toHaveLength(3)
      expect(result).toEqual(
        expect.arrayContaining([
          performedActionRecord.subjectGID,
          performedActionRecord.performerGID,
          payloadId
        ])
      )
    })
  })

  describe('nested object payload in performed action record', () => {
    const performedActionRecord = NESTED_OBJECT_PAYLOAD_RECORD

    it('should return subject id and 2 ids from the payload', () => {
      const result = getRecordIds(performedActionRecord)
      const payload = JSON.parse(performedActionRecord.payload)
      const accountManagerToId = payload.account_manager.to.gid
      const accountManagerFromId = payload.account_manager.from.gid

      expect(result).toHaveLength(3)
      expect(result).toEqual(
        expect.arrayContaining([
          performedActionRecord.subjectGID,
          accountManagerToId,
          accountManagerFromId
        ])
      )
    })
  })
})

describe('getAllPerformedActionUniqueIds', () => {
  it('should return ids from all the records', () => {
    const flagId = JSON.parse(SIMPLE_OBJECT_PAYLOAD_TEMPLATE.payload).flag.gid

    const nestedObjectPayload = JSON.parse(NESTED_OBJECT_PAYLOAD_RECORD.payload)
    const accountManagerToId = nestedObjectPayload.account_manager.to.gid
    const accountManagerFromId = nestedObjectPayload.account_manager.from.gid

    const result = getUniqueIds([
      SIMPLE_OBJECT_PAYLOAD_TEMPLATE,
      NESTED_OBJECT_PAYLOAD_RECORD
    ])

    expect(result).toHaveLength(6)
    expect(result).toEqual(
      expect.arrayContaining([
        SIMPLE_OBJECT_PAYLOAD_TEMPLATE.subjectGID,
        SIMPLE_OBJECT_PAYLOAD_TEMPLATE.performerGID,
        flagId,
        NESTED_OBJECT_PAYLOAD_RECORD.subjectGID,
        accountManagerToId,
        accountManagerFromId
      ])
    )
  })
})

describe('getPayloadModelDescriptions', () => {
  describe('when id exists in modelDescriptions list', () => {
    it('should replace object with id with corresponded modelDescription', () => {
      const id = '111'
      const payload = {
        first: {
          [GID_FIELD]: id
        },
        second: {
          someProp: 'some prop value'
        }
      }
      const modelDescriptions = [
        {
          gid: id,
          associationReferences: [],
          designation: 'designation',
          reference: {}
        } as unknown as ModelDescription
      ]
      const expectedResult = {
        first: {
          ...modelDescriptions[0]
        },
        second: {
          someProp: 'some prop value'
        }
      }

      const result = getPayloadModelDescriptions(payload, modelDescriptions)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('when id exists in modelDescriptions list and payload has many nested levels', () => {
    it('should replace object with id with corresponded modelDescription', () => {
      const id = '111'
      const payload = {
        first: {
          second: {
            [GID_FIELD]: id
          },
          someProp: 'some prop value'
        },
        third: {
          anotherProp: 'another prop value'
        }
      }
      const modelDescriptions = [
        {
          gid: id,
          associationReferences: [],
          designation: 'designation',
          reference: {}
        } as unknown as ModelDescription
      ]
      const expectedResult = {
        first: {
          second: {
            ...modelDescriptions[0]
          },
          someProp: 'some prop value'
        },
        third: {
          anotherProp: 'another prop value'
        }
      }

      const result = getPayloadModelDescriptions(payload, modelDescriptions)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('when id does not exist in modelDescriptions list', () => {
    it('should leave object with gid field to render', () => {
      const id = '111'
      const anotherId = '222'
      const payload = {
        first: {
          [GID_FIELD]: id
        },
        second: {
          someProp: 'some prop value'
        }
      }
      const modelDescriptions = [
        {
          gid: anotherId,
          associationReferences: [],
          designation: 'designation',
          reference: {}
        } as unknown as ModelDescription
      ]
      const expectedResult = {
        first: {
          [GID_FIELD]: id
        },
        second: {
          someProp: 'some prop value'
        }
      }

      const result = getPayloadModelDescriptions(payload, modelDescriptions)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('when payload does not contain any id object', () => {
    it('should keep payload without changes', () => {
      const payload = {
        first: {
          someProp: 'some prop value'
        },
        second: {
          anotherProp: 'another prop value'
        }
      }
      const modelDescriptions: ModelDescription[] = []

      const result = getPayloadModelDescriptions(payload, modelDescriptions)

      expect(result).toEqual(payload)
    })
  })
})

describe('getPayloadDataSource', () => {
  it('should humanize action name', () => {
    const result = getPayloadDataSource(SIMPLE_OBJECT_PAYLOAD_TEMPLATE, [])

    expect(result.action).toBe('added flag')
  })
})

describe('getAssociationReferenceValueByPath', () => {
  describe("when it's possible to find `associationReference` by path", () => {
    it('returns PayloadValueType', () => {
      expect(
        getAssociationReferenceValueByPath(
          {
            subject: {
              associationReferences: [
                {
                  name: 'client',
                  reference: {
                    accessible: true,
                    options: [],
                    path: '/platform/staff/companies/3260052',
                    text: 'Carter-Krajcik OE'
                  }
                }
              ],
              designation: 'callback request',
              gid: 'gid://platform/CallbackRequest/160955',
              reference: {
                accessible: false,
                options: [],
                path: null,
                text: 'scheduled call'
              }
            },
            performer: null,
            action: 'claimed',
            payload: {}
          },
          'subject.client'
        )
      ).toStrictEqual({
        name: 'client',
        reference: {
          accessible: true,
          options: [],
          path: '/platform/staff/companies/3260052',
          text: 'Carter-Krajcik OE'
        }
      })
    })
  })

  describe("when it's not possible to find `associationReference` by path", () => {
    it('returns `undefined`', () => {
      expect(
        getAssociationReferenceValueByPath(
          {
            subject: {
              associationReferences: [
                {
                  name: 'client',
                  reference: {
                    accessible: true,
                    options: [],
                    path: '/platform/staff/companies/3260052',
                    text: 'Carter-Krajcik OE'
                  }
                }
              ],
              designation: 'callback request',
              gid: 'gid://platform/CallbackRequest/160955',
              reference: {
                accessible: true,
                options: [],
                path: '/subject/path',
                text: 'Subject name'
              }
            },
            performer: null,
            action: 'claimed',
            payload: {}
          },
          'subject'
        )
      ).toBeUndefined()
    })
  })
})
