import { StyleSheet, Text, View } from "react-native"
import { Icon } from "./Icon"
import { useEffect, useState } from "react"
import { getWodDetails } from "@/utils/storage/localStorage"

/*
 * This component displays the WOD Details Card
 * Everytime the WodUIScreen re-renders, it will pass a value for refresh which will cause this component to re-render inorder to * * dispay the updated WOD informations.
 */
export const WodCard = (refresh: any) => {
  // State for name and points with default value.
  const [name, setName] = useState("WOD Newton")
  const [point, setPoint] = useState("189")

  // Function to retrieve the WOD
  const loadWodDetails = async () => {
    // Here we set the loading state
    try {
      // Getting the details from the local storage
      const wodDetailJson = await getWodDetails()

      if (wodDetailJson) {
        // Setting the states
        setName(wodDetailJson.wodName)
        setPoint(wodDetailJson.wodPoints)
      } else {
        // Setting up a default details if empty values are returned
        setName("WOD Newton")
        setPoint("189")
      }
    } catch (error) {
      console.log(`Error loading the user from the Local Storage: ${error}`)
    }
  }

  // Loading the data when the refresh is changed
  useEffect(() => {
    loadWodDetails()
  }, [refresh])

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.cardLabel}>History:</Text>
        <View style={styles.innerContainer}>
          <View style={styles.leftSection}>
            <View style={styles.headerSection}>
              <View>
                <Text style={styles.dateValue}>7/30/2022</Text>
                <Text style={styles.statName}>{name}</Text>
              </View>
              <View>
                <Text>
                  <Icon icon="heart" size={20} color="#662b36" />
                </Text>
              </View>
            </View>
            <View style={styles.statsSection}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Time: </Text>
                <Text style={styles.statValue}>12:53</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Rest: </Text>
                <Text style={styles.statValue}>0:37 </Text>
                <Text style={styles.statValuePercent}>| 5%</Text>
              </View>
              <Text style={styles.mainNumber}>167</Text>
            </View>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.pointsText}>{`+ ${point}`}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 200,
    width: "100%",
    overflow: "hidden",
    marginBottom: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardLabel: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  dateValue: {
    color: "#67757b",
    fontWeight: "bold",
    marginBottom: 2,
  },
  leftSection: {
    backgroundColor: "#20262b",
    width: "65%",
    padding: 20,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "space-between",
  },
  headerSection: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  statsSection: {
    flex: 1,
    flexDirection: "row",
  },
  statName: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
  },
  statValuePercent: {
    color: "#ffffff",
  },
  statLabel: {
    color: "#585f64",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "bold",
  },
  statValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  mainNumber: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  rightSection: {
    flex: 1,
    alignItems: "center",
    paddingTop: "15%",
    backgroundColor: "#000000",
    width: "35%",
    padding: 20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  pointsText: {
    fontSize: 24,
    color: "#00f300",
    fontWeight: "bold",
  },
  totalPointsText: {
    color: "white",
  },
})
