/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';

export class CiudadDto {
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  @IsString()
  @IsNotEmpty()
  readonly pais: string;
  @IsString()
  @IsNotEmpty()
  readonly habitantes: string;
}