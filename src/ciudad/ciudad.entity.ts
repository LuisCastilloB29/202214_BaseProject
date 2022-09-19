import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';

@Entity
export class CiudadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column()
  habitantes: string;

  @OneToMany(() => SupermercadoEntity, (supermercado) => supermercado.ciudad)
  supermercado: SupermercadoEntity[];
}
