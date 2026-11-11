import { Alternatives } from "./Alternatives";
import { QuestionDesign } from "./QuestionDesign";

export type QuestionsProps = {
    readonly id?: bigint,
    questionStem: string,
    themeId: number,
    design: QuestionDesign,
    alternatives: Alternatives[],
    subTopicId?: number
};

export class Questions {
    private constructor(private props: QuestionsProps) {}

    public static create(
        questionStem: string,
        themeId: number,
        design: QuestionDesign,
        alternatives: Alternatives[],
        subTopicId?: number
    ) {
        return new Questions({
            questionStem: questionStem,
            themeId: themeId,
            design: design,
            alternatives: alternatives,
            subTopicId: subTopicId
        });
    }
    public static with(
        id: bigint,
        questionStem: string,
        themeId: number,
        design: QuestionDesign,
        alternatives: Alternatives[],
        subTopicId?: number
    ) {
        return new Questions({
            id: id,
            questionStem: questionStem,
            themeId: themeId,
            design: design,
            alternatives: alternatives,
            subTopicId: subTopicId
        })
    }

    public get id() {
        return this.props.id;
    }

    public get questionStem() {
        return this.props.questionStem;
    }

    public get themeId() {
        return this.props.themeId;
    }

    public get design() {
        return this.props.design;
    }

    public get alternatives() {
        return this.props.alternatives;
    }

    public get subTopicId() {
        return this.props.subTopicId;
    }

    public changeQuestionStem(questionStem: string) {
        this.props.questionStem = questionStem;
    }
};