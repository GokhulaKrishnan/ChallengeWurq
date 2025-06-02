import { useEffect, useRef, useState } from "react"

/*
 * Custom Hook for managing timer functionality.
 * This returns the time in the correct format.
 */
export const useTimer = () => {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // UseEffect hook to mount timer when it starts
  useEffect(() => {
    const timer = (): void => {
      // Updating the seconds
      setSecond((prevSecond: number) => {
        const newSecond: number = prevSecond + 1

        // Limiting the seconds and returning 0 to start the seconds again
        if (newSecond > 59) {
          setMinute((prevMinute: number) => prevMinute + 1)
          return 0
        }
        // Returning the new second if it is in the limit
        return newSecond
      })

      // Updating the minutes
      setMinute((prevMinute: number) => {
        if (prevMinute > 59) {
          // Change the hour and change minute to 0
          setHour((prevHour: number) => prevHour + 1)
          return 0
        }
        return prevMinute
      })

      // Updating the hours
      setHour((prevHour: number) => {
        if (prevHour > 23) {
          return 0
        }
        return prevHour
      })
    }

    intervalRef.current = setInterval(timer, 1000)

    // To avoid memory leak, cleaning the interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const formattedTime = `${hour < 10 ? `0${hour}` : hour} : ${minute < 10 ? `0${minute}` : minute} : ${second < 10 ? `0${second}` : second}`

  return {
    formattedTime,
  }
}
