import { WodCard } from "@/components/WodCard"
import { WodGraph } from "@/components/WodGraph"
import { useState } from "react"
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface wod {
  wodName: string
  wodPoints: string
}

/*
 * This screen renders the WOD graph, WODbDetail Card and the Text Input to get the data from the user
 * We use the local storage async to store the details that needs to be rendered in the card
 */
export const WodUiScreen = () => {
  const [name, setName] = useState("")
  const [points, setPoints] = useState("")
  const [refresh, setRefresh] = useState(0)

  // Storage Key to access the local storage
  const USERS_STORAGE_KEY = "user_wod@"

  // Function to store the users in the local storage
  const saveWod = async () => {
    // Checking whether the datas are entered
    if (!name && !points) {
      Alert.alert("Error", "Please fill the values")
      return
    }

    try {
      // Creating new wod details
      const wodDetails: wod = {
        wodName: name,
        wodPoints: points,
      }

      // Saving one WOD detail in the local storage
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(wodDetails))

      // To refresh the component when someone hits the save button inorder to render the given information
      setRefresh((prev) => prev + 1)
      // Clearing the input fields
      setName("")
      setPoints("")
    } catch (error) {
      Alert.alert("Error", "Failed to save user")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <WodGraph />
      <WodCard refresh={refresh} />
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Points</Text>
          <TextInput style={styles.input} value={`${points}`} onChangeText={setPoints} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={saveWod}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2d404b",
  },
  formContainer: {
    height: "30%",
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
    width: 230,
    marginLeft: 80,
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1c252c",
    color: "white",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  output: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#3a4d5a",
    borderRadius: 6,
  },
  submitButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
    width: 230,
    marginLeft: 80,
  },
  submitButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
})
