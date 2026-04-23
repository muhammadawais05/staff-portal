import {
  PROJECT_BRIEF_START_TOKEN,
  PROJECT_BRIEF_END_TOKEN
} from '../../configs'

const getStyledEmailBody = (emailBody?: string) => {
  if (!emailBody) {
    return ''
  }

  const regexp =
    /([\s\S]*)<< PROJECT BRIEF START >>([\s\S]*)<< PROJECT BRIEF END >>([\s\S]*)/gm

  const matchedGroups = regexp.exec(emailBody)

  if (matchedGroups?.length === 4) {
    matchedGroups[2] = `\n\n${PROJECT_BRIEF_START_TOKEN}\n${matchedGroups[2]}\n${PROJECT_BRIEF_END_TOKEN}\n\n`
    matchedGroups.shift()

    return matchedGroups.join('')
  }

  return emailBody
}

export default getStyledEmailBody
