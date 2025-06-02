export interface ValidationResult {
  isValid: boolean
  errorMessage?: string
}

/**
 * This util is used validate the input given by the user.
 * This returns a formatted message to know where the error was.
 * @param name The name input
 * @param points The points input
 * @returns An object containing whether the input is valid and the error message
 */
export const wodValidation = (name: string, points: string): ValidationResult => {
  // Checking whether the datas are entered
  if (!name && !points) {
    return {
      isValid: false,
      errorMessage: "Please fill the values",
    }
  }

  // Validating the points, checking whether it is a number
  if (isNaN(parseInt(points)) || points.trim() === "") {
    return {
      isValid: false,
      errorMessage: "Please enter a valid numeric value for Points",
    }
  }

  // Validating the name, checking whether it contains only alphabetics
  if (!name.trim().match(/^[a-zA-Z ]+$/)) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid string value for Name",
    }
  }

  // Returns true if the validation passes
  return {
    isValid: true,
  }
}
