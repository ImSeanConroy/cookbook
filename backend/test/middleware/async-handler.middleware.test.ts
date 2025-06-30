import { asyncHandler } from "../../src/middleware/async-handler.middleware";
import { Request, Response, NextFunction } from "express";

describe("asyncHandler Middleware", () => {
  const mockReq = {} as Request;
  const mockRes = {} as Response;
  const mockNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls the controller successfully", async () => {
    const controller = vi.fn().mockResolvedValue("ok");
    const wrapped = asyncHandler(controller);

    await wrapped(mockReq, mockRes, mockNext);

    expect(controller).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("calls next with error if controller throws", async () => {
    const error = new Error("fail");
    const controller = vi.fn().mockRejectedValue(error);
    const wrapped = asyncHandler(controller);

    await wrapped(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
