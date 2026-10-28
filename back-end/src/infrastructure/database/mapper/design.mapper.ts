import { Font, TextColor } from "@prisma/client";
import { TextColorType } from "../../../domain/entity/shared/TextColor.enum";
import { FontType } from "../../../domain/entity/shared/Font.enum";

export class DesignMapper {
    // Traduz o Enum do Banco de Dados para o Enum de Domínio
    public static toDomainEnumTextColor(dbEnumTextColor: TextColor): TextColorType {
        const enumMap: Record<TextColor, TextColorType> = {
            [TextColor.AZUL]: TextColorType.AZUL,
            [TextColor.LARANJA]: TextColorType.LARANJA,
            [TextColor.ROSA]: TextColorType.ROSA,
            [TextColor.ROXO]: TextColorType.ROXO,
            [TextColor.VERDE]: TextColorType.VERDE
        };
        return enumMap[dbEnumTextColor];
    }

    public static toDomainEnumFont(dbEnumFont: Font): FontType {
        const enumMap: Record<Font, FontType> = {
            [Font.ARIAL]: FontType.ARIAL,
            [Font.INTER]: FontType.INTER,
            [Font.ROBOTO]: FontType.ROBOTO
        };
        return enumMap[dbEnumFont];
    }

    // Traduz o Enum de Domínio para o Enum do Banco de Dados
    public static toPersistenceEnumTextColor(domainEnumTextColor: TextColorType): TextColor {
        const enumMap: Record<TextColorType, TextColor> = {
            [TextColorType.AZUL]: TextColor.AZUL,
            [TextColorType.LARANJA]: TextColor.LARANJA,
            [TextColorType.ROSA]: TextColor.ROSA,
            [TextColorType.ROXO]: TextColor.ROXO,
            [TextColorType.VERDE]: TextColor.VERDE
        };
        return enumMap[domainEnumTextColor];
    }

    public static toPersistenceEnumFont(domainEnumFont: FontType): Font {
        const enumMap: Record<FontType, Font> = {
            [FontType.ARIAL]: Font.ARIAL,
            [FontType.INTER]: Font.INTER,
            [FontType.ROBOTO]: Font.ROBOTO
        };
        return enumMap[domainEnumFont];
    }
}