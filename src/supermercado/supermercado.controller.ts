import {
  Controller,
  UseInterceptors,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SupermercadoService } from './supermercado.service';
import { SupermercadoDto } from './supermercado.dto';
import { SupermercadoEntity } from './supermercado.entity';

import { plainToInstance } from 'class-transformer';

@Controller('supermarkets')
@UseInterceptors(BusinessErrorsInterceptor)
export class SupermercadoController {
  constructor(private readonly SupermercadoService: SupermercadoService) {}

  @Get()
  async findAll() {
    return await this.SupermercadoService.findAll();
  }

  @Get(':supermarketId')
  async findOne(@Param('supermarketId') supermercadoId: string) {
    return await this.SupermercadoService.findOne(supermercadoId);
  }

  @Post()
  async create(@Body() SupermercadoDto: SupermercadoDto) {
    const supermercado: SupermercadoEntity = plainToInstance(
      SupermercadoEntity,
      SupermercadoDto,
    );
    return await this.SupermercadoService.create(supermercado);
  }

  @Put(':supermarketId')
  async update(
    @Param('supermarketId') supermercadoId: string,
    @Body() SupermercadoDto: SupermercadoDto,
  ) {
    const recipe: SupermercadoEntity = plainToInstance(
      SupermercadoEntity,
      SupermercadoDto,
    );
    return await this.SupermercadoService.update(supermercadoId, recipe);
  }

  @Delete(':supermarketId')
  async delete(@Param('supermarketId') supermercadoId: string) {
    return await this.SupermercadoService.delete(supermercadoId);
  }
}
