import { useNotifications } from '@toptal/picasso/utils'

import { useCallContact } from '../use-call-contact'
import { useProceedTopcall } from '../use-proceed-topcall'
import { ERROR_MESSAGE } from '../../messages'

export interface Props {
  roleId?: string
  phoneContactId?: string
  contactSourceId?: string
}

export const useCallContactWithOperationCheck = ({
  roleId,
  phoneContactId,
  contactSourceId
}: Props) => {
  const { showError } = useNotifications()
  const { proceedTopcall } = useProceedTopcall()
  const [callContact, { loading }] = useCallContact({
    onError: () => {
      showError(ERROR_MESSAGE)
    },
    onCompleted: data => {
      if (!data?.callContact) {
        return
      }

      proceedTopcall(data?.callContact)
    }
  })

  const proceedContactCallWithOperationCheck = () => {
    if (phoneContactId) {
      callContact({
        variables: {
          input: { roleId, contactId: phoneContactId, contactSourceId }
        }
      })
    }
  }

  return { loading, callContact: proceedContactCallWithOperationCheck }
}
