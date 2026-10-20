import { Themes } from "../entity/Themes";

export interface ThemesGateway {
    save(themes: Themes): Promise<void>;
    list(): Promise<Themes[]>;
}