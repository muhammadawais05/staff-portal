import React, { ReactElement } from 'react'

export const ShowMore = ({ children }: { children: ReactElement }) => (
  <>
    {children}
    <div>Show more</div>
  </>
)

export default ShowMore
