export interface ProfileEmployment {
  id: string
  position: string
  experienceItems: string[]
  startDate: number
  endDate?: number | null
  company: string
}
