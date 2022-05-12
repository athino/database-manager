import {useEffect, RefObject} from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useClickExclusion = (ignoreRefList: RefObject<any>[], handler: (...args : any[]) => any) => {
  useEffect(() => {
    const handleClickOutside = ({target}: MouseEvent) => {
      const ignore = ignoreRefList.map((ref) => !(ref.current && !ref.current.contains(target))).includes(true)

      if (!ignore) {
        handler()
      }
    }

    addEventListener('mousedown', handleClickOutside)

    return () => {
      removeEventListener('mousedown', handleClickOutside)
    }
  }, [ignoreRefList, handler])
}
