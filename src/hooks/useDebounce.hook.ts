import { useRef } from 'react'

type TProps = {
  debounceTimeout: number
  handler: (...args: any) => void
}

const useDebounce = ({ debounceTimeout, handler }: TProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  return (...args: any) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      handler(...args)
    }, debounceTimeout)
  }
}

export { useDebounce }
