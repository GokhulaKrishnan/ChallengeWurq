import { WodCard } from "@/components/WodCard"
import { WodGraph } from "@/components/WodGraph"
import { View, ScrollView, StyleSheet, Image } from "react-native"
import WURQLogo from "../../assets/images/WURQLogo.png"
import { handleFormSubmit } from "@/utils/handleFormSubmit"
import { WodForm } from "@/components/WodForm"

/*
 * This screen renders the WOD graph, WODbDetail Card and the Text Input to get the data from the user
 * We use the local storage async to store the details that needs to be rendered in the card
 */
export const WodUiScreen = () => {
  // Getting the details from the helper functions
  const { name, points, refresh, setName, setPoints, handleSubmit } = handleFormSubmit()

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.logoBar}>
        <Image
          style={{ height: 20, width: 180, borderColor: "red" }}
          resizeMode="cover"
          source={WURQLogo}
        />
      </View>
      <View style={styles.bodyContainer}>
        <WodGraph />
        <WodCard refresh={refresh} />
        <WodForm
          name={name}
          points={points}
          onNameChange={setName}
          onPointsChange={setPoints}
          onSubmit={handleSubmit}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logoBar: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#2d404b",
  },
  bodyContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2d404b",
  },
})
