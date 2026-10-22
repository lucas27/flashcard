import { ThemesGateway } from "../../domain/gateway/Themes.gateway";
import { Usecase } from "../usecase";
import { ListThemesOutputDto } from "./list-themes.dto";

export class ListThemesUsecase implements Usecase<void, ListThemesOutputDto> {
    private constructor(private readonly themesGateway: ThemesGateway) {}

    public static create(themesGateway: ThemesGateway){
        return new ListThemesUsecase(themesGateway);
    }

    public async execute(): Promise<ListThemesOutputDto> {
        const themes = await this.themesGateway.list();

        return {
            themes: themes.map(th => ({
                id: th.id!,
                name: th.name
            }))
        }
    }
}