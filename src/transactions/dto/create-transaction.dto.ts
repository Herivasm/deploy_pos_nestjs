import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class TransactionContentsDto {
    @IsNotEmpty({ message: 'El ID del producto no puede estar vacío' })
    @IsInt({ message: 'Producto no válido' })
    productId: number;

    @IsNotEmpty({ message: 'La cantidad no puede estar vacía' })
    @IsInt({ message: 'Cantidad no válida' }) // Validate quantity too
    quantity: number;

    @IsNotEmpty({ message: 'El precio no puede estar vacío' })
    @IsNumber({}, { message: 'Precio no válido' })
    price: number;
}

export class CreateTransactionDto {
    @IsNotEmpty({ message: 'El total no puede ir vacio' })
    @IsNumber({}, { message: 'Cantidad no válida' })
    total: number

    @IsOptional()
    coupon: string

    @IsArray()
    @ArrayNotEmpty({ message: 'Los contenidos no pueden ir vacios' })
    @ValidateNested() // Subvalidations
    @Type(() => TransactionContentsDto)
    contents: TransactionContentsDto[]
}