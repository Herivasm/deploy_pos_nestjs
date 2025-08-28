import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>
  ) { }

  create(createCouponDto: CreateCouponDto) {
    this.couponRepository.save(createCouponDto)
    return `Cupón "${createCouponDto.name}" creado correctamente`
  }

  findAll() {
    return this.couponRepository.find()
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findOneBy({ id })

    if (!coupon) {
      throw new NotFoundException(`El cupón con el ID: ${id} no fue encontrado`)
    }

    return coupon
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id)
    Object.assign(coupon, updateCouponDto)

    await this.couponRepository.save(coupon)

    return 'Cupón actualizado'
  }

  async remove(id: number) {
    const coupon = await this.findOne(id)
    await this.couponRepository.remove(coupon)

    return `Cupón "${coupon.name}" eliminado`;
  }

  async applyCoupon(name: string) {
    const coupon = await this.couponRepository.findOneBy({ name })

    if (!coupon) {
      throw new NotFoundException('Cupón no encontrado')
    }

    const currentDate = new Date()
    const expirationDate = endOfDay(coupon.expirationDate)

    if (isAfter(currentDate, expirationDate)) {
      throw new UnprocessableEntityException(`El cupón "${coupon.name}" ha expirado`)
    }

    return {
      message: 'Cupón válido',
      ...coupon
    }
  }
}
