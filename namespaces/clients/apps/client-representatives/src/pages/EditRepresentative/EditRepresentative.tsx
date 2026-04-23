import React, { useCallback } from 'react'
import { Link, useNavigate } from '@staff-portal/navigation'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  useGetCompanyRepresentative,
  RepresentativeForm,
  RepresentativeEditFormSkeletonLoader
} from '@staff-portal/client-representatives'
import { Section } from '@toptal/picasso'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { GridItemField } from '@staff-portal/ui'
import { RoleAvatarEditor } from '@staff-portal/role-profile'
import { RoleType } from '@staff-portal/graphql/staff'
import { isOperationHidden } from '@staff-portal/operations'

import { useGetEditCompanyRepresentativeParams } from './hooks/use-get-edit-company-representative-params'

const EditCompanyRepresentative = () => {
  const { representativeId, returnPath } =
    useGetEditCompanyRepresentativeParams()

  const { representative, loading } = useGetCompanyRepresentative({
    representativeId
  })

  const navigate = useNavigate()
  const handleClose = useCallback(() => {
    // when editing from company#contacts
    if (returnPath) {
      navigate(returnPath)

      return
    }

    // when editing from the rep page
    if (representative?.webResource.url) {
      navigate(representative.webResource.url)

      return
    }
  }, [representative, navigate, returnPath])

  const title = representative?.webResource.url ? (
    <>
      Profile of{' '}
      <Link href={representative.webResource.url}>
        {representative.fullName}
      </Link>
    </>
  ) : undefined

  const browserTitle = representative?.fullName
    ? `Profile of ${representative.fullName}`
    : 'Profile'

  const isUpdateProfilePhotoHidden = isOperationHidden(
    representative?.operations?.updateRolePhoto
  )

  return (
    <ContentWrapper
      titleLoading={loading}
      title={title}
      browserTitle={browserTitle}
    >
      <Section title='Contact Details' variant='withHeaderBar'>
        {!isUpdateProfilePhotoHidden && (
          <WidgetErrorBoundary emptyOnError>
            <GridItemField label='Profile Image' alignItems='center'>
              <RoleAvatarEditor
                roleId={representativeId}
                roleType={RoleType.COMPANY_REPRESENTATIVE}
              />
            </GridItemField>
          </WidgetErrorBoundary>
        )}
        {loading ? (
          <RepresentativeEditFormSkeletonLoader />
        ) : (
          representative && (
            <RepresentativeForm
              onClose={handleClose}
              clientIdOrRepresentative={representative}
            />
          )
        )}
      </Section>
    </ContentWrapper>
  )
}

export default EditCompanyRepresentative
