import React from 'react'

type Props = {
  skills: string[]
}

const RequestSkills = ({ skills }: Props) => {
  if (!skills.length) {
    return null
  }

  return <div>{skills.join(' ')}</div>
}

export default RequestSkills
