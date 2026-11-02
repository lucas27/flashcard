export type QuestionsGatewayDto = {
    id: bigint,
    design: {
        id: number
    }
    alternatives: {
        id: bigint
    }[],
    themeId: number
}