export interface RoomId extends String {
  type: 'room'
}

export interface Role {
  roomId: RoomId

  userToken: string
}
