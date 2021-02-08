export type UserId = '[string UserId]';
export type RoomName = '[string RoomName]';
export type UserName = '[string UserName]';

export interface SerializedUser {
  id: UserId;
  room: RoomName;
  name: UserName;
}
