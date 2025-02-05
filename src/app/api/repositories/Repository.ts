import Resource from '@/app/api/repositories/Resource';

export default abstract class Repository {
  protected static get resource() {
    return Resource;
  }
}
