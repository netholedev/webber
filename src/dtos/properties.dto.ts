import { IsString } from "class-validator";
import { transformAndValidate } from "class-transformer-validator";

export class CreatePropertyDto {
  @IsString()
  name!: string;

  async fromJson(data: Record<string, any>): Promise<CreatePropertyDto> {
    return transformAndValidate(CreatePropertyDto, data)
  }
}

export class UpdatePropertyDto { }
export class FindPropertiesQuery { }