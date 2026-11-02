export type CreateQuestionsResponseDto = {
    id: string,
    design: {
        id: number
    }
    alternatives: {
        id: string
    }[],
    themeId: number
}