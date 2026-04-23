import React from 'react'
import { Container, Section } from '@toptal/picasso'

import DetailedListSkeleton, { Props as DLProps } from '../DetailedListSkeleton'

type Props = Omit<DLProps, 'title'> & {
  title: string | JSX.Element
  dataTestId?: string
}

const SectionWithDetailedListSkeleton = ({
  title,
  labelColumnWidth,
  columns,
  items,
  striped,
  divided,
  dataTestId
}: Props) => (
  <Container top='medium'>
    <Section variant='withHeaderBar' title={title} data-testid={dataTestId}>
      <DetailedListSkeleton
        labelColumnWidth={labelColumnWidth}
        striped={striped}
        divided={divided}
        columns={columns}
        items={items}
      />
    </Section>
  </Container>
)

export default SectionWithDetailedListSkeleton
