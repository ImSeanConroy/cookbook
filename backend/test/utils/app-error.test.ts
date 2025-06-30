import {
  AppError,
  HttpException,
  InternalServerException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from "../../src/utils/app-error";
import { HTTPSTATUS } from "../../src/common/config/http.config";
import { ErrorCodeEnum } from "../../src/common/enums/error-code.enum";

describe("AppError and subclasses", () => {
  it("AppError sets message, statusCode, and errorCode", () => {
    const err = new AppError("fail", HTTPSTATUS.BAD_REQUEST, ErrorCodeEnum.VALIDATION_ERROR);
    expect(err.message).toBe("fail");
    expect(err.statusCode).toBe(HTTPSTATUS.BAD_REQUEST);
    expect(err.errorCode).toBe(ErrorCodeEnum.VALIDATION_ERROR);
    expect(err.name).toBe("AppError");
  });

  it("HttpException uses default message and statusCode without errorCode", () => {
    const err = new HttpException();
    expect(err.message).toBe("Http Exception Error");
    expect(err.statusCode).toBe(HTTPSTATUS.INTERNAL_SERVER_ERROR);
    expect(err.errorCode).toBeUndefined();
  });

  it("HttpException allows custom values", () => {
    const err = new HttpException("Oops", HTTPSTATUS.BAD_REQUEST, ErrorCodeEnum.VALIDATION_ERROR);
    expect(err.message).toBe("Oops");
    expect(err.statusCode).toBe(HTTPSTATUS.BAD_REQUEST);
    expect(err.errorCode).toBe(ErrorCodeEnum.VALIDATION_ERROR);
  });

  it("InternalServerException sets default values", () => {
    const err = new InternalServerException();
    expect(err.message).toBe("Internal Server Error");
    expect(err.statusCode).toBe(HTTPSTATUS.INTERNAL_SERVER_ERROR);
    expect(err.errorCode).toBe(ErrorCodeEnum.INTERNAL_SERVER_ERROR);
  });

  it("NotFoundException sets default values", () => {
    const err = new NotFoundException();
    expect(err.message).toBe("Resource not found");
    expect(err.statusCode).toBe(HTTPSTATUS.NOT_FOUND);
    expect(err.errorCode).toBe(ErrorCodeEnum.RESOURCE_NOT_FOUND);
  });

  it("BadRequestException sets default values", () => {
    const err = new BadRequestException();
    expect(err.message).toBe("Bad Request");
    expect(err.statusCode).toBe(HTTPSTATUS.BAD_REQUEST);
    expect(err.errorCode).toBe(ErrorCodeEnum.VALIDATION_ERROR);
  });

  it("UnauthorizedException sets default values", () => {
    const err = new UnauthorizedException();
    expect(err.message).toBe("Unauthorized Access");
    expect(err.statusCode).toBe(HTTPSTATUS.UNAUTHORIZED);
    expect(err.errorCode).toBe(ErrorCodeEnum.ACCESS_UNAUTHORIZED);
  });
});
