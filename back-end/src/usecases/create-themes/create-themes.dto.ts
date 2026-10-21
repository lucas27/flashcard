export type CreateThemesInputDto = {
    name: string
};

export type CreateThemesOutputDto = {
    id: number;
    name: string;
    cardCount: number 
    questionsCount: number 
};