export type SubTopicsProps = {
    readonly id?: number,
    name: string
}

export class SubTopics {
    private constructor(private props: SubTopicsProps){}

    public static create(name: string) {
        return new SubTopics({ name });
    }

    public static with(id: number, name: string) {
        return new SubTopics({ id, name });
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public changeName(name: string): void {
        this.props.name = name;
    }
}