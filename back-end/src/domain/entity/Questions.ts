import { Alternatives } from "./Alternatives";
import { QuestionDesign } from "./QuestionDesign";

export type QuestionsProps = {
    readonly id?: bigint,
    questionStem: string,
    themeId: number,
    design: QuestionDesign,
    alternatives: Alternatives[]
};

export class Questions {
    private constructor(private props: QuestionsProps) {}

    public static create(
        questionStem: string,
        themeId: number,
        design: QuestionDesign,
        alternatives: Alternatives[]
    ) {
        return new Questions({
            questionStem: questionStem,
            themeId: themeId,
            design: design,
            alternatives: alternatives
        });
    }
    public static with(
        id: bigint,
        questionStem: string,
        themeId: number,
        design: QuestionDesign,
        alternatives: Alternatives[]
    ) {
        return new Questions({
            id: id,
            questionStem: questionStem,
            themeId: themeId,
            design: design,
            alternatives: alternatives
        })
    }

    public get id() {
        return this.props.id;
    }

    public get questionStem() {
        return this.props.questionStem;
    }

    public changeQuestionStem(questionStem: string) {
        this.props.questionStem = questionStem;
    }
};