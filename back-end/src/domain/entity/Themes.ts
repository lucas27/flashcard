import { FlashCard } from "./FlashCard";
import { Questions } from "./Questions";

export type ThemesProps = {
    readonly id?: number,
    name: string
}

export class Themes {
    private constructor(private props: ThemesProps) {}

    public static create( name: string ) {
        return new Themes({ name: name });
    }

    public static with(id: number, name: string) {
        return new Themes({id, name});
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
};