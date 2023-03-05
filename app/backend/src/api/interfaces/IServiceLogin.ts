export default interface IServiceLogin {
  authenticateLogin(email: string, password: string): void
  getUserRole(token: string): object
}
