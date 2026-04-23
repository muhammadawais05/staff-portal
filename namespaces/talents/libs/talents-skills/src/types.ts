export enum VettedResultQuartiles {
  Top25 = 'Top25',
  Between25And75 = 'Between25And75',
  Bottom25 = 'Bottom25'
}

export type VettedResultQuartileMapping<T> = {
  [key in VettedResultQuartiles]: T
}

export enum VettingType {
  NotVetted = 'NotVetted',
  Vetted = 'Vetted'
}

export interface VettedResultType {
  type: VettingType.Vetted
  workingHoursCount: number
  skillConnectionsCount: number
  engagementsCount: number
  quartiles: {
    workingHours25: number
    workingHours75: number
    skillConnections25: number
    skillConnections75: number
    engagements25: number
    engagements75: number
  }
  performerName: string
  formattedCreatedAt: string
  comment?: string
}

export interface NotVettedResultType {
  type: VettingType.NotVetted
  message: string
}

export type VettedResult = VettedResultType | NotVettedResultType

export interface SkillConnection {
  title: string
  count: number
  items?: string[]
}
