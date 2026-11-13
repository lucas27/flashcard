import { PrismaClient } from "@prisma/client";
import { SubTopicsGateway } from "../../domain/gateway/SubTopics.gateway";
import { SubTopics } from "../../domain/entity/SubTopics";
import { SubTopicsGatewayDto } from "../../domain/gateway/SubTopics.gateway.dto";

export class SubTopicRepositoryPrisma implements SubTopicsGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new SubTopicRepositoryPrisma(prismaClient);
    }

    public async save(subTopics: SubTopics): Promise<SubTopicsGatewayDto> {
        const createdSubTopic = await this.prismaClient.subTopics.create({
            data: {
                name: subTopics.name,
                themeId: subTopics.themeId
            }
        });

        return {
            id: createdSubTopic.id,
            themeId: createdSubTopic.themeId
        };
    }

    public async list(themeId: number): Promise<SubTopics[]> {
        const subTopic = await this.prismaClient.subTopics.findMany({
            where: {
                themeId: themeId
            }
        });

        const subTopicList = subTopic.map(sb => {
            return SubTopics.with(sb.id, sb.name, sb.themeId);
        });

        return subTopicList;
    }
}