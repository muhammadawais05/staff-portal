import { Button, Container, Input, Link16, Typography } from '@toptal/picasso'
import React from 'react'
import { ReferralsWidget } from '@staff-portal/graphql/staff'
import { useCopyToClipBoard } from '@staff-portal/clipboard'

import ReferralRewardsIcon from '../ReferralRewardsIcon/ReferralRewardsIcon'
import SocialButtons from '../SocialButtons/SocialButtons'
import * as S from './styles'
import { getReferralRewardsDescription } from '../../services/get-referral-rewards-description/get-referral-rewards-description'

type Props = Pick<
  ReferralsWidget,
  | 'referralSlug'
  | 'referralUrl'
  | 'companySourcingCommission'
  | 'talentSourcingCommission'
>

const ReferringSteps = ({
  referralSlug,
  referralUrl,
  companySourcingCommission,
  talentSourcingCommission
}: Props) => {
  const rewardDescription = getReferralRewardsDescription({
    companySourcingCommission,
    talentSourcingCommission
  })

  const { copyToClipboard } = useCopyToClipBoard()

  const copy = async () => {
    await copyToClipboard({
      data: referralUrl || '',
      successMessage: 'Your referral link was copied to clipboard.'
    })
  }

  return (
    <Container
      bordered
      rounded
      padded='medium'
      top='large'
      data-testid='referring-steps'
    >
      <Typography variant='heading' size='small'>
        How to Start Earning Commissions
      </Typography>

      <Container top='medium' flex>
        <Container css={S.block}>
          <Typography variant='heading' size='small'>
            1) Copy Your Link
          </Typography>

          <Container top='small'>
            <Input width='full' icon={<Link16 />} value={referralUrl || ''} />
            <Container top='xsmall' bottom='small'>
              <Button variant='positive' fullWidth onClick={copy}>
                Copy Link
              </Button>
            </Container>

            <Typography size='medium' color='dark-grey'>
              Here's your own unique hashtag.
              <br />
              Add to Toptal URLs &amp; share to get rewards!
            </Typography>

            <Container top='xsmall' css={S.slugBox}>
              <Typography size='medium' color='dark-grey' weight='semibold'>
                #{referralSlug}
              </Typography>
            </Container>
          </Container>
        </Container>

        <Container css={S.block}>
          <Typography variant='heading' size='small'>
            2) Share It With Others
          </Typography>
          <Container top='medium'>
            <SocialButtons />
          </Container>
        </Container>

        <Container css={S.block}>
          <Typography variant='heading' size='small'>
            3) Earn Referral Rewards
          </Typography>
          <Container top='small'>
            <ReferralRewardsIcon />
            <Container top='small'>
              <Typography size='medium' color='dark-grey'>
                {rewardDescription}
              </Typography>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default ReferringSteps
