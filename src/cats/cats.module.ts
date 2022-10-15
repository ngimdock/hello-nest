import { Module } from '@nestjs/common';
import { ALIAS_CATS_SERVICE } from 'src/constants/constants';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// Custom provider
// The useValue syntax is useful for injecting a constant value, putting an external library
// into the Nest container, or replacing a real implementation with a mock object.
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

// Alias providers
// The useExisting syntax allows you to create aliases for existing providers.
const CatsAliasProvider = {
  provide: ALIAS_CATS_SERVICE,
  useExisting: CatsService,
};

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
      // useValue: mockCatsService,
    },
    CatsAliasProvider,
  ],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
