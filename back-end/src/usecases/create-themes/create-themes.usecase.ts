import { Themes } from "../../domain/entity/Themes";
import { ThemesGateway } from "../../domain/gateway/Themes.gateway";
import { Usecase } from "../usecase";
import { CreateThemesInputDto, CreateThemesOutputDto } from "./create-themes.dto";

export class CreateThemesUsecase implements Usecase<CreateThemesInputDto, CreateThemesOutputDto> {
    // poderia ter escrito como repository, a ideia é igual ao repository do java, onde tem save, findById
    private constructor(private readonly themesGateway: ThemesGateway) {}

    public static create(themesGateway: ThemesGateway) {
        return new CreateThemesUsecase(themesGateway);
    }

    public async execute({
        name
    }: CreateThemesInputDto): Promise<CreateThemesOutputDto> {
        const theme = Themes.create(name);

        await this.themesGateway.save(theme);

        const output: CreateThemesOutputDto = {
            id: theme.id! 
        }

        return output;
    }
}