import { IsNotEmpty, IsIn } from 'class-validator';
import { ProductStatus } from '../product-status.enum';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsIn([ProductStatus.PUBLISHED, ProductStatus.DRAFT])
  status: ProductStatus;
}
