/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';

export class SupermercadoDto {
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  @IsString()
  @IsNotEmpty()
  readonly latitud: string;
  @IsString()
  @IsNotEmpty()
  readonly longitud: string;
  @IsString()
  @IsNotEmpty()
  readonly paginaweb: string;
}