import React from 'react'
import { Section, SkeletonLoader, Table } from '@toptal/picasso'

const EngagementInterviewsLoader = () => {
  return (
    <Section variant='withHeaderBar' title='Interviews'>
      <Table>
        <Table.Body>
          {[...new Array(2)].map((_, index) => (
            <Table.Row
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <Table.Cell>
                <SkeletonLoader.Typography />
              </Table.Cell>
              <Table.Cell>
                <SkeletonLoader.Typography />
              </Table.Cell>
              <Table.Cell>
                <SkeletonLoader.Typography />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Section>
  )
}

export default EngagementInterviewsLoader
