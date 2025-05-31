import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/*
 This is a MobX state tree which represents the Session Detail.
*/
export const SessionModel = types.model("Session", {
  id: types.number,
  date: types.string,
  location: types.string,
  user: types.model("UserInfo", {
    name: types.optional(types.string, ""),
    lastname: types.optional(types.string, ""),
    age: types.number,
    fee: types.number,
  }),
})

export interface SessionModel extends Instance<typeof SessionModel> {}
export interface SessionModelSnapshotOut extends SnapshotOut<typeof SessionModel> {}
export interface SessionModelSnapshotIn extends SnapshotIn<typeof SessionModel> {}
