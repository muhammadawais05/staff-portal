import { Container, Typography } from '@toptal/picasso'
import React, { ReactNode, useMemo } from 'react'
import { MatchQualityMetricName } from '@staff-portal/graphql/staff'
import { DetailedList as DL, generateDetailedListRows } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'
import { NO_VALUE } from '@staff-portal/config'

import { TalentMatchQualityFragment } from '../../data/talent-match-quality-fragment/talent-match-quality-fragment.staff.gql.types'
import MatchQualityLabel from '../MatchQualityLabel/MatchQualityLabel'
import MatchQualityValue from '../MatchQualityValue/MatchQualityValue'
import * as S from './styles'

interface Props {
  fieldNames: MatchQualityMetricName[]
  metrics: TalentMatchQualityFragment[]
  title: ReactNode
}

const MatchQualitySubSection = ({ fieldNames, metrics, title }: Props) => {
  const items = useMemo(() => {
    const fields = fieldNames
      .map(fieldName => metrics.find(({ name }) => name === fieldName))
      .filter(isNotNullish)

    return generateDetailedListRows(fields, 2)
  }, [fieldNames, metrics])

  return (
    <Container top='small' bottom='small' css={S.container}>
      <Container bottom='xsmall'>
        <Typography variant='heading' size='small'>
          {title}
        </Typography>
      </Container>

      <DL defaultValue={NO_VALUE} labelColumnWidth={20}>
        {items.map((rowItems, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <DL.Row key={index}>
            {rowItems.map(item => (
              <DL.Item
                key={item.label}
                label={
                  <MatchQualityLabel
                    label={item.label}
                    link={item.labelLink}
                    labelTooltip={item.labelTooltip}
                  />
                }
              >
                <MatchQualityValue
                  value={item.value}
                  tooltipContent={item.valueTooltip}
                />
              </DL.Item>
            ))}
          </DL.Row>
        ))}
      </DL>
    </Container>
  )
}

export default MatchQualitySubSection
