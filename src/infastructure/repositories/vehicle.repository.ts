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

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    data: VehicleModel[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;

    const [entities, total] = await this._vehicleRepository.findAndCount({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
    });
    return {
      data: entities.map((entity) => this.toModel(entity)),
      total: total,
      page: page,
      limit: limit,
    };
  }

  async findById(id: number): Promise<VehicleModel | null> {
    const entity = await this._vehicleRepository.findOne({ where: { id } });
    return entity ? this.toModel(entity) : null;
  }

  async update(updatedVehicle: VehicleModel): Promise<VehicleModel> {
    const entity = this._vehicleRepository.create(updatedVehicle);
    const saved = await this._vehicleRepository.save(entity);
    return this.toModel(saved);
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this._vehicleRepository.delete(id);
    return (result.affected ?? 0) > 0;
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
