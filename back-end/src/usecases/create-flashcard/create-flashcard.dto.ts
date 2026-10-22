import { FontType } from "../../domain/entity/shared/Font.enum";
import { TextColorType } from "../../domain/entity/shared/TextColor.enum";

export type CreateFlashCardInputDto = {
    question: string,
    ask: string,
    design: {
        textColor: TextColorType, 
        font: FontType
    },
    themeId: number
}

export type CreateFlashCardOutputDto = {
    id: bigint,
    design: {
        id: number   
    }
}