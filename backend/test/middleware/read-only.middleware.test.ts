import isReadOnly from "../../src/middleware/read-only.middleware";
import { Request, Response, NextFunction } from "express";
import { config } from "../../src/common/config/app.config";
import { UnauthorizedException } from "../../src/utils/app-error";

describe("isReadOnly Middleware", () => {
  const mockReq = {} as Request;
  const mockRes = {} as Response;
  const mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls next if READ_ONLY is not 'true'", () => {
    config.READ_ONLY = "false";
    isReadOnly(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it("throws UnauthorizedException if READ_ONLY is 'true'", () => {
    config.READ_ONLY = "true";
    expect(() => isReadOnly(mockReq, mockRes, mockNext)).toThrow(
      UnauthorizedException
    );
  });

  it("treats undefined or other values as non-read-only", () => {
    config.READ_ONLY = "TrUeE";
    expect(() => isReadOnly(mockReq, mockRes, mockNext)).not.toThrow();
  });
});
