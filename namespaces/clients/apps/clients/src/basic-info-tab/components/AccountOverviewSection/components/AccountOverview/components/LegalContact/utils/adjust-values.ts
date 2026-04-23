import { UpdateLegalContactModalFormInput } from '../components/UpdateLegalStatusModal/UpdateLegalContactModal'

export const adjustValues = ({
  clientId,
  customSigner,
  signerFullName,
  signerEmail
}: UpdateLegalContactModalFormInput & { clientId: string }) => {
  const isCustomSigner = customSigner === 'true'

  return {
    clientId,
    customSigner: isCustomSigner,
    ...(isCustomSigner
      ? {
          signerFullName,
          signerEmail
        }
      : {})
  }
}
