import { Themes } from "../entity/Themes";

export interface ThemesGateway {
    save(themes: Themes): Promise<number>;
    list(): Promise<Themes[]>;
}