import React, { useEffect } from "react"
import { View, Text, FlatList, ActivityIndicator } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { SessionModel } from "../models/Session"

export const UserListScreen = observer(function UserListScreen() {
  const { sessionStore } = useStores()

  // Fetch users when component mounts
  useEffect(() => {
    sessionStore.loadSession()
  }, [])

  /*
   * Rendering individual user
   */
  const renderSession = ({ item: session }: { item: SessionModel }) => {
    return (
      <View
        style={{ backgroundColor: "white", padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
      >
        <Text>ID: {`${session.id}`}</Text>
        <Text>
          Name: {`${session.user.name}`} {`${session.user.lastname}`}
        </Text>
        <Text>Age: {`${session.user.age}`}</Text>
        <Text>Fee: ${`${session.user.fee}`}</Text>
        <Text>Location: {session.location}</Text>
        <Text>Date: {session.date}</Text>
      </View>
    )
  }

  // Showing the loading state when user is being fetched
  if (sessionStore.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading users...</Text>
      </View>
    )
  }

  // Rendering users using Flat List
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Total Fees: {sessionStore.totalFees}</Text>

      <FlatList
        data={sessionStore.sessions}
        renderItem={renderSession}
        keyExtractor={(user) => `${user.id}`}
        ListEmptyComponent={() => <Text>No users found</Text>}
      />
    </View>
  )
})
