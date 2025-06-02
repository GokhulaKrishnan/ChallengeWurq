import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { StatusBar, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { WodUiScreen, DisplayUserTimerScreen, SessionListScreen } from "../screens"
import type { ThemedStyle } from "@/theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { useAppTheme } from "@/utils/useAppTheme"

export type DemoTabParamList = {
  SessionList: undefined
  DisplayUserTimer: undefined
  WodUi: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function FitnessNavigator() {
  const { bottom } = useSafeAreaInsets()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  return (
    <>
      <StatusBar hidden={true} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: themed([$tabBar, { height: bottom + 60 }]),
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.text,
          tabBarLabelStyle: themed($tabBarLabel),
          tabBarItemStyle: themed($tabBarItem),
        }}
      >
        <Tab.Screen
          name="SessionList"
          component={SessionListScreen}
          options={{
            tabBarLabel: "Screen 1",
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="components"
                color={focused ? colors.tint : colors.tintInactive}
                size={20}
              />
            ),
          }}
        />

        <Tab.Screen
          name="DisplayUserTimer"
          component={DisplayUserTimerScreen}
          options={{
            tabBarLabel: "Screen 2",
            tabBarIcon: ({ focused }) => (
              <Icon
                icon="community"
                color={focused ? colors.tint : colors.tintInactive}
                size={20}
              />
            ),
          }}
        />

        <Tab.Screen
          name="WodUi"
          component={WodUiScreen}
          options={{
            tabBarAccessibilityLabel: "Screen 3",
            tabBarLabel: "Screen 3",
            tabBarIcon: ({ focused }) => (
              <Icon icon="podcast" color={focused ? colors.tint : colors.tintInactive} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: "#000000",
  borderTopColor: colors.transparent,
})

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingTop: spacing.xs,
})

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 10,
  fontFamily: typography.primary.medium,
  lineHeight: 10,
  color: "#ffffff",
})
