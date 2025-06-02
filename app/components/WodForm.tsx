import { wodForm } from "@/services/api"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

/**
 * This component is used to render the form in the WOD Screen
 * @param param0 The props required to trigger state change, submit and to display the values
 * @returns
 */
export const WodForm = ({ name, points, onNameChange, onPointsChange, onSubmit }: wodForm) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Points</Text>
        <TextInput style={styles.input} value={`${points}`} onChangeText={onPointsChange} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={onNameChange} />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    height: 210,
    marginTop: 15,
  },
  inputGroup: {
    marginBottom: 8,
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
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
    height: 50,
  },

  submitButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 6,
    width: 230,
    marginLeft: 80,
    height: 50,
  },
  submitButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
})
