import { HowDidYouHearValues } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

export const howDidYouHearOptions = [
  HowDidYouHearValues.ONLINE_VIDEO,
  HowDidYouHearValues.PODCAST,
  HowDidYouHearValues.SEARCH_ENGINE_AD,
  HowDidYouHearValues.SEARCH_ENGINE_RESULT,
  HowDidYouHearValues.BILLBOARD_OR_OUTDOOR_AD,
  HowDidYouHearValues.BLOG_POST,
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
  HowDidYouHearValues.OTHER,
  HowDidYouHearValues.REDDIT
].map(option => ({ text: titleize(option), value: option }))
