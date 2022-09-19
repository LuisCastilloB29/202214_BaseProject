import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupermercadoModule } from './supermercado/supermercado.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { CiudadSupermercadoController } from './ciudad-supermercado/ciudad-supermercado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEntity } from "./ciudad/ciudad.entity";
import { SupermercadoEntity } from "./supermercado/supermercado.entity";

@Module({
  imports: [
    SupermercadoModule,
    CiudadModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'supermercados',
      entities: [
        CiudadEntity,
        SupermercadoEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
  }),],
  controllers: [AppController, CiudadSupermercadoController],
  providers: [AppService],
})
export class AppModule {}
