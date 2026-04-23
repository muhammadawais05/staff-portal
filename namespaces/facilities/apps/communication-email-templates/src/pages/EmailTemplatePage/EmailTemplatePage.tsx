import ContentWrapper from '@staff-portal/page-wrapper'
import React, { useCallback, useMemo } from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { DetailedList as DL } from '@staff-portal/ui'
import { Button, SkeletonLoader } from '@toptal/picasso'
import { useHistory, Link } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import { titleize } from '@staff-portal/string'

import { useGetTemplateIdParam } from '../../hooks/use-get-template-id-param'
import * as S from './styles'
import { useGetTemplateData } from '../../hooks/use-get-template-data'

const EmailTemplatePage = () => {
  const { templateId } = useGetTemplateIdParam()
  const { data, loading } = useGetTemplateData({ templateId })
  const history = useHistory()

  const goBack = useCallback(() => {
    history.push(RoutePath.EmailTemplates)
  }, [history])

  const actions = useMemo(
    () => [
      <Button key='back-button' onClick={goBack} variant='secondary'>
        Back
      </Button>
    ],
    [goBack]
  )

  const title = data?.node?.name

  return (
    <ContentWrapper
      title={title}
      browserTitle={title}
      titleLoading={loading}
      actions={actions}
    >
      {!data && loading ? (
        <SkeletonLoader.Typography rows={12} />
      ) : (
        <DL defaultValue={NO_VALUE} labelColumnWidth={12}>
          <DL.Row>
            <DL.Item label='Name'>{data?.node?.name}</DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Raw Template'>
              <pre css={S.rawTemplate}>{data?.node?.rawTemplate}</pre>
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Private'>
              {data?.node?.private ? 'Yes' : 'No'}
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Target Role'>
              {data?.node?.targetRole.title}
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Token'>
              {data?.node?.token ? titleize(data?.node?.token) : NO_VALUE}
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Use Toptal Email Template'>
              {data?.node?.brandedTemplate ? 'Yes' : 'No'}
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Sending Form'>
              {data?.node?.sendingFrom.map(item => titleize(item)).join(', ')}
            </DL.Item>
          </DL.Row>
          <DL.Row>
            <DL.Item label='Created By'>
              <Link href={data?.node?.role?.webResource?.url as string}>
                {data?.node?.role?.fullName}
              </Link>
            </DL.Item>
          </DL.Row>
        </DL>
      )}
    </ContentWrapper>
  )
}

export default EmailTemplatePage
