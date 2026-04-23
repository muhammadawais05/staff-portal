export const ERRORS = {
  title: {
    min: 5,
    message: 'Title needs to be at least 5 characters long.'
  },
  description: {
    min: 50,
    message: 'Description needs to be at least 50 characters long.'
  },
  skills: {
    min: 1,
    message: 'At least one skill is required.'
  }
}

export const TITLE_HINT = 'Please provide the topic of the article'
export const TITLE_PLACEHOLDER = `e.g. Show off your expertise in both TypeScript and JavaScript!`
export const DESCRIPTION_PLACEHOLDER = `e.g. I’m reaching out on behalf of the Toptal Engineering Blog. We are seeking a developer to author a 1500-2000 word article on the topic of TypeScript vs. JavaScript, and would love to work with someone on this channel who can bring to the table recent, practical experience with both TS and JS. Be confident that we would offer assistance, direction, and editorial support. We would be with you every step of the way!

Publishing on the blog increases your visibility, providing both colleagues and potential clients with a direct link to your profile.`
export const DESCRIPTION_HINT =
  'Please provide more details for the talent we will approach regarding this request.'
