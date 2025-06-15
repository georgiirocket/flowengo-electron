import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMainResize = () => {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const resize = () => {
      if (mainRef.current) {
        mainRef.current.style.width = `${window.innerWidth}px`
        mainRef.current.style.height = `${window.innerHeight}px`
      }

      window.document.body.style.width = `${window.innerWidth}px`
      window.document.body.style.height = `${window.innerHeight}px`

      document.documentElement.style.width = `${window.innerWidth}px`
      document.documentElement.style.height = `${window.innerHeight}px`
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return { mainRef }
}
