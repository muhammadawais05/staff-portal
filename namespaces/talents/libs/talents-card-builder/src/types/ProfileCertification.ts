export interface ProfileCertification {
  id: string
  certificate: string
  institution: string
  validFromYear?: number | null
  validFromMonth?: number | null
  validToYear?: number | null
  validToMonth?: number | null
}
