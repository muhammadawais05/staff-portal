import React, { useEffect, useRef, useState } from 'react'
import { Typography, Loader } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { TalentPortfolioFilePdf } from '@staff-portal/graphql/staff'

import * as S from './styles'

type Props = {
  file: TalentPortfolioFilePdf
}

const PdfDocument = ({ file }: Props) => {
  const fileLoadRef = useRef(file)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (fileLoadRef.current !== file) {
      setIsLoading(true)
    }
  }, [file])

  return (
    <>
      {isLoading && <Loader css={S.loader} />}
      <object
        data={file.fileUrl}
        type='application/pdf'
        css={[S.container, !isLoading && S.containerVisible]}
      >
        <iframe
          src={file.fileUrl}
          css={S.container}
          onLoad={() => setIsLoading(false)}
        >
          <Typography size='xsmall'>
            We’re sorry. Your browser does not support rendering of PDF format.
          </Typography>
          <Link target='_blank' href={file.fileUrl}>
            Download PDF
          </Link>
        </iframe>
      </object>
    </>
  )
}

export default PdfDocument
