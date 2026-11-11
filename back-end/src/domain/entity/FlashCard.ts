import { CardDesign } from "./CardDesign";
import { SubTopics } from "./SubTopics";

export type FlashCardProps = {
    readonly id?: bigint,
    question: string,
    ask: string,
    design: CardDesign,
    themeId: number,
    subTopicId?: number
}

export class FlashCard {
    private constructor(private props: FlashCardProps) {}

    public static create(
        question: string,
        ask: string,
        design: CardDesign,
        themeId: number,
        subTopicId?: number
    ) {
        return new FlashCard({
            question: question,
            ask: ask,
            design: design,
            themeId: themeId,
            subTopicId: subTopicId
        });
    }

    public static with(
        id: bigint,
        question: string,
        ask: string,
        design: CardDesign,
        themeId: number,
        subTopicId?: number
    ) {
        return new FlashCard({
            id: id,
            question: question,
            ask: ask,
            design: design,
            themeId: themeId,
            subTopicId: subTopicId
        });
    }
    
    public get id() {
        return this.props.id;
    }

    public get question() {
        return this.props.question;
    }

    public get ask() {
        return this.props.ask;
    }

    public get design() {
        return this.props.design;
    }
    
    public get themeId() {
        return this.props.themeId;
    }

    public get subTopicId() {
        return this.props.subTopicId;
    }

    public changeQuestion(question: string): void {
        this.props.question = question;
    }

    public changeAsk(ask: string): void {
        this.props.ask = ask;
    }

};