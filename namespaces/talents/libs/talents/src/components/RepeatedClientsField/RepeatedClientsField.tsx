import React from 'react'
import { Tooltip, Container, Typography, QuestionMark16 } from '@toptal/picasso'

import { TalentRepeatedClientsFragment } from '../../data/talent-repeated-clients-fragment'

export type Props = {
  clientsNumber: TalentRepeatedClientsFragment['engagements']['counters']['clientsNumber']
  repeatedClientsNumber: TalentRepeatedClientsFragment['engagements']['counters']['repeatedClientsNumber']
}

const RepeatedClientsField = ({
  clientsNumber,
  repeatedClientsNumber
}: Props) => {
  return clientsNumber === 0 ? (
    <>Never engaged before</>
  ) : (
    <Container as='span' flex alignItems='center'>
      {repeatedClientsNumber} ({clientsNumber})
      <Tooltip
        content={
          <>
            <Typography>
              <Typography as='span' weight='semibold'>
                Repeated clients
              </Typography>
              : {repeatedClientsNumber} (сlients who had more than 1 approved
              trial with this talent)
              <br />
              <Typography as='span' weight='semibold'>
                Total clients
              </Typography>
              : {clientsNumber} (total number of clients talent had approved
              trials with)
            </Typography>
          </>
        }
        interactive
      >
        <Container
          as='span'
          left='xsmall'
          flex
          data-testid='repeated-clients-tooltip-icon'
        >
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default RepeatedClientsField
