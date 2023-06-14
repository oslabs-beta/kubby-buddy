import { Request, Response, NextFunction } from "express";
import { exec } from "node:child_process";
import { StatsStreamController, ErrorDetails } from "../../types";
import { promisify } from "node:util";
const promisifyExec = promisify(exec);

const statsStreamController: StatsStreamController = {
  getAllContainerStats: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { stdout, stderr } = await promisifyExec(
        "docker stats --no-stream --format json"
      );
      if (stderr) {
        const errorDetails: ErrorDetails = {
          log: "error in the statsStreamController.getAllContainerStats exec call",
          err: stderr,
          message:
            "error in the statsStreamController.getAllContainerStats exec call",
        };
        next(errorDetails);
      }
      return res.status(200).json(stdout);
    } catch (error) {
      const errorDetails: ErrorDetails = {
        log: "error in the statsStreamController.getAllContainerStats catch",
        err: error,
        message:
          "error in the statsStreamController.getAllContainerStats catch",
      };
      next(errorDetails);
    }
  },
};

export default statsStreamController;
