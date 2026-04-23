import React, { FC, memo } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Link } from '@topkit/react-router'
import { Notification, Typography, Container } from '@toptal/picasso'
import WebResourceLinksList from '@staff-portal/billing/src/components/WebResourceLinksList'

import { GetClientJobTemplateQuery } from '../../data/getClientJobTemplate.graphql.types'

type Client = Exclude<GetClientJobTemplateQuery['node'], null | undefined>

interface Props {
  client: Client
}

const displayName = 'JobTemplateWarning'

const JobTemplateWarning: FC<Props> = memo(
  ({ client: { parent = {}, jobTemplateChangeInfo = {} } }) => {
    const { t: translate } = useTranslation('billingDetails')
    const hasParentJobTemplate = parent?.jobTemplate
    const affectedChildrenCount =
      jobTemplateChangeInfo?.affectedChildren?.totalCount
    const excludedChildrenCount =
      jobTemplateChangeInfo?.excludedChildren?.totalCount

    if (
      !hasParentJobTemplate &&
      !affectedChildrenCount &&
      !excludedChildrenCount
    ) {
      return null
    }

    return (
      <Container top={2}>
        <Notification data-testid={displayName}>
          {hasParentJobTemplate && (
            <Typography
              size='medium'
              data-testid={`${displayName}-parent-template`}
            >
              <Trans
                t={translate}
                i18nKey='modals.jobTemplate.warning.hasParentJobTemplate'
                values={{
                  parentFullName: parent?.fullName
                }}
                components={[
                  <Link
                    key={`${displayName}-parent-template-link`}
                    data-testid={`${displayName}-parent-template-link`}
                    href={
                      (parent as Exclude<Client['parent'], null | undefined>)
                        .webResource.url as string
                    }
                  />
                ]}
              />
            </Typography>
          )}
          {affectedChildrenCount && (
            <Typography
              size='medium'
              data-testid={`${displayName}-affected-children`}
            >
              {translate('modals.jobTemplate.warning.hasAffectedChildren', {
                affectedChildrenCount
              })}
            </Typography>
          )}
          {excludedChildrenCount && (
            <Typography size='medium' data-testid={`${displayName}-excluded`}>
              <Trans
                t={translate}
                i18nKey='modals.jobTemplate.warning.hasExcludedChildren'
                values={{ excludedChildrenCount }}
                components={[
                  <WebResourceLinksList
                    key={`${displayName}-excluded-children`}
                    webResources={
                      jobTemplateChangeInfo?.excludedChildren?.nodes
                    }
                    data-testid={`${displayName}-excluded-children-link`}
                  />
                ]}
              />
            </Typography>
          )}
        </Notification>
      </Container>
    )
  }
)

JobTemplateWarning.displayName = displayName

export default JobTemplateWarning
