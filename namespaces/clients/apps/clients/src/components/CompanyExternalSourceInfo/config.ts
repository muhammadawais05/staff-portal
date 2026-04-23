export enum CompanyExternalSourceType {
  BSS = 'BSS',
  CLIENTOPEDIA = 'CLIENTOPEDIA',
  GIORGIO = 'GIORGIO'
}

export const CompanyExternalSourceTypeDescription = {
  [CompanyExternalSourceType.BSS]: 'This data is from an external source',
  [CompanyExternalSourceType.CLIENTOPEDIA]: 'This data is from Clientopedia',
  [CompanyExternalSourceType.GIORGIO]: 'This data is from the sign-up form'
}
