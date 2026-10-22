import { FontType } from "./shared/Font.enum";
import { TextColorType } from "./shared/TextColor.enum";

export type QuestionDesignProps = {
    readonly id?: number,
    questionsId?: bigint,
    textColor: TextColorType,
    font: FontType
}

export class QuestionDesign {
    private constructor(private props: QuestionDesignProps) {}

    public static create(
        textColor: TextColorType,
        font: FontType
    ) {
        return new QuestionDesign({
            textColor: textColor,
            font: font
        }); 
    }

    public static with(
        id: number,
        questionsId: bigint,
        textColor: TextColorType,
        font: FontType
    ) {
        return new QuestionDesign({
            id: id,
            questionsId: questionsId,
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