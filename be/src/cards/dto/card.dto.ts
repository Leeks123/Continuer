import { IsString, IsOptional } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly text: string;

  @IsOptional()
  @IsString({ each: true })
  readonly images: string[];
}
