import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import {
  CreateCatDto,
  UpdateCatDto,
  createCatSchema,
} from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { CustomException } from 'src/filters/custom-exception';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { JoiValidationPipe } from 'src/pipes/joiValidation.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CustomParseIntPipe } from 'src/pipes/custom-parse-int.pipe';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post('/error')
  async throwAndException(): Promise<void> {
    //custom exception
    throw new CustomException();

    //exception that only change the status code and the error message
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    //exception that change all the response error object
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: "Interdit d'éffectuer cette action",
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get()
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ): Promise<Cat[]> {
    console.log({ activeOnly, page });

    return this.catsService.findAll();
  }

  @Get(':id')
  async getOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Post()
  // @UseFilters(HttpExceptionFilter)
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ): Promise<string> {
    // throw new CustomException();
    this.catsService.create(createCatDto);
    return 'cat was created';
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<string> {
    console.log({ updateCatDto });

    return `Update the cat with the id ${id} and data ${JSON.stringify(
      updateCatDto,
    )}`;
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', new CustomParseIntPipe()) id): string {
    this.catsService.remove(id);

    return 'cat was removed';
  }
}