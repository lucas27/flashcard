import { Design } from "./Design";

export type FlashCardProps = {
    readonly id: bigint,
    question: string,
    ask: string,
    design: Design,
    themeId: number
}

export class FlashCard {
    private constructor(private props: FlashCardProps) {}

    public static create(
        id: bigint,
        question: string,
        ask: string,
        design: Design,
        themeId: number
    ) {
        return new FlashCard({
            id: id,
            question: question,
            ask: ask,
            design: design,
            themeId: themeId
        });
    }

    public get question() {
        return this.props.question;
    }

    public get ask() {
        return this.props.ask
    }
    
    public changeQuestion(question: string): void {
        this.props.question = question;
    }

    public changeAsk(ask: string): void {
        this.props.ask = ask;
    }

};