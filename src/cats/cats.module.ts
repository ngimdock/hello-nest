import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const mockCatsService = {
  name: 'gabriel',

  findAll: () => {
    return 'All the cats';
  },

  create: () => {
    return 'cat created';
  },

  remove: () => {
    return 'cat removed';
  },

  findOne: () => {
    return 'This is a single cat';
  },
};

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      // useClass: CatsService,
      useValue: mockCatsService,
    },
  ],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
