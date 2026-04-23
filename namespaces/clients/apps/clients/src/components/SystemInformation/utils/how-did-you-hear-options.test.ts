import { howDidYouHearOptions } from './how-did-you-hear-options'

describe('howDidYouHearOptions', () => {
  it('returns all options', () => {
    expect(howDidYouHearOptions).toEqual([
      { text: 'Online Video', value: 'ONLINE_VIDEO' },
      { text: 'Podcast', value: 'PODCAST' },
      { text: 'Search Engine Ad', value: 'SEARCH_ENGINE_AD' },
      { text: 'Search Engine Result', value: 'SEARCH_ENGINE_RESULT' },
      { text: 'Billboard or Outdoor Ad', value: 'BILLBOARD_OR_OUTDOOR_AD' },
      { text: 'Blog Post', value: 'BLOG_POST' },
      { text: 'Hacker News', value: 'HACKER_NEWS' },
      { text: 'Facebook', value: 'FACEBOOK' },
      { text: 'Linkedin', value: 'LINKEDIN' },
      { text: 'Quora', value: 'QUORA' },
      { text: 'Display Ad', value: 'DISPLAY_AD' },
      { text: 'Facebook Ad', value: 'FACEBOOK_AD' },
      { text: 'Linkedin Ad', value: 'LINKEDIN_AD' },
      { text: 'Friend or Colleague', value: 'FRIEND_OR_COLLEAGUE' },
      { text: 'Event', value: 'EVENT' },
      { text: 'News Article', value: 'NEWS_ARTICLE' },
      { text: 'A Toptaler', value: 'A_TOPTALER' },
      { text: 'A Toptal Employee', value: 'A_TOPTAL_EMPLOYEE' },
      { text: 'A Toptal Customer', value: 'A_TOPTAL_CUSTOMER' },
      { text: 'Referral', value: 'REFERRAL' },
      { text: 'Other', value: 'OTHER' },
      { text: 'Reddit', value: 'REDDIT' }
    ])
  })
})
