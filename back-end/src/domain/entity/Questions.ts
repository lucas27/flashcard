import { Alternatives } from "./Alternatives";
import { Design } from "./Design";

export type QuestionsProps = {
    id: bigint,
    questionStem: string,
    themeId: number,
    design: Design,
    alternatives: Alternatives[]
};

export class Questions {
    private constructor(private props: QuestionsProps) {}

    public static create(
        id: bigint,
        questionStem: string,
        themeId: number,
        design: Design,
        alternatives: Alternatives[]
    ) {
        return new Questions({
            id: id,
            questionStem: questionStem,
            themeId: themeId,
            design: design,
            alternatives: alternatives
        });
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