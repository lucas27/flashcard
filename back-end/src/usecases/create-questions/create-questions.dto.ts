import { FontType } from "../../domain/entity/shared/Font.enum";
import { TextColorType } from "../../domain/entity/shared/TextColor.enum";

export type CreateQuestionsInputDto = {
    questionStem: string,
    themeId: number,
    design: {
        textColor: TextColorType,
        font: FontType
    },
    alternatives: {
        options: string,
        isCorrect: boolean
    }[]
}

export type CreateQuestionsOutputDto = {
    id: bigint,
    design: {
        id: number
    }
    alternatives: {
        id: bigint
    }[]
}