import { useNavigate, useLocation } from '@staff-portal/navigation'
import { getJobPath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'

export const useNavigateToJobPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateToJobPage = (jobId?: string) => {
    if (!jobId) {
      return null
    }

    const currentPath = location.pathname
    const jobPagePath = getJobPath(decodeEntityId(jobId).id)

    if (currentPath === jobPagePath) {
      return null
    }

    return navigate(jobPagePath)
  }

  return { navigateToJobPage }
}
