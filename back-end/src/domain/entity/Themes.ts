import { FlashCard } from "./FlashCard";
import { Questions } from "./Questions";

export type ThemesProps = {
    readonly id: number,
    name: string,
    card: FlashCard[],
    question: Questions[]
}

export class Themes {
    private constructor(private props: ThemesProps) {}

    public static create(
        id: number,
        name: string,
        card: FlashCard[],
        question: Questions[]
    ) {
        return new Themes({
            id: id,
            name: name,
            card: card,
            question: question
        });
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public changeName(name: string): void {
        this.props.name = name;
    }
};