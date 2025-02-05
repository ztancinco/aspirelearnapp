import axiosInstance from '@/lib/axiosConfig';

/**
 * Utility class for making API requests (GET, POST, PUT, PATCH, DELETE) with support for query parameters.
 */
export type Params = Record<
  string,
  string | number | boolean | Record<string, unknown> | Array<string | number | boolean | Record<string, unknown>>
>;
export type Id = string | number;

export default class Resource {
  /**
   * Sends a GET request.
   * @param resource
   * @param params
   * @param options
   * @returns The response data.
   */
  public static async get<T = unknown>(resource: string, params: Params = {}, options = {}): Promise<T> {
    const resp = await axiosInstance.get<T>(resource, {
      params: this.buildParams(params),
      ...options,
    });
    return resp.data;
  }

  /**
   * Sends a POST request.
   * @param resource
   * @param data
   * @param config
   * @returns The response data.
   */
  public static async post<T>(resource: string, data: T, config = {}) {
    return (await axiosInstance.post(resource, data, config)).data;
  }

  /**
   * Sends a PUT request.
   * @param resource
   * @param data
   * @returns The response data.
   */
  public static async put<T>(resource: string, data: T) {
    return (await axiosInstance.put(resource, data)).data;
  }

  /**
   * Sends a PATCH request.
   * @param resource
   * @param data
   * @returns The response data.
   */
  public static async patch<T>(resource: string, data: T) {
    return (await axiosInstance.patch(resource, data)).data;
  }

  /**
   * Sends a DELETE request.
   * @param resource
   * @param params
   * @returns The response data.
   */
  public static async delete(resource: string, params: Params = {}) {
    return (await axiosInstance.delete(resource, { params: this.buildParams(params) })).data;
  }

  /**
   * Exports data as an ArrayBuffer.
   * @param resource
   * @param params
   * @returns The exported data as an ArrayBuffer.
   */
  public static export(resource: string, params: Params = {}) {
    return axiosInstance.get<ArrayBuffer>(resource, {
      params: this.buildParams(params),
      responseType: 'arraybuffer',
    });
  }

  /**
   * Builds query parameters.
   * @param params
   * @returns A URLSearchParams object.
   */
  private static buildParams(params: Params): URLSearchParams {
    const urlParams = new URLSearchParams();

    const parseParam = (key: string, val: string | number | boolean | object | (string | number | boolean | object)[]) => {
      if (Array.isArray(val)) {
        val.forEach((v, i) => parseParam(`${key}[${i}]`, v));
      } else if (typeof val === 'object' && val !== null) {
        Object.keys(val).forEach((k) => {
          const nestedVal = (val as Record<string, unknown>)[k] as string | number | boolean | Record<string, unknown> | (string | number | boolean | object)[];
          if (nestedVal !== undefined && nestedVal !== null) {
            parseParam(`${key}[${k}]`, nestedVal);
          }
        });
      } else if (val !== undefined && val !== null) {
        urlParams.append(key, String(val));
      }
    };

    Object.keys(params).forEach((key) => parseParam(key, params[key]));
    return urlParams;
  }
}
