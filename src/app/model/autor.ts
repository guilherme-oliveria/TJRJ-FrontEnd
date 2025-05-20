export class Autor {
  id?: number | null;
  nome?: string;

  constructor(id?: number | null, nome?: string) {
    this.id = id ?? null;
    this.nome = nome;
  }
}
