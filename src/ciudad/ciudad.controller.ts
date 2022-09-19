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
import { CiudadService } from './ciudad.service';
import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';
import { plainToInstance } from 'class-transformer';

@Controller('ciudad')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  async findAll() {
    return await this.ciudadService.findAll();
  }

  @Get(':ciudadId')
  async findOne(@Param('ciudadId') ciudadId: string) {
    return await this.ciudadService.findOne(ciudadId);
  }

  @Post()
  async create(@Body() ciudadDto: CiudadDto) {
    const ciudad: CiudadEntity = plainToInstance(CiudadEntity, ciudadDto);
    return await this.ciudadService.create(ciudad);
  }

  @Put(':ciudadId')
  async update(
    @Param('ciudadId') ciudadId: string,
    @Body() ciudadDto: CiudadDto,
  ) {
    const recipe: CiudadEntity = plainToInstance(CiudadEntity, ciudadDto);
    return await this.ciudadService.update(ciudadId, recipe);
  }

  @Delete(':ciudadId')
  async delete(@Param('ciudadId') ciudadId: string) {
    return await this.ciudadService.delete(ciudadId);
  }
}
