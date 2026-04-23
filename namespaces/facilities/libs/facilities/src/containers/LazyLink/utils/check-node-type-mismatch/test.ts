import { encodeEntityId } from '@staff-portal/data-layer-service'
import { NodeType } from '@staff-portal/graphql'

import { GetLazyLinkVariables } from '../../types'
import { checkNodeTypeMismatch } from './check-node-type-mismatch'

const arrangeTest = (getLazyLinkVariables: GetLazyLinkVariables) =>
  checkNodeTypeMismatch(
    {
      node: {
        viewIntroDraftV2: {
          enabled: true,
          messages: [],
          url: 'https://toptal.com'
        }
      }
    },
    getLazyLinkVariables
  )

describe('checkNodeTypeMismatch', () => {
  describe('when passing a wrong id', () => {
    it('throws an error', () => {
      expect(() => {
        arrangeTest({
          nodeId: '123',
          nodeType: NodeType.ENGAGEMENT,
          propertyName: 'viewIntroDraftV2'
        })
      }).toThrow('Unexpected format of the GQL id: 123')
    })
  })

  describe('when the node ID type mismatch', () => {
    it('throws an error', () => {
      expect(() => {
        arrangeTest({
          nodeId: encodeEntityId('1', 'Job'),
          nodeType: NodeType.ENGAGEMENT,
          propertyName: 'viewIntroDraftV2'
        })
      }).toThrow(
        'Lazy Link type mismatch: node ID (VjEtSm9iLTE) was type Job instead of Engagement.'
      )
    })
  })

  describe('when the property is missing', () => {
    it('throws an error', () => {
      expect(() => {
        arrangeTest({
          nodeId: encodeEntityId('1', 'Engagement'),
          nodeType: NodeType.ENGAGEMENT,
          propertyName: 'viewIntroDraft'
        })
      }).toThrow(
        'Lazy Link missing property: viewIntroDraft is missing from Engagement.'
      )
    })
  })

  describe('when all passing parameters are correct', () => {
    it("doesn't throws any errors", () => {
      expect(() => {
        arrangeTest({
          nodeId: encodeEntityId('1', 'Engagement'),
          nodeType: NodeType.ENGAGEMENT,
          propertyName: 'viewIntroDraftV2'
        })
      }).not.toThrow()
    })
  })
})
