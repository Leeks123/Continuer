import { Param, Get, Controller, Post, Delete, Body } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/card.dto';
import { Cards } from './entities/cards.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('')
  findInitData(): Promise<Cards[]> {
    return this.cardsService.findInitData();
  }

  @Get(':id')
  findPageData(@Param('id') id: number): Promise<Cards[]> {
    console.log('findPageData', id);
    return this.cardsService.findPageData(id);
  }

  @Get(':date')
  findFromDate(@Param() date: Date): Promise<Cards[]> {
    return this.cardsService.findFromDate(date);
  }

  @Post('')
  create(@Body() createCardDto: CreateCardDto): Promise<any> {
    return this.cardsService.create(createCardDto);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: number) {
    return this.cardsService.delete(userId);
  }
}
