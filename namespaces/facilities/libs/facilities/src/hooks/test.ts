import { useParams } from '@staff-portal/navigation'

import useEncodedIdParams from './use-encoded-id-params'

jest.mock('@staff-portal/navigation')
const mockParams = useParams as jest.Mock

describe('#useEncodedIdParams', () => {
  describe('when there are several params in the URL', () => {
    beforeEach(() => {
      mockParams.mockReturnValue({
        id: '69',
        nodeId: '33'
      })
    })
    it('should return correct decoded params when right types are used', () => {
      const [purchaseOrderId, purchaseOrderLineId] = useEncodedIdParams({
        nodeId: 'PurchaseOrder',
        id: 'PurchaseOrderLine'
      })

      expect(purchaseOrderId).toBe('VjEtUHVyY2hhc2VPcmRlci0zMw')
      expect(purchaseOrderLineId).toBe('VjEtUHVyY2hhc2VPcmRlckxpbmUtNjk')
    })
    it('should return null for params that are not found', () => {
      const [purchaseOrderId, purchaseOrderLineId] = useEncodedIdParams({
        someParam: 'PurchaseOrder',
        id: 'PurchaseOrderLine'
      })

      expect(purchaseOrderId).toBeNull()
      expect(purchaseOrderLineId).toBe('VjEtUHVyY2hhc2VPcmRlckxpbmUtNjk')
    })
  })
  describe('when there is one param in the URL', () => {
    beforeEach(() => {
      mockParams.mockReturnValue({
        id: '69'
      })
    })
    it('should return correct decoded params for existing URL params', () => {
      const [purchaseOrderId, purchaseOrderLineId] = useEncodedIdParams({
        nodeId: 'PurchaseOrder',
        id: 'PurchaseOrderLine'
      })

      expect(purchaseOrderId).toBeNull()
      expect(purchaseOrderLineId).toBe('VjEtUHVyY2hhc2VPcmRlckxpbmUtNjk')
    })
    it('should return array of null when no suitable params are found', () => {
      const [purchaseOrderId, purchaseOrderLineId] = useEncodedIdParams({
        someParam: 'PurchaseOrder',
        someOtherParam: 'PurchaseOrderLine'
      })

      expect(purchaseOrderId).toBeNull()
      expect(purchaseOrderLineId).toBeNull()
    })
  })
})
