export type AlternativesProps = {
    readonly id?: bigint,
    questionId?: bigint,
    options: string,
    isCorrect: boolean
}

export class Alternatives {
    private constructor(private props: AlternativesProps) {}

    public static create(options: string, isCorrect: boolean) {
        return new Alternatives({ options: options, isCorrect: isCorrect });
    }

    public static with(id: bigint, questionId: bigint, options: string, isCorrect: boolean) {
        return new Alternatives({id: id, questionId: questionId, options: options, isCorrect: isCorrect });
    }

    public get id() {
        return this.props.id;
    }

    public get options() {
        return this.props.options;
    }

    public changeOptions(options: string): void {
        this.props.options = options;
    }
}