import Repository from '@/app/api/repositories/Repository';
import { ICourse } from '../interface/ICourse';
import { ICourseFormData } from '../interface/form/ICourseFormData';

export default class CourseRepository extends Repository {
  private static readonly prefix = '/courses';

  /**
   * Fetches all courses.
   * @returns A list of courses.
   */
  public static async getCourses(): Promise<ICourse[]> {
    return await this.resource.get<ICourse[]>(`${this.prefix}/`);
  }

  /**
   * Fetches a single course by ID.
   * @param id The ID of the course to fetch.
   * @returns The requested course.
   */
  public static async getCourse(id: number): Promise<ICourse> {
    return await this.resource.get<ICourse>(`${this.prefix}/${id}`);
  }

  /**
   * Creates a new course.
   * @param courseData The data for the new course.
   * @returns The created course.
   */
  public static async createCourse(courseData: ICourseFormData): Promise<ICourse> {
    const { data } = await this.resource.post<ICourseFormData>(`${this.prefix}/`, courseData);
    return data;
  }

  /**
   * Updates an existing course.
   * @param id
   * @param updatedCourseData The updated course data.
   * @returns The updated course.
   */
  public static async updateCourse(id: number, updatedCourseData: ICourse): Promise<ICourse> {
    const { data } = await this.resource.put<ICourse>(`${this.prefix}/${id}/`, updatedCourseData);
    return data;
  }

  /**
   * Deletes a course.
   * @param id
   * @returns A promise that resolves when the course is deleted.
   */
  public static async deleteCourse(id: number): Promise<void> {
    await this.resource.delete(`${this.prefix}/${id}`);
  }
}
