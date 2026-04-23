import React, { FC, memo } from 'react'
import { Typography, Grid, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { camelCase } from 'lodash-es'
import MultilineComment from '@staff-portal/billing/src/components/MultilineComment'

import { BillingCycleItemFragment } from '../../../../../__fragments__/billingCycleItemFragment.graphql.types'
import * as S from './styles'
import Duration from '../Duration'

const displayName = 'TimesheetSummary'

interface Props {
  hours: number
  minutes: number
  timesheet: BillingCycleItemFragment
  isEdit?: boolean
}

const GridItem = Grid.Item
const FormTextarea = Form.Input

const LabelColSpan = 7
const HoursColSpan = 5

const TimesheetSummary: FC<Props> = memo<Props>(
  // eslint-disable-next-line
  ({ hours, minutes, timesheet, isEdit = false }) => {
    const {
      minimumCommitment,
      timesheetComment,
      timesheetSubmitted = false
    } = timesheet

    const { t: translate } = useTranslation('timesheet')

    const chargeMinCommitment =
      timesheetSubmitted &&
      minimumCommitment?.applicable &&
      minimumCommitment.minimumHours > hours
    const minimumCommitmentInapplicable =
      timesheetSubmitted &&
      minimumCommitment?.applicable === false &&
      minimumCommitment.minimumHours > hours
    const hoursLabel = !timesheetSubmitted
      ? 'totalHours'
      : chargeMinCommitment
      ? 'hoursSubmitted'
      : 'totalHoursCharged'

    return (
      <Container bottom={1} data-testid={displayName}>
        <Grid spacing={0}>
          <GridItem css={S.gridItem} small={12}>
            <Grid spacing={0}>
              <GridItem css={S.colSummary}>
                <Typography size='medium' variant='heading'>
                  {translate('TimesheetSummary.summary')}
                </Typography>
              </GridItem>
              <GridItem css={S.colComment}>
                <Typography size='medium' variant='heading'>
                  {translate('TimesheetSummary.additionalNote')}
                </Typography>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem css={S.gridItem} small={12}>
            <Grid spacing={0}>
              <GridItem css={S.colSummary}>
                <Grid spacing={0}>
                  <GridItem small={LabelColSpan}>
                    <Typography size='medium'>
                      {translate(`TimesheetSummary.${hoursLabel}` as const)}
                    </Typography>
                  </GridItem>
                  <GridItem small={HoursColSpan}>
                    <Typography size='medium' data-testid='totalHours'>
                      <Duration hours={hours} minutes={minutes} />
                    </Typography>
                  </GridItem>
                </Grid>
                {chargeMinCommitment && (
                  <>
                    <Grid spacing={0}>
                      <GridItem small={LabelColSpan}>
                        <Typography size='medium'>
                          {translate('TimesheetSummary.minimumCommitment')}
                        </Typography>
                      </GridItem>
                      <GridItem small={HoursColSpan}>
                        <Typography size='medium' data-testid='minimumHours'>
                          <Duration
                            hours={minimumCommitment?.minimumHours}
                            minutes={0}
                          />
                        </Typography>
                      </GridItem>
                    </Grid>
                    <Grid spacing={0}>
                      <GridItem small={LabelColSpan}>
                        <Typography size='medium'>
                          {translate('TimesheetSummary.totalHoursCharged')}
                        </Typography>
                      </GridItem>
                      <GridItem small={HoursColSpan}>
                        <Typography size='medium' data-testid='chargedHours'>
                          <Duration
                            hours={minimumCommitment?.minimumHours}
                            minutes={0}
                          />
                        </Typography>
                      </GridItem>
                    </Grid>
                  </>
                )}
                {minimumCommitment && minimumCommitmentInapplicable && (
                  <Grid spacing={0}>
                    <GridItem small={10}>
                      <Typography size='medium'>
                        {translate(
                          `TimesheetSummary.${
                            camelCase(
                              `reason_${minimumCommitment.reasonNotApplicable}`
                            ) as
                              | 'reasonHasBreak'
                              | 'reasonIsTrial'
                              | 'reasonNotFullLength'
                          }` as const
                        )}
                      </Typography>
                    </GridItem>
                  </Grid>
                )}
              </GridItem>
              <GridItem css={S.colComment}>
                {isEdit ? (
                  <FormTextarea
                    css={S.inputComment}
                    multiline
                    multilineResizable
                    placeholder={translate(
                      'TimesheetEditForm.form.comment.placeholder'
                    )}
                    rowsMin={4}
                    width='full'
                    name='timesheetComment'
                    data-testid='timesheetComment'
                  />
                ) : (
                  timesheetComment && (
                    <Typography data-testid='timesheetComment' size='medium'>
                      <MultilineComment>{timesheetComment}</MultilineComment>
                    </Typography>
                  )
                )}
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    )
  }
)

TimesheetSummary.displayName = displayName

export default TimesheetSummary
