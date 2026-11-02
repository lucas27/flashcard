import { FontType } from "../../../../../domain/entity/shared/Font.enum";
import { TextColorType } from "../../../../../domain/entity/shared/TextColor.enum";

export type ListQuestionsResponseDto = {
    questions: {
        id: string,
        questionStem: string,
        alternatives: {
            id: string,
            options: string,
            isCorrect: boolean
        }[],
        design: {
            id: number,
            textColor: TextColorType,
            font: FontType
        },
        themeId: number
    }[]
}