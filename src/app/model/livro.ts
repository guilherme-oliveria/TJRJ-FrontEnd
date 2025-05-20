import {Assunto} from "./assunto";
import {Autor} from "./autor";

export class Livro {
  id?: number | null;
  titulo?: string;
  editora?: string | null;
  edicao?: number | null;
  anoPublicacao?: string | null;
  valor?: number | null;
  dataCriacao?: Date | null;
  dataAlteracao?: Date | null;
  autores?: Autor[] | null;
  assuntos?: Assunto[] | null;

  constructor(
    id?: number | null,
    titulo?: string,
    editora?: string | null,
    edicao?: number | null,
    anoPublicacao?: string | null,
    valor?: number | null,
    dataCriacao?: Date | null,
    dataAlteracao?: Date | null,
    autores?: Autor[] | null,
    assuntos?: Assunto[] | null
  ) {
    this.id = id ?? null;
    this.titulo = titulo;
    this.editora = editora ?? null;
    this.edicao = edicao ?? null;
    this.anoPublicacao = anoPublicacao ?? null;
    this.valor = valor ?? null;
    this.dataCriacao = dataCriacao ?? null;
    this.dataAlteracao = dataAlteracao ?? null;
    this.autores = autores ?? null;
    this.assuntos = assuntos ?? null;
  }
}
