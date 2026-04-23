import React, { ReactNode } from 'react'

export const translateWithComponent = (
  baseString: string,
  Component: React.FC<{ children: ReactNode }>
) => {
  const parts = baseString.split('<0>')
  const partsInnerEnd = parts[1].split('</0>')

  return (
    <>
      {parts[0]}
      <Component>{partsInnerEnd[0]}</Component>
      {partsInnerEnd[1]}
    </>
  )
}
