import { SessionItem } from "@/services/api"

/*
 * This is a custom hook which returns the formats the data.
 * @param sessionData The data from the store
 * @returns A formatted string
 */
export const useFormattedUserData = (sessionData: SessionItem[]) => {
  // Mapping through it and formating it
  const formatUserData = (): string => {
    return sessionData
      .map(
        (item) =>
          `Name:\t\t\t\t\t${item.user.name} ${item.user.lastname}\nAge:\t\t\t\t\t\t\t${item.user.age}\nLocation:\t\t\t${item.location}\nDate:\t\t\t\t\t\t${item.date}\nFee:\t\t\t\t\t\t\t${item.user.fee}\n`,
      )
      .join("\n\n")
  }

  return formatUserData()
}
