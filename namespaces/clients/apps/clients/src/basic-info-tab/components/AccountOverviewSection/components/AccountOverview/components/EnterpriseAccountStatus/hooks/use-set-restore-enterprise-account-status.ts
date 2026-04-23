import { useMutation } from '@staff-portal/data-layer-service'

import { SetRestoreClientEnterpriseAccountStatusDocument } from '../data'

export const useSetRestoreClientEnterpriseAccountStatus = () =>
  useMutation(SetRestoreClientEnterpriseAccountStatusDocument)
