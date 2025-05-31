import { useStores } from "@/models"
import { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, Text, View } from "react-native"

/*
 * This screen renders the user data as a single text box.
 * Starts a timer when the component is mounted
 * Returns a promise which is returned after calling 3 times each at an interval of 1 second.
 */
export const DisplayUserTimerScreen = () => {
  // Getting the sesssion store
  const { sessionStore } = useStores()

  // State to keep track of the timer
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  // State to display a note on top right once the promise is resolved
  const [alertMessage, setAlertMessage] = useState("")

  // Hook to load the user as the component loads
  useEffect(() => {
    sessionStore.loadSession()
  }, [])

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
    const intervalId = setInterval(() => {
      timer()
    }, 1000)

    // To avoid memory leak, cleaning the interval
    return () => clearInterval(intervalId)
  }, [])

  // Creating a function which gets all the data and format it into a single string
  const formatUserData = (): string => {
    // Get the data from the store
    const sessionData = sessionStore.positiveAgeUsers

    // Map through it and format it
    return sessionData
      .map(
        (item) =>
          `Name: ${item.user.name} ${item.user.lastname}  Age: ${item.user.age}  Location: ${item.location} \nDate: ${item.date}    Fee: ${item.user.fee}\n`,
      )
      .join("\n\n")
  }

  // Implementing a Promise that is returned after 3 intervals of each 1 second
  useEffect(() => {
    const threeSecondPromise = new Promise<string>((resolve) => {
      let count: number = 0
      const interval = setInterval(() => {
        count = count + 1
        if (count === 3) {
          clearInterval(interval)
          resolve("Promise completed!")
        }
      }, 1000)
    })

    threeSecondPromise.then((message: string) => {
      setAlertMessage(message)
    })
  }, [])

  // Showing the loading state when user is being fetched
  if (sessionStore.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading users...</Text>
      </View>
    )
  }

  return (
    <>
      <ScrollView>
        <View>{alertMessage != "" && <Text>{alertMessage}</Text>}</View>

        <View>
          <Text>
            {hour < 10 ? `0${hour}` : hour} : {minute < 10 ? `0${minute}` : minute} :{" "}
            {second < 10 ? `0${second}` : second}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "monospace",
              borderWidth: 1,
              borderColor: "red",
              padding: 10,
            }}
          >
            {formatUserData()}{" "}
          </Text>
        </View>
      </ScrollView>
    </>
  )
}
