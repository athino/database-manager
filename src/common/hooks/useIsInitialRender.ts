import {useEffect, useRef} from 'react'

export const useIsInitialRender = () => {
  const ref = useRef(true)

  useEffect(() => {
    ref.current = false
  }, [])

  return ref.current
}
