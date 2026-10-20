export const TextColorStatus = {
    ROXO: 'roxo', 
    AZUL: 'azul',
    VERDE: 'verde',
    ROSA: 'rosa',
    LARANJA: 'laranja'
} as const;

export const FontStatus = {
    ARIAL: 'arial',
    ROBOTO: 'roboto',
    INTER: 'inter'
}

export type TextColorType = typeof TextColorStatus[keyof typeof TextColorStatus];

export type FontType = typeof FontStatus[keyof typeof FontStatus];