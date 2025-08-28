import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @IsString({ message: 'Nombre no válido' })
    name: string

    @IsNotEmpty({ message: 'La imagen del producto es obligatorio' })
    image: string

    @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio no válido' })
    price: number

    @IsNotEmpty({ message: 'La cantidad de producto no puede ir vacía' })
    @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Cantidad no válida' })
    inventory: number

    @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
    @IsInt({ message: 'Categoría no válida' })
    categoryId: number
}
