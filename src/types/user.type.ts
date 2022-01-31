export default interface IUser {
  id?: any | null,
  username?: string | null,
  name? : string | null,
  email?: string,
  password?: string,
  roles?: Array<string>
}