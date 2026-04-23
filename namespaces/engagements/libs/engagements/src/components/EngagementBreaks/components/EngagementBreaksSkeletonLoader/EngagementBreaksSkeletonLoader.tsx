import React from 'react'
import { Container, Table, SkeletonLoader } from '@toptal/picasso'
import { SectionProps } from '@toptal/picasso/Section'
import { SubSection } from '@staff-portal/ui'

type Props = {
  sectionVariant?: SectionProps['variant']
}

const EngagementBreaksSkeletonLoader = ({ sectionVariant }: Props) => (
  <SubSection
    variant={sectionVariant}
    data-testid='engagement-breaks-skeleton-loader'
    title='Breaks'
    actions={<SkeletonLoader.Button size='small' />}
  >
    <Table>
      <Table.Body>
        {[...new Array(5)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Table.Row key={index}>
            <Table.Cell>
              <SkeletonLoader.Typography />
            </Table.Cell>
            <Table.Cell align='right'>
              <Container inline right='small'>
                <SkeletonLoader.Button size='small' />
              </Container>
              <Container inline>
                <SkeletonLoader.Button size='small' />
              </Container>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </SubSection>
)

export default EngagementBreaksSkeletonLoader
