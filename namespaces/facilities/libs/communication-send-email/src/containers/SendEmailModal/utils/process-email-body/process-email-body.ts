import {
  PROJECT_BRIEF_START_TOKEN,
  PROJECT_BRIEF_END_TOKEN
} from '../../configs'

const processEmailBody = (emailBody: string) => {
  const regexp = new RegExp(
    `([\\s\\S]*)${PROJECT_BRIEF_START_TOKEN}([\\s\\S]*)${PROJECT_BRIEF_END_TOKEN}([\\s\\S]*)`,
    'gm'
  )

  const matchedGroups = regexp.exec(emailBody)

  if (matchedGroups?.length === 4) {
    matchedGroups.shift()

    return {
      emailBody: matchedGroups.join(''),
      projectBrief: matchedGroups[1]
    }
  }

  return {
    emailBody
  }
}

export default processEmailBody
