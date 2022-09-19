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

@Controller('ciudad/:ciudadId')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadSupermercadoController {
  constructor(
    private readonly ciudadSupermercadoService: CiudadSupermercadoService,
  ) {}

  @Post('/supermercado/:supermercadoId')
  async addRecipeCulture(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.addSupermercadoCiudad(
      ciudadId,
      supermercadoId,
    );
  }

  @Get('/supermercado/:supermercadoId')
  async findSupermercadoByCiudadIdSupermercadoId(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.findsupermercadoByciudadIdsupermercadoId(
      ciudadId,
      supermercadoId,
    );
  }

  @Get('')
  async findRecipesByCultureId(@Param('ciudadId') ciudadId: string) {
    return await this.ciudadSupermercadoService.findsupermercadosByciudadId(
      ciudadId,
    );
  }

  @Delete('/supermercado/:supermercadoId')
  @HttpCode(204)
  async deleteRecipeCulture(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.deletesupermercadosciudad(
      ciudadId,
      supermercadoId,
    );
  }
}
