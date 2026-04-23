import { Container, SkeletonLoader, Table } from '@toptal/picasso'
import React from 'react'

import HiredTalentTable from '../HiredTalentTable'
import HiredTalentTableCells from '../HiredTalentTableCells'
import * as S from './styles'

const HiredTalentSectionSkeletonLoader = () => {
  return <Container top='large'>
    <HiredTalentTable data-testid='hired-talent-section'>
      <Table.Row>
        <HiredTalentTableCells
          talent={<SkeletonLoader.Typography />}
          status={<SkeletonLoader.Typography />}
          actions={
            <>
              <Container right='small' inline>
                <SkeletonLoader.Button circular css={S.button} />
              </Container>
              <SkeletonLoader.Button circular css={S.button} />
            </>
          }
        />
      </Table.Row>
    </HiredTalentTable>
  </Container>
}

export default HiredTalentSectionSkeletonLoader
