import { SubTopics } from "../../../domain/entity/SubTopics";
import { SubTopicsGateway } from "../../../domain/gateway/SubTopics.gateway";
import { Usecase } from "../../usecase";
import { CreateSubTopicsInputDto, CreateSubTopicsOutputDto } from "./create-subTopics.dto";

export class CreateSupTopicsUsecase implements Usecase<CreateSubTopicsInputDto, CreateSubTopicsOutputDto> {
    private constructor(private readonly subTopicsGateway: SubTopicsGateway) {}

    public static create(subTopicsGateway: SubTopicsGateway) {
        return new CreateSupTopicsUsecase(subTopicsGateway);
    }

    public async execute({ name }: CreateSubTopicsInputDto): Promise<CreateSubTopicsOutputDto> {
        const theme = SubTopics.create(name);

        const saveId = await this.subTopicsGateway.save(theme);

        const output = this.presentOutput(saveId);

        return output;
    }

    private presentOutput(id: number): CreateSubTopicsOutputDto {
        return { id }
    }
}