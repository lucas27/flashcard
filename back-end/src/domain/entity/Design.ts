import { FontType } from "./shared/Font.enum";
import { TextColorType } from "./shared/TextColor.enum";

export type DesignProps = {
    id: number,
    cardId: bigint,
    questionsId: bigint,
    textColor: TextColorType,
    font: FontType
}

export class Design {
    private constructor(private props: DesignProps) {}

    public static create(
        id: number,
        cardId: bigint,
        questionsId: bigint,
        textColor: TextColorType,
        font: FontType
    ) {
        return new Design({
            id: id,
            cardId: cardId,
            questionsId: questionsId,
            textColor: textColor,
            font: font
        }); 
    }
}