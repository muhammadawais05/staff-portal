import React, { memo } from 'react'
import { Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ItemsTable } from '@staff-portal/ui'
import { isOperationHidden } from '@staff-portal/operations'
import { TALENT_UPDATED, ROLE_STEP_UPDATED } from '@staff-portal/talents'

import {
  useGetTalentOnlineTests,
  TalentOnlineTestAttemptFragment
} from './data/get-talent-online-results'
import {
  TalentOnlineTestsStatus,
  TalentOnlineTestsTableHeader,
  TalentOnlineTestsItem
} from './components'

const getRenderRow =
  (talentId: string, isActionsVisible: boolean) =>
  (
    {
      id,
      test,
      testUrl,
      resultUrl,
      createdAt,
      canceledAt,
      finishedAt,
      pending,
      tracked,
      maxScore,
      pureScore,
      operations,
      __typename
    }: TalentOnlineTestAttemptFragment,
    index: number
  ) => {
    const statusText = (
      <TalentOnlineTestsStatus
        pending={pending}
        canceledAt={canceledAt}
        pureScore={pureScore}
        maxScore={maxScore}
        testUrl={testUrl}
        resultUrl={resultUrl}
        acceptThreshold={test?.acceptThreshold}
        rejectThreshold={test?.rejectThreshold}
      />
    )

    return (
      <TalentOnlineTestsItem
        key={id}
        id={id}
        isActionsVisible={isActionsVisible}
        testName={test?.name}
        createdAt={createdAt}
        finishedAt={finishedAt}
        tracked={tracked}
        statusText={statusText}
        operations={operations}
        typename={__typename}
        talentId={talentId}
        stripeEven={Boolean(index % 2)}
      />
    )
  }

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentOnlineTestsSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const { showError } = useNotifications()

  const { data, loading, refetch } = useGetTalentOnlineTests(talentId, {
    onError: () => {
      showError('Unable to fetch online tests.')
    }
  })

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === talentId && refetch()
  )
  useMessageListener([ROLE_STEP_UPDATED], refetch)

  const hasVisibleOperations = !!data?.onlineTestAttempts?.nodes.some(node => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { __typename, ...operations } = node.operations

    return Object.values(operations).some(val => !isOperationHidden(val))
  })

  if (loading) {
    return null
  }

  return (
    <Section
      title='Online Tests'
      variant={sectionVariant}
      data-testid='talent-online-tests-section'
    >
      {!data?.onlineTestAttempts?.nodes.length ? (
        <Typography size='medium'>
          No online test screening steps have been claimed for this talent so
          far.
        </Typography>
      ) : (
        <ItemsTable
          renderHeader={() => (
            <TalentOnlineTestsTableHeader
              actionsVisible={hasVisibleOperations}
            />
          )}
          renderRow={getRenderRow(talentId, hasVisibleOperations)}
          data={data.onlineTestAttempts.nodes}
        />
      )}
    </Section>
  )
}

export default memo(TalentOnlineTestsSection)
