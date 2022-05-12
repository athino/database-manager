import {useEffect, useRef} from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useInterval = (func: (...args: any[]) => any, delay: number) => {
  const ref = useRef<number>()

  useEffect(() => {
    ref.current = window.setInterval(func, delay)

    return () => {
      window.clearInterval(ref.current)
    }
  }, [])

  return null
}
