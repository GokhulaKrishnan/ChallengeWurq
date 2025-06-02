import AsyncStorage from "@react-native-async-storage/async-storage"
import { wod } from "@/services/api"
import { Alert } from "react-native"

// Storage Key to access the local storage
const USERS_STORAGE_KEY = "user_wod@"

/**
 * This makes use of Asynchronous Local storage to persist the data
 * @param name The name entered by the user.
 * @param points The points entered by the user.
 */
export const saveWodData = async (name: string, points: string) => {
  try {
    // Creating new wod details
    const wodDetails: wod = {
      wodName: name,
      wodPoints: points,
    }

    // Saving one WOD detail in the local storage
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(wodDetails))
  } catch (error) {
    Alert.alert("Error", "Failed to save user")
    throw new Error("Failed to Save data in the local storage")
  }
}

export const getWodDetails = async (): Promise<wod | null> => {
  // Here we set the loading state
  try {
    // Getting the details from the local storage
    const wodDetailJson = await AsyncStorage.getItem(USERS_STORAGE_KEY)

    // Setting the states
    if (wodDetailJson) {
      return JSON.parse(wodDetailJson)
    } else {
      return null
    }
  } catch (error) {
    console.log(`Error fetching the user from the Local Storage: ${error}`)
    return null
  }
}
