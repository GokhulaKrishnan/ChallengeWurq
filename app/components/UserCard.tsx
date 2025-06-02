import { StyleSheet, Text, View } from "react-native"
import { SessionModel } from "@/models/Session"

/**
 * This component is used to render a single User Card
 * @param param0 This is the details of the user
 * @returns A User Card
 */
export const UserCard = ({ item: session }: { item: SessionModel }) => {
  return (
    <View style={[styles.cardContainer, { backgroundColor: session.cardColor }]}>
      <View style={styles.userContainer}>
        <View style={styles.userDateContainer}>
          <Text style={styles.userDateLabel}>Date:</Text>
          <Text style={styles.userDateValue}> {session.date}</Text>
        </View>
        <View style={styles.userBodyContainer}>
          <Text style={styles.userBodyLabel}>Name: </Text>
          <Text style={styles.userBodyValue}>
            {`${session.user.name}`} {`${session.user.lastname}`}{" "}
          </Text>
        </View>
        <View style={styles.userBodyContainer}>
          <Text style={styles.userBodyLabel}>Age: </Text>
          <Text style={styles.userBodyValue}>{`${session.user.age}`}</Text>
        </View>
        <View style={styles.userBodyContainer}>
          <Text style={styles.userBodyLabel}>Location: </Text>
          <Text style={styles.userBodyValue}>{session.location}</Text>
        </View>
      </View>
      <View style={styles.userFeeContainer}>
        <Text style={styles.userFeeLabel}>Fee</Text>
        <Text style={styles.userFeeValue}>{`$${session.user.fee}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
  userContainer: {
    alignItems: "flex-start",
    borderColor: "blue",
    width: "70%",
  },
  userBodyContainer: {
    flex: 1,
    flexDirection: "row",
  },
  userBodyLabel: {
    fontFamily: "Courier New",
    fontSize: 15,
    fontWeight: "bold",
  },
  userBodyValue: {
    fontFamily: "Courier New",
    fontSize: 15,
  },
  userDateContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 8,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 10,
    padding: 9,
  },
  userDateLabel: {
    fontFamily: "Courier New",
    fontSize: 12,
    fontWeight: "bold",
  },
  userDateValue: {
    fontFamily: "Courier New",
    fontSize: 12,
    fontWeight: "bold",
  },
  userFeeContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  userFeeLabel: {
    fontFamily: "Courier New",
    fontSize: 20,
  },
  userFeeValue: {
    fontFamily: "Courier New",
    fontSize: 20,
    fontWeight: "bold",
  },
})
