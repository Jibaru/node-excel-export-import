import * as XLSX from "xlsx";
import { ImportError } from "./import.error";

export abstract class Import<T> {
  protected validateBeforeAnyImport: boolean = false;

  protected abstract map(row: any): T;
  protected abstract validate(row: T): void;
  protected abstract onRow(row: T): void;

  public import(filePath: string): void {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    if (this.validateBeforeAnyImport) {
      const errorMessages = new Map<number, string[]>();
      jsonData.forEach((row: any, index: number) => {
        try {
          const data = this.map(row);
          this.validate(data);
        } catch (error: any) {
          if (!errorMessages.has(index)) {
            errorMessages.set(index, []);
          }
          errorMessages.get(index).push(error.message);
        }
      });

      if (errorMessages.size > 0) {
        throw new ImportError(errorMessages);
      }
    }

    jsonData.forEach((row: any) => {
      const errorMessages = new Map<number, string[]>();
      jsonData.forEach((row: any, index: number) => {
        try {
          const data = this.map(row);
          this.validate(data);
          this.onRow(data);
        } catch (error: any) {
          if (!errorMessages.has(index)) {
            errorMessages.set(index, []);
          }
          errorMessages.get(index).push(error.message);
        }
      });

      if (errorMessages.size > 0) {
        throw new ImportError(errorMessages);
      }
    });
  }
}
