import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';

@Module({
  providers: [CiudadService],
  controllers: [CiudadController]
})
export class CiudadModule {}
