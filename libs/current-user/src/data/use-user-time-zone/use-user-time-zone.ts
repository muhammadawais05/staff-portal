import { useGetCurrentUser } from '../use-get-current-user/use-get-current-user.staff.gql'

export const useUserTimeZone = () => {
  const currentUser = useGetCurrentUser()

  return currentUser?.timeZone?.value
}
