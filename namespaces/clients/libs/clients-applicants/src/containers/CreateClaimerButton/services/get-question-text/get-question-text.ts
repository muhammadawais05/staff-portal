type Props = {
  obscureLead?: boolean | null
  fullName: string
}

export const getQuestionText = ({ obscureLead, fullName }: Props) =>
  `Are you sure that you want to claim ${
    obscureLead ? 'the applicant' : `"${fullName}"`
  }?`
