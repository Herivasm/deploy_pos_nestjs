import { IsDateString, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateCouponDto {
    @IsNotEmpty({ message: 'El nombre del cupón es obligatorio' })
    @IsString({ message: 'Nombre de cupón no válido' })
    name: string

    @IsNotEmpty({ message: 'El descuento del cupón es obligatorio' })
    @Max(100, { message: 'El máximo de descuento es de 100%' })
    @Min(1, { message: 'El mínimo de descuento es de 1%' })
    percentage: number

    @IsNotEmpty({ message: 'La fecha de expiración es necesaria' })
    @IsDateString({}, { message: 'Fecha no válida' })
    expirationDate: Date
}
