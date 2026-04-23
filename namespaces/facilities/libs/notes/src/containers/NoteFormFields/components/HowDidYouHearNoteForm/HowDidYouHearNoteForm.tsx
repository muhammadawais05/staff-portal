import { HowDidYouHearValues } from '@staff-portal/graphql/staff'
import { Container, Grid } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React from 'react'

export const HOW_DID_YOU_HEAR_MAPPING: Record<HowDidYouHearValues, string> = {
  [HowDidYouHearValues.A_TOPTALER]: 'A Toptaler',
  [HowDidYouHearValues.A_TOPTAL_CUSTOMER]: 'A Toptal Customer',
  [HowDidYouHearValues.A_TOPTAL_EMPLOYEE]: 'A Toptal Employee',
  [HowDidYouHearValues.BILLBOARD_OR_OUTDOOR_AD]: 'Billboard or Outdoor Ad',
  [HowDidYouHearValues.BLOG_POST]: 'Blog Post',
  [HowDidYouHearValues.DISPLAY_AD]: 'Display Ad',
  [HowDidYouHearValues.EVENT]: 'Event',
  [HowDidYouHearValues.FACEBOOK]: 'Facebook',
  [HowDidYouHearValues.FACEBOOK_AD]: 'Facebook Ad',
  [HowDidYouHearValues.FRIEND_OR_COLLEAGUE]: 'Friend or Colleague',
  [HowDidYouHearValues.HACKER_NEWS]: 'Hacker News',
  [HowDidYouHearValues.LINKEDIN]: 'LinkedIn',
  [HowDidYouHearValues.LINKEDIN_AD]: 'LinkedIn Ad',
  [HowDidYouHearValues.NEWS_ARTICLE]: 'News Article',
  [HowDidYouHearValues.ONLINE_VIDEO]: 'Online Video',
  [HowDidYouHearValues.OTHER]: 'Other',
  [HowDidYouHearValues.PODCAST]: 'Podcast',
  [HowDidYouHearValues.QUORA]: 'Quora',
  [HowDidYouHearValues.REDDIT]: 'Reddit',
  [HowDidYouHearValues.REFERRAL]: 'Referral',
  [HowDidYouHearValues.SEARCH_ENGINE_AD]: 'Search Engine Ad',
  [HowDidYouHearValues.SEARCH_ENGINE_RESULT]: 'Search Engine Result'
}

const HOW_DID_YOU_HEAR_CONFIGURATION = [
  HowDidYouHearValues.ONLINE_VIDEO,
  HowDidYouHearValues.PODCAST,
  HowDidYouHearValues.SEARCH_ENGINE_AD,
  HowDidYouHearValues.SEARCH_ENGINE_RESULT,
  HowDidYouHearValues.BILLBOARD_OR_OUTDOOR_AD,
  HowDidYouHearValues.BLOG_POST,
  HowDidYouHearValues.REDDIT,
  HowDidYouHearValues.HACKER_NEWS,
  HowDidYouHearValues.FACEBOOK,
  HowDidYouHearValues.LINKEDIN,
  HowDidYouHearValues.QUORA,
  HowDidYouHearValues.DISPLAY_AD,
  HowDidYouHearValues.FACEBOOK_AD,
  HowDidYouHearValues.LINKEDIN_AD,
  HowDidYouHearValues.FRIEND_OR_COLLEAGUE,
  HowDidYouHearValues.EVENT,
  HowDidYouHearValues.NEWS_ARTICLE,
  HowDidYouHearValues.A_TOPTALER,
  HowDidYouHearValues.A_TOPTAL_EMPLOYEE,
  HowDidYouHearValues.A_TOPTAL_CUSTOMER,
  HowDidYouHearValues.REFERRAL,
  HowDidYouHearValues.OTHER
]

const getOptions = () => {
  const options: {
    value: string
    text: string
  }[] = HOW_DID_YOU_HEAR_CONFIGURATION.map(option => ({
    text: HOW_DID_YOU_HEAR_MAPPING[option],
    value: option
  }))

  return [{ text: 'How did they hear about us', value: '' }, ...options]
}

const HowDidYouHearNoteForm = () => (
  <Container bottom='medium'>
    <Grid>
      <Grid.Item small={4}>
        <Form.Select required name='howDidYouHear' options={getOptions()} />
      </Grid.Item>

      <Grid.Item small={8}>
        <Form.Input
          required
          width='full'
          placeholder='Details on how did they hear about us...'
          name='howDidYouHearDetails'
        />
      </Grid.Item>
    </Grid>
  </Container>
)

export default HowDidYouHearNoteForm
