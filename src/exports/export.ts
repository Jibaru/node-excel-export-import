import * as XLSX from "xlsx";

export abstract class Export<T> {
  protected fileName: string;

  protected abstract headers(): string[];

  protected abstract content(): T[];

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  public get excelFileName(): string {
    return this.fileName;
  }

  public map(row: T): any {
    return row;
  }

  build(): XLSX.WorkBook {
    const workSheet = XLSX.utils.aoa_to_sheet([
      this.headers(),
      ...this.content().map(this.map),
    ]);

    const headerStyle = {
      font: { bold: true },
    };

    for (let i = 0; i < this.headers().length; i++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
      XLSX.utils.format_cell(workSheet[cellRef], headerStyle);
    }

    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");

    return workBook;
  }

  toBuffer() {
    return XLSX.write(this.build(), { bookType: "xlsx", type: "buffer" });
  }
}
