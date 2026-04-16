import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleModel } from 'src/domain/models/vehicle.model';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../entity/vehicle.entity';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly _vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async create(data: Partial<VehicleModel>): Promise<VehicleModel> {
    const entity = this._vehicleRepository.create(data);
    const saved = await this._vehicleRepository.save(entity);
    return this.toModel(saved);
  }

  async findAll(): Promise<VehicleModel[]> {
    const entities = await this._vehicleRepository.find();
    return entities.map((entity) => this.toModel(entity));
  }

  async findById(id: number): Promise<VehicleModel | null> {
    const entity = await this._vehicleRepository.findOne({ where: { id } });
    return entity ? this.toModel(entity) : null;
  }

  private toModel(entity: VehicleEntity): VehicleModel {
    return {
      id: entity.id,
      title: entity.title,
      hourlyRate: entity.hourlyRate,
      dailyRate: entity.dailyRate,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
