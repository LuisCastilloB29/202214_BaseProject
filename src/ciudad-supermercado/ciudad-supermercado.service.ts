import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';

@Injectable()
export class CiudadSupermercadoService {
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>,

    @InjectRepository(SupermercadoEntity)
    private readonly supermercadoRepository: Repository<SupermercadoEntity>,
  ) {}

  async addSupermercadoCiudad(
    ciudadId: string,
    supermercadoId: string,
  ): Promise<CiudadEntity> {
    const supermercado: SupermercadoEntity =
      await this.supermercadoRepository.findOne({
        where: { id: supermercadoId },
      });
    if (!supermercado)
      throw new BusinessLogicException(
        'The market with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercado'],
    });
    if (!ciudad)
      throw new BusinessLogicException(
        'The city with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    ciudad.supermercado = [...ciudad.supermercado, supermercado];
    return await this.ciudadRepository.save(ciudad);
  }

  async findsupermercadoByciudadIdsupermercadoId(
    ciudadId: string,
    supermercadoId: string,
  ): Promise<SupermercadoEntity> {
    const supermercado: SupermercadoEntity =
      await this.supermercadoRepository.findOne({
        where: { id: supermercadoId },
      });
    if (!supermercado)
      throw new BusinessLogicException(
        'The supermercado with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercado'],
    });
    if (!ciudad)
      throw new BusinessLogicException(
        'The ciudad with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const ciudadsupermercado: SupermercadoEntity = ciudad.supermercado.find(
      (e) => e.id === supermercado.id,
    );

    if (!ciudadsupermercado)
      throw new BusinessLogicException(
        'The supermercado with the given id is not associated to the ciudad',
        BusinessError.PRECONDITION_FAILED,
      );

    return ciudadsupermercado;
  }

  async findsupermercadosByciudadId(
    ciudadId: string,
  ): Promise<SupermercadoEntity[]> {
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercado'],
    });
    if (!ciudad)
      throw new BusinessLogicException(
        'The ciudad with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return ciudad.supermercado;
  }

  async associatesupermercadosciudad(
    ciudadId: string,
    supermercados: SupermercadoEntity[],
  ): Promise<CiudadEntity> {
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercado'],
    });

    if (!ciudad)
      throw new BusinessLogicException(
        'The ciudad with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < supermercados.length; i++) {
      const supermercado: SupermercadoEntity =
        await this.supermercadoRepository.findOne({
          where: { id: supermercados[i].id },
        });
      if (!supermercado)
        throw new BusinessLogicException(
          'The supermercado with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    ciudad.supermercado = supermercados;
    return await this.ciudadRepository.save(ciudad);
  }

  async deletesupermercadosciudad(ciudadId: string, supermercadoId: string) {
    const supermercado: SupermercadoEntity =
      await this.supermercadoRepository.findOne({
        where: { id: supermercadoId },
      });
    if (!supermercado)
      throw new BusinessLogicException(
        'The supermercado with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
      relations: ['supermercado'],
    });
    if (!ciudad)
      throw new BusinessLogicException(
        'The ciudad with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const ciudadsupermercado: SupermercadoEntity = ciudad.supermercado.find(
      (e) => e.id === supermercado.id,
    );

    if (!ciudadsupermercado)
      throw new BusinessLogicException(
        'The supermercado with the given id is not associated to the ciudad',
        BusinessError.PRECONDITION_FAILED,
      );

    ciudad.supermercado = ciudad.supermercado.filter(
      (e) => e.id !== supermercadoId,
    );
    await this.ciudadRepository.save(ciudad);
  }
}
