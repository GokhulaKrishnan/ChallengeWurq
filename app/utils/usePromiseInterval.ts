import { useEffect, useRef, useState } from "react"

/**
 * This custom hook is used to create a Promise and returns it once it is called 3 times each at an interval of 1 second
 * @returns An alert Message indicating the Promise is resolved
 */
export const usePromiseInterval = () => {
  const [alertMessage, setAlertMessage] = useState("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Implementing a Promise that is returned after 3 intervals of each 1 second
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    // Creating a Promise
    const threeSecondPromise = new Promise<string>((resolve) => {
      let count: number = 0
      const interval = setInterval(() => {
        count = count + 1
        if (count === 3) {
          // Cleanup function
          if (intervalRef.current) {
            clearInterval(interval)
            intervalRef.current = null
          }
          resolve("Promise completed!")
        }
      }, 1000)
    })

    // Alerting after the promise is resolved
    threeSecondPromise.then((message: string) => {
      setAlertMessage(message)
    })

    // Cleanup function to avoid memory leaks
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  return alertMessage
}
