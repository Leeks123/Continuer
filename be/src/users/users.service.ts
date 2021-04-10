import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private cardRepository: Repository<Users>,
  ) {}

  async authWithGoogle(authUserDto: AuthUserDto): Promise<any> {
    return '';
  }
}
