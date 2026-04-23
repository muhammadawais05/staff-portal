import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useNavigate } from '@staff-portal/navigation'
import { getEditStaffProfilePath } from '@staff-portal/routes'

const useNavigateToEditProfile = (staffId: string) => {
  const navigate = useNavigate()

  return () => {
    const { id } = decodeEntityId(staffId)

    navigate(getEditStaffProfilePath(id))
  }
}

export default useNavigateToEditProfile
