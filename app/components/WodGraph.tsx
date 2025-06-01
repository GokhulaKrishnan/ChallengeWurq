import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { LineChart } from "react-native-gifted-charts"

/*
 * This component renders the graphical data information
 */
export const WodGraph = () => {
  // Simple Data points for the graph
  const data = [
    { value: 14 },
    { value: -5 },
    { value: -8 },
    { value: 8 },
    { value: 10 },
    { value: 5 },
    { value: -3 },
    { value: 12 },
  ]

  // Here we are using react-native-gifted-chart to render the graph
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Points Per WOD</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          height={180}
          width={300}
          color="#404b53"
          thickness={2}
          dataPointsHeight={10}
          dataPointsWidth={10}
          textFontSize={13}
          stepValue={10}
          yAxisColor="transparent"
          yAxisTextStyle={{ color: "#a8a9ad" }}
          rulesColor="gray"
          xAxisColor="gray"
          yAxisOffset={-20}
          xAxisThickness={1}
          xAxisType="dotted"
          noOfSections={4}
          scrollToEnd={false}
          isAnimated={false}
          spacing={40}
          initialSpacing={5}
          endSpacing={2}
          disableScroll={true}
          customDataPoint={(item: any) => {
            const isNegative = item.value - 20 < 0
            return (
              <View
                style={[styles.dataPoint, { backgroundColor: isNegative ? "#ffffff" : "#00e590" }]}
              />
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 270,
  },
  title: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  chartContainer: {
    backgroundColor: "#202b33",
    borderRadius: 15,
  },
  dataPoint: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
})
