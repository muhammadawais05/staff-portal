import React, { useState } from 'react'
import { Button, SkeletonLoader } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { useNotifications } from '@toptal/picasso/utils'
import { downloadByUrl } from '@staff-portal/utils'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import { getMessagesFromErrors } from '@staff-portal/billing/src/_lib/helpers/apollo'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

import {
  useGetDownloadExpectedCommissionsOperationQuery,
  useDownloadExpectedCommissionsMutation
} from '../../data'

const ExpectedCommissionsPageActions = () => {
  const [isActionPending, setActionPending] = useState(false)
  const { showError } = useNotifications()
  const { t: translate } = useTranslation('expectedCommissions')
  const { data, loading, initialLoading } =
    useGetDownloadExpectedCommissionsOperationQuery()
  const { handleOnRootLevelError, handleOnError } = useFormSubmission()

  const [downloadExpectedCommissions] = useDownloadExpectedCommissionsMutation({
    onError: handleOnError,
    onRootLevelError: handleOnRootLevelError
  })

  const submitDownloadRequest = async () => {
    setActionPending(true)
    const { data = {} } = await downloadExpectedCommissions({
      variables: {
        input: {}
      }
    })
    const responseObject = data?.downloadExpectedCommissions

    if (Boolean(responseObject?.success) && responseObject?.downloadUrl) {
      downloadByUrl(responseObject.downloadUrl)
    } else {
      showError(getMessagesFromErrors({ errors: responseObject?.errors }))
    }
    setActionPending(false)
  }

  return (
    <ContentLoader
      as='span'
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<SkeletonLoader.Button />}
    >
      <OperationWrapper
        isLoading={isActionPending}
        operation={data?.viewer?.operations?.downloadExpectedCommissions}
      >
        <Button
          size='small'
          data-testid='download-expected-commissions'
          onClick={submitDownloadRequest}
        >
          {translate('header.actions.download')}
        </Button>
      </OperationWrapper>
    </ContentLoader>
  )
}

export default ExpectedCommissionsPageActions
