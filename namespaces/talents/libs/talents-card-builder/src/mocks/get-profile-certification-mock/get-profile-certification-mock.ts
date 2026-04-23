import { PreviewCertificationType, ProfileCertification } from '../../types'

const getProfileCertificationMock = (
  profileCertification: Partial<ProfileCertification> = {}
): PreviewCertificationType => ({
  id: profileCertification.certificate ?? 'cert1',
  certificate: 'certificate',
  institution: 'institution',
  type: 'certification',
  ...profileCertification
})

export default getProfileCertificationMock
