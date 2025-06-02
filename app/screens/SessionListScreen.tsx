import React, { useEffect } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { Loading } from "@/components/Loading"
import { UserCard } from "@/components/UserCard"

/**
 * Renders the user card information in the UI.
 * Uses a UserCard component to format the datas to visulaize in the card
 * Using useStores to fetch the datas from the backend
 */
export const SessionListScreen = observer(function SessionListScreen() {
  const { sessionStore } = useStores()

  // Fetch users when component mounts
  useEffect(() => {
    sessionStore.loadSession()
  }, [])

  // Showing the loading state when user is being fetched
  if (sessionStore.isLoading) {
    return <Loading />
  }

  // Rendering the top component of the Flat List
  const ListHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>User Information</Text>
        <Text style={styles.headerFee}>Total Fees: ${sessionStore.totalFees}</Text>
      </View>
    )
  }

  // Rendering users using Flat List
  return (
    <View style={styles.listContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        data={sessionStore.positiveAgeUsers}
        renderItem={({ item }) => <UserCard item={item} />}
        windowSize={10}
        keyExtractor={(user) => `${user.id}`}
        ListEmptyComponent={() => <Text>No users found</Text>}
        ListHeaderComponent={<ListHeader />}
        style={styles.flatListStyle}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  flatListStyle: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: "#2d404b",
  },
  flatListContent: {
    padding: 10,
    paddingBottom: 20,
  },
  headerFee: {
    fontFamily: "Courier New",
    fontSize: 18,
    fontWeight: "bold",
    color: "#e9ecef",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 10,
    padding: 5,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: "Courier New",
    fontSize: 18,
    fontWeight: "400",
    color: "#e9ecef",
    padding: 5,
  },
})
