export type SubTopicsProps = {
    readonly id?: number,
    name: string,
    themeId: number
}

export class SubTopics {
    private constructor(private props: SubTopicsProps){}

    public static create(name: string, themeId: number) {
        return new SubTopics({ name, themeId });
    }

    public static with(id: number, name: string, themeId: number) {
        return new SubTopics({ id, name, themeId });
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get themeId() {
        return this.props.themeId;
    }

    public changeName(name: string): void {
        this.props.name = name;
    }
}