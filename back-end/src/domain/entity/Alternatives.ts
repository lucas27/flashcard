export type AlternativesProps = {
    readonly id?: bigint,
    questionId: bigint,
    options: string,
    isCorrect: boolean
}

export class Alternatives {
    private constructor(private props: AlternativesProps) {}

    public static create(questionId: bigint, options: string, isCorrect: boolean) {
        return new Alternatives({questionId: questionId, options: options, isCorrect: isCorrect });
    }

    public static with(id: bigint, questionId: bigint, options: string, isCorrect: boolean) {
        return new Alternatives({id: id, questionId: questionId, options: options, isCorrect: isCorrect });
    }

    public get options() {
        return this.props.options;
    }

    public changeOptions(options: string): void {
        this.props.options = options;
    }
}