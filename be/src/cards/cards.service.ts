import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Raw, Repository } from 'typeorm';
import { CreateCardDto } from './dto/card.dto';
import { Cards } from './entities/cards.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Cards)
    private cardRepository: Repository<Cards>,
  ) {}

  async findFromDate(date: Date): Promise<Cards[]> {
    return await this.cardRepository.find({
      createdAt: Raw((alias) => `${alias} > ${date}`),
    });
  }

  async findInitData(): Promise<Cards[]> {
    return await this.cardRepository.find({
      order: { id: 'DESC' },
      take: 10,
    });
  }

  async findPageData(lastId: number): Promise<Cards[]> {
    return await this.cardRepository.find({
      id: Between(lastId - 11, lastId - 1),
    });
  }

  async create(card: CreateCardDto): Promise<Cards> {
    await this.cardRepository.save(card);
    // const response = await this.cardRepository.findOne({ text: card.text });
    const response = await this.cardRepository.findOne({
      order: { id: 'DESC' },
    });
    return response;
  }

  async delete(id: number): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
