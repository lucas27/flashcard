import { PrismaClient } from "@prisma/client";
import { Themes } from "../../domain/entity/Themes";
import { ThemesGateway } from "../../domain/gateway/Themes.gateway";

export class ThemeRepositoryPrisma implements ThemesGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new ThemeRepositoryPrisma(prismaClient);
    }

    public async save(themes: Themes): Promise<number> {
        const createdTheme = await this.prismaClient.themes.create({
            data: {
                name: themes.name
            }
        });
        return createdTheme.id;
    }

    public async list(): Promise<Themes[]> {
        const themes = await this.prismaClient.themes.findMany();

        const themesList = themes.map(th => {
            return Themes.with(th.id, th.name);
        });
        
        return themesList;
    }

}