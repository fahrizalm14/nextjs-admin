/**
 * @class ApiError
 * @description Kelas dasar untuk semua error API kustom.
 * @extends Error
 */
export class ApiError extends Error {
  /**
   * Kode status HTTP yang terkait dengan error ini.
   * @type {number}
   */
  status: number;

  /**
   * Membuat instance ApiError.
   * @param {string} message Pesan deskriptif error.
   * @param {number} [status=500] Kode status HTTP (default 500 Internal Server Error).
   */
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * @class BadRequestError
 * @description Mewakili error 400 Bad Request. Digunakan ketika permintaan klien tidak valid.
 * @extends ApiError
 */
export class BadRequestError extends ApiError {
  /**
   * Membuat instance BadRequestError.
   * @param {string} [message="Bad Request"] Pesan deskriptif error.
   */
  constructor(message: string = "Bad Request") {
    super(message, 400);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * @class UnauthorizedError
 * @description Mewakili error 401 Unauthorized. Digunakan ketika otentikasi gagal atau tidak ada.
 * @extends ApiError
 */
export class UnauthorizedError extends ApiError {
  /**
   * Membuat instance UnauthorizedError.
   * @param {string} [message="Unauthorized"] Pesan deskriptif error.
   */
  constructor(message: string = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * @class ForbiddenError
 * @description Mewakili error 403 Forbidden. Digunakan ketika pengguna terotentikasi tidak memiliki izin yang diperlukan.
 * @extends ApiError
 */
export class ForbiddenError extends ApiError {
  /**
   * Membuat instance ForbiddenError.
   * @param {string} [message="Forbidden"] Pesan deskriptif error.
   */
  constructor(message: string = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * @class NotFoundError
 * @description Mewakili error 404 Not Found. Digunakan ketika sumber daya yang diminta tidak ditemukan.
 * @extends ApiError
 */
export class NotFoundError extends ApiError {
  /**
   * Membuat instance NotFoundError.
   * @param {string} [message="Not Found"] Pesan deskriptif error.
   */
  constructor(message: string = "Not Found") {
    super(message, 404);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * @class ConflictError
 * @description Mewakili error 409 Conflict. Digunakan ketika terjadi konflik, misalnya data yang sama sudah ada.
 * @extends ApiError
 */
export class ConflictError extends ApiError {
  /**
   * Membuat instance ConflictError.
   * @param {string} [message="Conflict"] Pesan deskriptif error.
   */
  constructor(message: string = "Conflict") {
    super(message, 409);
    this.name = "ConflictError";
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * @class MethodNotAllowedError
 * @description Mewakili error 405 Method Not Allowed. Digunakan ketika metode HTTP yang diminta tidak diizinkan untuk resource tertentu.
 * @extends ApiError
 */
export class MethodNotAllowedError extends ApiError {
  /**
   * Membuat instance MethodNotAllowedError.
   * @param {string} [message="Method Not Allowed"] Pesan deskriptif error.
   */
  constructor(message: string = "Method Not Allowed") {
    super(message, 405);
    this.name = "MethodNotAllowedError";
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
  }
}
