export class Assunto {
    id?: number | null;
    descricao?: string;

    constructor(id?: number | null, descricao?: string) {
        this.id = id ?? null;
        this.descricao = descricao;
    }
}
