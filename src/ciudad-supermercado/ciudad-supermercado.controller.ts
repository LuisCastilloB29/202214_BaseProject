import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';

@Controller('cities/:cityId')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadSupermercadoController {
  constructor(
    private readonly ciudadSupermercadoService: CiudadSupermercadoService,
  ) {}

  @Post('/supermarket/:supermarketId')
  async addRecipeCulture(
    @Param('cityId') ciudadId: string,
    @Param('supermarketId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.addSupermercadoCiudad(
      ciudadId,
      supermercadoId,
    );
  }

  @Get('/supermarket/:supermarketId')
  async findSupermercadoByCiudadIdSupermercadoId(
    @Param('cityId') ciudadId: string,
    @Param('supermarketId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.findsupermercadoByciudadIdsupermercadoId(
      ciudadId,
      supermercadoId,
    );
  }

  @Get('')
  async findRecipesByCultureId(@Param('cityId') ciudadId: string) {
    return await this.ciudadSupermercadoService.findsupermercadosByciudadId(
      ciudadId,
    );
  }

  @Delete('/supermarket/:supermarketId')
  @HttpCode(204)
  async deleteRecipeCulture(
    @Param('cityId') ciudadId: string,
    @Param('supermarketId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.deletesupermercadosciudad(
      ciudadId,
      supermercadoId,
    );
  }
}
