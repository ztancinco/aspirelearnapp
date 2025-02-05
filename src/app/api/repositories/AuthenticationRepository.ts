import Repository from '@/app/api/repositories/Repository';
import { User } from '@/app/api/interface/User';

export interface AuthData {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface AuthLoginPostData {
  email: string;
  password: string;
}

export default class AuthenticationRepository extends Repository {
  private static readonly prefix = '/auth';

  /**
   * Sends a login request with the provided credentials.
   * @param data
   * @returns The authentication data including access token, refresh token, and user details.
   */
  public static async authLogin(data: AuthLoginPostData): Promise<AuthData> {
    return await this.resource.post(`${this.prefix}/login/`, data);
  }

  /**
   * Sends a logout request.
   * @returns A promise that resolves when logout is successful.
   */
  public static async authLogout(refreshToken: string): Promise<void> {
    await this.resource.post(`${this.prefix}/logout/`, { refresh_token: refreshToken});
  }
}
