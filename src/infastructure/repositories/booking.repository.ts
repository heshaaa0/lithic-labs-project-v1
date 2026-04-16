import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingModel } from 'src/domain/models/booking.model';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entity/booking.entity';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly _bookingRepository: Repository<BookingEntity>,
  ) {}

  async create(data: Partial<BookingModel>): Promise<BookingModel> {
    const entity = this._bookingRepository.create(data);
    const saved = await this._bookingRepository.save(entity);
    return this.toModel(saved);
  }

  async findAll(): Promise<BookingModel[]> {
    const entities = await this._bookingRepository.find();
    return entities.map((entity) => this.toModel(entity));
  }

  async findById(id: number): Promise<BookingModel | null> {
    const entity = await this._bookingRepository.findOne({ where: { id } });
    return entity ? this.toModel(entity) : null;
  }


  async existsOverlapping(
    vehicleId: number,
    pickupDateTime: Date,
    returnDateTime: Date,
    excludeBookingId?: number,
  ): Promise<boolean> {
    const qb = this._bookingRepository
      .createQueryBuilder('booking')
      .where('booking.vehicleId = :vehicleId', { vehicleId })
      .andWhere('booking.pickupDateTime < :returnDateTime', { returnDateTime })
      .andWhere('booking.returnDateTime > :pickupDateTime', { pickupDateTime });

    if (excludeBookingId !== undefined) {
      qb.andWhere('booking.id != :excludeBookingId', { excludeBookingId });
    }

    const count = await qb.getCount();
    return count > 0;
  }

  private toModel(entity: BookingEntity): BookingModel {
    return {
      id: entity.id,
      vehicleId: entity.vehicleId,
      pickupDateTime: entity.pickupDateTime,
      returnDateTime: entity.returnDateTime,
      pricingMode: entity.pricingMode,
      totalAmount: entity.totalAmount,
      createdAt: entity.createdAt,
    };
  }
}
