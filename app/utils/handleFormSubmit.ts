import { useState } from "react"
import { Alert } from "react-native"
import { saveWodData } from "./storage/localStorage"
import { wodValidation } from "./wodValidation"

/**
 * This is used to handle the submission of the form
 * @returns The states and the state setters and the function to submit
 */
export const handleFormSubmit = () => {
  const [name, setName] = useState("")
  const [points, setPoints] = useState("")
  const [refresh, setRefresh] = useState(0)

  const handleSubmit = async () => {
    try {
      // Validating the data
      const validation = wodValidation(name, points)
      if (!validation.isValid) {
        Alert.alert("Error:", validation.errorMessage)
        return
      }

      // Savng the data
      await saveWodData(name, points)

      // Triggering re-render to update the Card
      setRefresh((prev) => prev + 1)
      // Resetting the state
      setName("")
      setPoints("")
    } catch (error) {
      Alert.alert("Failed to save user data")
    }
  }

  return {
    name,
    points,
    refresh,
    setName,
    setPoints,
    handleSubmit,
  }
}
