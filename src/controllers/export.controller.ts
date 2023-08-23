import { Request, Response } from "express";
import { UsersExport } from "../exports/users.export";
import { UserRepository } from "../repositories/user.repository";

export class ExportController {
  constructor(private readonly userRepository: UserRepository) {}

  public handle(_: Request, res: Response) {
    const userExport = new UsersExport(this.userRepository);
    const excelBuffer = userExport.toBuffer();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${userExport.excelFileName}`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(excelBuffer);
  }
}
