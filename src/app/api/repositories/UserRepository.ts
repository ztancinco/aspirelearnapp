import Repository from '@/app/api/repositories/Repository';
import { User } from '@/app/api/interface/User';

export default class UserRepository extends Repository {
  private static readonly prefix = '/users';

  /**
   * Fetches all users.
   * @returns A list of users.
   */
  public static async getUsers(): Promise<User[]> {
    return await this.resource.get<User[]>(`${this.prefix}/`);
  }

  /**
   * Fetches a single user by ID.
   * @param id 
   * @returns The requested user or null if not found.
   */
  public static async getUser(id: number): Promise<User | null> {
    const { data } = await this.resource.get<{ data: User }>(`${this.prefix}/${id}`);
    return data;
  }

  /**
   * Creates a new user.
   * @param userData
   * @returns The created user.
   */
  public static async createUser(userData: User): Promise<User> {
    const { data } = await this.resource.post<User>(`${this.prefix}/`, userData);
    return data;
  }

  /**
   * Updates an existing user.
   * @param id
   * @param updatedUserData
   * @returns The updated user.
   * @throws An error if the user is not found.
   */
  public static async updateUser(id: number, updatedUserData: Partial<User>): Promise<User> {
    const currentUser = await this.getUser(id);
    if (!currentUser) throw new Error('User not found');
    const { data } = await this.resource.put<User>(`${this.prefix}/?user_id=${id}`, { ...currentUser, ...updatedUserData });
    return data;
  }

  /**
   * Deletes a user.
   * @param id
   * @returns A promise that resolves when the user is deleted.
   */
  public static async deleteUser(id: number): Promise<void> {
    await this.resource.delete(`${this.prefix}/`, {
      params: { user_id: id },
    });
  }
}
