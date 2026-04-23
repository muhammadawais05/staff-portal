import React from 'react'

import LinkOverflow from '../LinkOverflow'
import { RepresentativeJobFragment } from '../../../data'

const JobsLinks = ({ jobs }: { jobs?: RepresentativeJobFragment[] }) => (
  <>
    {jobs?.map(({ webResource: link }) => (
      <LinkOverflow link={link} key={link.url} />
    ))}
  </>
)

export default JobsLinks
