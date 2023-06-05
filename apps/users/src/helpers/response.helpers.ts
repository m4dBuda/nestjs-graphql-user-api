import { responseConfig } from './response.config';

export class ResponseHelper {
  static success(body?: any) {
    return {
      status: 200,
      description: responseConfig.success.default(),
      body: body || null,
    };
  }

  static created(body?: any) {
    return {
      status: 201,
      description: responseConfig.success.default(),
      body: body || null,
    };
  }

  static error(body?: any, description?: string) {
    return {
      status: 500,
      description: description || responseConfig.error.default(),
      body: body || null,
    };
  }

  static notFoundError(body?: any, description?: string) {
    return {
      status: 404,
      description: description || responseConfig.notFound.default(),
      body: body || null,
    };
  }

  static unauthorizedError(body?: any, description?: string) {
    return {
      status: 401,
      description: description || responseConfig.unauthorized.default(),
      body: body || null,
    };
  }
}
