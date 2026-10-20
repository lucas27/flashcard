import { FontType, TextColorType } from "./Design-status";

export type DesignProps = {
    cardId: bigint,
    questionsId: bigint,
    textColor: TextColorType,
    font: FontType
}

export class Design {
    private constructor(private props: DesignProps) {}

    public static create(
        cardId: bigint,
        questionsId: bigint,
        textColor: TextColorType,
        font: FontType
    ) {
        return new Design({
            cardId: cardId,
            questionsId: questionsId,
            textColor: textColor,
            font: font
        }); 
    }
}