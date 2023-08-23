export class ImportError extends Error {
  constructor(public readonly errors: Map<number, string[]>) {
    super("Fallo al importar");
  }
}
