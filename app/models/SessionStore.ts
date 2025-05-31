import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { SessionModel } from "./Session"
import { sessionApi } from "@/services/api/apiUser"
import { SessionItem } from "@/services/api"

/*
 * UserStore - Manages a collection of user sessions and loading state.
 * Contains users array and provides methods to fetch, update, and calculate total fees.
 */
export const SessionStoreModel = types
  .model("SessionStore", {
    sessions: types.array(SessionModel),
    isLoading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    /*
     * Here creating a function that should be able to read the total fees.
     */
    get totalFees() {
      return self.sessions.reduce((acc, curr) => {
        return acc + curr.user.fee
      }, 0)
    },
  }))
  .actions((self) => {
    /*
     * Here we are updating the sessions
     */
    function updateSessions(sessionsJson: SessionItem[]) {
      // Clearing the datas before adding
      self.sessions.clear()
      sessionsJson.forEach((sessionJson: SessionItem) => {
        self.sessions.push(SessionModel.create(sessionJson))
      })
    }

    /*
     * Here we are setting up the loading state
     */
    function setLoading(loading: boolean) {
      self.isLoading = loading
    }

    /*
     * Fetching the data from the server using apiSauce
     */
    const loadSession = flow(function* loadUsers() {
      self.isLoading = true
      try {
        const response = yield sessionApi.getSessions()
        if (response.kind === "ok") {
          updateSessions(response.sessions)
        } else {
          console.error(`Error fetching users: ${JSON.stringify(response)}`)
        }
      } catch (err) {
        console.error("Failed to load users", err)
      } finally {
        self.isLoading = false
      }
    })

    return {
      updateSessions,
      setLoading,
      loadSession,
    }
  })

export interface SessionStore extends Instance<typeof SessionStoreModel> {}
export interface SessionStoreSnapshot extends SnapshotOut<typeof SessionStoreModel> {}
