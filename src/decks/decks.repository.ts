import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DeckDocument } from './deck.model';
import { DeckDto } from './decks.dto';

@Injectable()
export class DecksRepository {
  constructor(@InjectModel('Deck') private readonly deckModel: Model<DeckDocument>) {}

  async findById(id: string): Promise<DeckDocument> {
    return await this.deckModel.findById(id).exec();
  }

  async getAllByUserId(userId: string): Promise<DeckDocument[]> {
    return await this.deckModel.find({ userId }).exec();
  }

  async saveDeck(deckDto: DeckDto): Promise<DeckDocument> {
    const deck = new this.deckModel({
      name: deckDto.name,
      link: deckDto.link,
      progress: deckDto.progress,
      userId: deckDto.userId,
    });
    return await deck.save();
  }
}
