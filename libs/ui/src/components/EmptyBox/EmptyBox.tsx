import React, { ReactNode } from 'react'

const EmptyBox = (props: { children?: ReactNode }) => {
  return <svg width={160} height={160} xmlns='http://www.w3.org/2000/svg' {...props}>
    <title>{'Image/Empty Box'}</title>
    <g fill='none'>
      <path d='M0 0h160v160H0z' />
      <path
        d='M156 154H4a3 3 0 0 1-3-3v5a3 3 0 0 0 3 3h152a3 3 0 0 0 3-3v-5a3 3 0 0 1-3 3ZM159.5 79.5l-20-20h-119l-20 20'
        fill='#183A9E'
        opacity={0.15}
      />
      <path
        stroke='#204ECF'
        d='m159.5 79.5-20-20h-119l-20 20M80.5 1v15M40 11l8 13M11 40l13 8M149 40l-13 8M120 11l-8 13M20.5 60v16M139.5 60v16M.5 79.5v77a3 3 0 0 0 3 3h153a3 3 0 0 0 3-3v-77m-4.5 0H5'
      />
      <path
        d='M92.5 107.5h-25a4 4 0 1 1 0-8h25a4 4 0 1 1 0 8Z'
        fill='#183A9E'
        opacity={0.15}
      />
      <path
        d='M92.5 107.5h-25a4 4 0 1 1 0-8h25a4 4 0 1 1 0 8Z'
        stroke='#204ECF'
      />
    </g>
  </svg>
}

export default EmptyBox
