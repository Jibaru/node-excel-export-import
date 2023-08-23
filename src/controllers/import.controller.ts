import { Request, Response } from "express";
import { UsersImport } from "../imports/users.import";
import { UserRepository } from "../repositories/user.repository";
import { ImportError } from "../imports/import.error";
import fs = require("fs");
import path = require("path");

export class ImportController {
  constructor(private readonly userRepository: UserRepository) {}

  public handle(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ message: "No se proporcionó ningún archivo" });
    }

    const excelBuffer = file.buffer;
    const excelFilePath = path.join(
      __dirname,
      `../public/storage/${new Date().getTime() + "-" + "import.xlsx"}`
    );

    fs.writeFileSync(excelFilePath, excelBuffer);

    const usersImport = new UsersImport(this.userRepository);

    try {
      usersImport.import(excelFilePath);
    } catch (error: any) {
      if (error instanceof ImportError) {
        return res.status(400).json({
          message: error.message,
          errors: Object.fromEntries(error.errors),
        });
      }

      return res.status(500).json({
        message: "Fallo al importar",
        error: error,
      });
    }

    return res.status(201).json({ message: "Importación correcta" });
  }
}
