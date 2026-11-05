import { FontType } from "../../domain/entity/shared/Font.enum";
import { TextColorType } from "../../domain/entity/shared/TextColor.enum";

export type FindAllByThemeIdQuestionsInputDto = {
    themeId: number
}

export type FindAllByThemeIdQuestionsOutputDto = {
    questions: {
        id: bigint,
        questionStem: string,
        alternatives: {
            id: bigint,
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