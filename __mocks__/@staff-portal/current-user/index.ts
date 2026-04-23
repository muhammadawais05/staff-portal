import { createGetCurrentUserMock } from '@staff-portal/current-user/src/data/use-get-current-user/mocks'

export const useGetCurrentUser = () =>
  createGetCurrentUserMock().result.data.viewer.me

export const useUserDateFormatter = () => (date: string) => date
export const useUserDateTimeFormatter = () => (date: string) => date
export const useUserTimeZone = () => undefined
