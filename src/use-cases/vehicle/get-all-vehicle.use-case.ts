import { Inject, Injectable } from "@nestjs/common";
import { VehicleModel } from "src/domain/models/vehicle.model";
import { VehicleRepository } from "src/infastructure/repositories/vehicle.repository";

@Injectable()
export class GetAllVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly _vehicleRepository: VehicleRepository,
  ) {}

  async execute(page: number, limit: number): Promise<{
    data: VehicleModel[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this._vehicleRepository.findAll(page, limit);
  }
}