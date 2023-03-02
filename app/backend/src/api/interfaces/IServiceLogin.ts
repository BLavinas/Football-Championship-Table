export default interface IServiceUsers {
  authenticateLogin(email: string, password: string): void
}
