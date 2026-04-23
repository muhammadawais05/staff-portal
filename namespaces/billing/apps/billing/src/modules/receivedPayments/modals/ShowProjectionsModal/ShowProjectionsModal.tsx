import { useTranslation } from 'react-i18next'
import React from 'react'
import { Amount, Container, Modal, Typography } from '@toptal/picasso'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'

import { useGetProjectedCommissionsQuery } from '../../data/getProjectedCommissions.graphql.types'
import * as S from './styles'

const displayName = 'ShowProjectionsModal'

export const ShowProjectionsModal = () => {
  const { t: translate } = useTranslation('receivedPayments')

  const { data, loading, initialLoading } = useGetProjectedCommissionsQuery({
    fetchPolicy: 'no-cache'
  })

  return (
    <>
      <Modal.Title data-testid={`${displayName}-title`}>
        {translate('modals.projections.title')}
      </Modal.Title>
      <Modal.Content>
        <ContentLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={<ModalSkeleton title='' />}
        >
          <ul css={S.rulesList}>
            {data?.viewer?.projectedCommissions?.rules?.map(rule => {
              return (
                <li key={`${rule.commission}-${rule.description}`}>
                  <Typography size='xsmall'>
                    <Typography weight='semibold' inline as='span'>
                      {rule.commission}
                    </Typography>{' '}
                    {rule.description}
                  </Typography>
                </li>
              )
            })}
          </ul>

          <Container top={1} bottom={1}>
            <Typography size='xsmall'>
              {translate('modals.projections.totalsHeader')}
            </Typography>
          </Container>

          <Container data-testid='weekly-projections' top={1} bottom={1}>
            <Typography size='xsmall'>
              <Typography weight='semibold' inline as='span'>
                {translate('modals.projections.weekly')}
              </Typography>
              <Amount
                amount={data?.viewer?.projectedCommissions?.weekly ?? ''}
              />
              <Typography data-testid='asterisk' inline as='span' color='red'>
                *
              </Typography>
            </Typography>
          </Container>

          <Container data-testid='monthly-projections' top={1} bottom={1}>
            <Typography size='xsmall'>
              <Typography weight='semibold' inline as='span'>
                {translate('modals.projections.monthly')}
              </Typography>
              <Amount
                amount={data?.viewer?.projectedCommissions?.monthly ?? ''}
              />
              <Typography data-testid='asterisk' inline as='span' color='red'>
                *
              </Typography>
            </Typography>
          </Container>

          <Container data-testid='yearly-projections' top={1} bottom={1}>
            <Typography size='xsmall'>
              <Typography weight='semibold' inline as='span'>
                {translate('modals.projections.yearly')}
              </Typography>
              <Amount
                amount={data?.viewer?.projectedCommissions?.yearly ?? ''}
              />
              <Typography data-testid='asterisk' inline as='span' color='red'>
                *
              </Typography>
            </Typography>
          </Container>

          <Container top={1}>
            <Typography data-testid='asterisk' inline as='span' color='red'>
              *
            </Typography>
            <Typography inline size='xsmall'>
              {translate('modals.projections.footerNote')}
            </Typography>
          </Container>
        </ContentLoader>
      </Modal.Content>
      <ModalFooter />
    </>
  )
}

ShowProjectionsModal.displayName = displayName

export default ShowProjectionsModal
