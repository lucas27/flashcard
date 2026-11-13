import { SubTopics } from "../../../domain/entity/SubTopics";
import { SubTopicsGateway } from "../../../domain/gateway/SubTopics.gateway";
import { Usecase } from "../../usecase";
import { CreateSubTopicsInputDto, CreateSubTopicsOutputDto } from "./create-subTopics.dto";

export class CreateSubTopicsUsecase implements Usecase<CreateSubTopicsInputDto, CreateSubTopicsOutputDto> {
    private constructor(private readonly subTopicsGateway: SubTopicsGateway) {}

    public static create(subTopicsGateway: SubTopicsGateway) {
        return new CreateSubTopicsUsecase(subTopicsGateway);
    }

    public async execute({ name, themeId }: CreateSubTopicsInputDto): Promise<CreateSubTopicsOutputDto> {
        const theme = SubTopics.create(name, themeId);

        const saveSubTopic = await this.subTopicsGateway.save(theme);

        const output = this.presentOutput(saveSubTopic);

        return output;
    }

    private presentOutput(input: CreateSubTopicsOutputDto): CreateSubTopicsOutputDto {
        return { 
            id: input.id,
            themeId: input.themeId 
        }
    }
}