import { FontType } from "./shared/Font.enum";
import { TextColorType } from "./shared/TextColor.enum";

export type DesignProps = {
    readonly id?: number,
    cardId?: bigint,
    textColor: TextColorType,
    font: FontType
}

export class CardDesign {
    private constructor(private props: DesignProps) {}

    public static create(
        textColor: TextColorType,
        font: FontType
    ) {
        return new CardDesign({
            textColor: textColor,
            font: font
        }); 
    }

    public static with(
        id: number,
        cardId: bigint,
        textColor: TextColorType,
        font: FontType
    ) {
        return new CardDesign({
            id: id,
            cardId: cardId,
            textColor: textColor,
            font: font
        }); 
    }

    public get id() {
        return this.props.id;
    }

    public get textColor() {
        return this.props.textColor;
    }

    public get font() {
        return this.props.font;
    }

    public changeTextColor(textColor: TextColorType): void {
        this.props.textColor = textColor;
    }

    public changeFont(font: FontType): void {
        this.props.font = font;
    }
}