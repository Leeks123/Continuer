import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/auth')
  authWithGoogle(@Body() authUserDto: AuthUserDto): Promise<any> {
    return this.usersService.authWithGoogle(authUserDto);
  }
}
