import { IsString } from 'class-validator';

export class AuthUserDto {
  @IsString()
  readonly token: string;
}
