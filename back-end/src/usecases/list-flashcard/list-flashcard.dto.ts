import { FontType } from "../../domain/entity/shared/Font.enum";
import { TextColorType } from "../../domain/entity/shared/TextColor.enum";

export type ListFlashcardOutputDto = {
    flashcard: {
        id: bigint,
        question: string,
        ask: string,
        design: {
            id: number,
            textColor: TextColorType,
            font: FontType
        },
        themeId: number
    }[]
}