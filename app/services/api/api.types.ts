/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export interface SessionItem {
  id: number
  date: string
  location: string
  user: {
    name: string
    lastname: string
    age: number
    fee: number
  }
}

export interface wod {
  wodName: string
  wodPoints: string
}

export interface wodForm {
  name: string
  points: string
  onNameChange: (text: string) => void
  onPointsChange: (text: string) => void
  onSubmit: () => void
}

export interface ApiUserResponse
  extends Array<{
    id: number
    date: string
    location: string
    user: {
      name: string
      lastname: string
      age: number
      fee: number
    }
  }> {}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
