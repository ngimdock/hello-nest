import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }

  create(cat: Cat): void {
    this.cats.push(cat);
  }

  findOne(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }

  remove(id: number): void {
    const index = this.cats.findIndex((cat) => cat.id === id);
    this.cats.splice(index, 1);
  }
}
