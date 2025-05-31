/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig, ApiUserResponse, SessionItem } from "./api.types"
import type { SessionModelSnapshotIn } from "../../models/Session"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API.
 */
export class ApiSession {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of Sessions
   */
  async getSessions(): Promise<
    { kind: "ok"; sessions: SessionModelSnapshotIn[] } | GeneralApiProblem
  > {
    // make the api call
    const response: ApiResponse<ApiUserResponse> = await this.apisauce.get(`http://10.0.0.21:3000/`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // Transforming data
      const sessions: SessionItem[] =
        rawData?.map((raw: any) => ({
          id: raw.id,
          date: raw.date,
          location: raw.location,
          user: {
            name: raw.user.name,
            lastname: raw.user.lastname,
            age: raw.user.age,
            fee: raw.user.fee,
          },
        })) ?? []

      return { kind: "ok", sessions }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const sessionApi = new ApiSession()
