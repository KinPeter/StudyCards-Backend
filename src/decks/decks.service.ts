import { Injectable, NotFoundException } from '@nestjs/common';

import { MyLogger } from 'src/shared/my-logger.service';
import { DecksRepository } from './decks.repository';
import { DeckResource } from './decks.types';
import { DeckDocument } from './deck.model';
import { DeckDto } from './decks.dto';

@Injectable()
export class DecksService {
  constructor(private readonly decksRepository: DecksRepository, private readonly logger: MyLogger) {
    this.logger.setContext('DecksService');
  }

  async getById(id: string): Promise<DeckResource> {
    const doc: DeckDocument = await this.decksRepository.findById(id);
    if (!doc) {
      this.logger.warn(`Deck with id: ${id} not found!`);
      throw new NotFoundException();
    }
    this.logger.log(`Deck with id: ${id} retrieved for user (id: ${doc.userId})`);
    return new DeckResource(doc._id, doc.userId, doc.name, doc.link, doc.progress);
  }

  async getAllForUser(userId: string): Promise<DeckResource[]> {
    const docs: DeckDocument[] = await this.decksRepository.getAllByUserId(userId);
    this.logger.log(`All Decks retrieved for user (id: ${userId})`);
    return docs.map(
      (doc: DeckDocument) => new DeckResource(doc._id, doc.userId, doc.name, doc.link, doc.progress),
    );
  }

  async createDeck(deckDto: DeckDto): Promise<DeckResource> {
    const doc: DeckDocument = await this.decksRepository.saveDeck(deckDto);
    this.logger.log(`Deck with id: ${doc._id} created for user (id: ${doc.userId})`);
    return new DeckResource(doc._id, doc.userId, doc.name, doc.link, doc.progress);
  }
}
