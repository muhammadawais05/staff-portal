import { useNavigate } from '@staff-portal/navigation'
import { decodeId } from '@staff-portal/billing'

const useNavigateToCompanyRepresentative = () => {
  const navigate = useNavigate()

  const navigateToCompanyRepresentative = (data: {
    companyRepresentative?: {
      id?: string
    } | null
  }) => {
    const id = decodeId({
      id: data?.companyRepresentative?.id || '',
      type: 'companyRep'
    })

    navigate(`/company_representatives/${id}`)
  }

  return {
    navigateToCompanyRepresentative
  }
}

export default useNavigateToCompanyRepresentative
