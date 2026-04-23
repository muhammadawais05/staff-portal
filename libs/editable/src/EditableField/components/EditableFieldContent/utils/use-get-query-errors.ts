import { useEffect } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { ApolloError } from '@staff-portal/data-layer-service'

// TODO: move this to appropriate place
import usePrevious from './use-previous'

const useGetQueryErrors = (
  [dataError, optionsError]: (ApolloError | undefined)[],
  {
    isToggled,
    setIsToggled
  }: { isToggled: boolean; setIsToggled: (state: boolean) => void }
) => {
  const { showError } = useNotifications()
  const previousDataError = usePrevious(dataError)
  const previousOptionsError = usePrevious(optionsError)

  useEffect(() => {
    // nothing to do here, if there are no initial errors
    if (!dataError && !optionsError) {
      return
    }
    // prevent showing the same error twice
    if (previousDataError || previousOptionsError) {
      return
    }
    // do not display error, if it's already toggled back
    if (!isToggled) {
      return
    }
    // toggle back editor to the viewer state
    setIsToggled(false)
    // show initial data\options request error message
    showError(
      dataError?.message ||
        optionsError?.message ||
        'Fetch failed for editable field'
    )
  }, [
    dataError,
    optionsError,
    setIsToggled,
    isToggled,
    previousDataError,
    previousOptionsError,
    showError
  ])
}

export default useGetQueryErrors
