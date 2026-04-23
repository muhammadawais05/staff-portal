import React from 'react'

interface Props {
  value?: string | number | null
}

const EligibleJobsStatsFiled = ({ value }: Props) => <>{value ?? 'N/A'}</>

export default EligibleJobsStatsFiled
