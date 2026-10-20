export type AlternativesProps = {
    questionId: bigint,
    options: string
}

export class Alternatives {
    private constructor(private props: AlternativesProps) {}

    public static create(questionId: bigint, options: string) {
        return new Alternatives({ questionId: questionId, options: options });
    }

    public get options() {
        return this.props.options;
    }

    public changeOptions(options: string): void {
        this.props.options = options;
    }
}