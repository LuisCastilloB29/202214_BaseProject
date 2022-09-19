import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';

@Entity
export class SupermercadoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column()
  paginaweb: string;

  @ManyToOne(() => CiudadEntity, (ciudad) => ciudad.supermercado)
  ciudad: CiudadEntity;
}
