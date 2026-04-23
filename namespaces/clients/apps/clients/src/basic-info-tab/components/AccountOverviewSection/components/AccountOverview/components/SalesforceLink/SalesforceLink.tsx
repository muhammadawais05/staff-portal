import React, { useCallback } from 'react'
import { Button, Container } from '@toptal/picasso'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { LazyOperation } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { useFieldPollingUpdate } from '@staff-portal/data-layer-service'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyOverviewFragment } from '../../../../data'
import { usePushClientToSalesforce } from './data'
import { GetClientSalesforceLinkDocument } from '../../data/get-client-salesforce-link.staff.gql.types'

interface Props {
  clientId: string
  salesforceLink?: CompanyOverviewFragment['salesforceLink']
  operation: CompanyOperationFragment
}

const SUCCESS_MESSAGE = 'Client has been pushed to Salesforce'

const SalesforceLink = ({
  clientId,
  salesforceLink,
  operation: pushClientToSalesforceOperation
}: Props) => {
  const { text, url } = salesforceLink || {}
  const { handleMutationResult } = useHandleMutationResult()

  const { polling, startPolling } = useFieldPollingUpdate(
    GetClientSalesforceLinkDocument,
    {
      variables: {
        clientId
      },
      pollInterval: 15000,
      maxAttempts: 6
    }
  )

  const [pushClientToSalesforce, { loading: submitLoading }] =
    usePushClientToSalesforce()

  const pushClient = useCallback(async () => {
    const { data } = await pushClientToSalesforce({
      variables: { input: { clientId } }
    })

    return handleMutationResult({
      mutationResult: data?.pushClientToSalesforce,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: startPolling
    })
  }, [pushClientToSalesforce, clientId, handleMutationResult, startPolling])

  return (
    <Container flex justifyContent='space-between'>
      <TypographyOverflowLink weight='semibold' size='medium'>
        <LinkWrapper
          data-testid='SalesforceLink-link'
          wrapWhen={Boolean(url)}
          href={url as string}
          target='_blank'
        >
          {text || NO_VALUE}
        </LinkWrapper>
      </TypographyOverflowLink>

      <LazyOperation
        initialOperation={pushClientToSalesforceOperation}
        hidden={!!url}
        getLazyOperationVariables={{
          nodeId: clientId,
          nodeType: NodeType.CLIENT,
          operationName: 'pushClientToSalesforce'
        }}
      >
        {({ loading, disabled }) => (
          <Container left='small'>
            <Button
              onClick={pushClient}
              variant='secondary'
              size='small'
              loading={loading || submitLoading || polling}
              disabled={disabled || submitLoading || polling}
            >
              Push to Salesforce
            </Button>
          </Container>
        )}
      </LazyOperation>
    </Container>
  )
}

export default SalesforceLink
