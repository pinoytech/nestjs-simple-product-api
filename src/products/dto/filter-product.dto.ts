import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { ProductStatus } from '../product.model';

export class ProductFilterDto {
  @IsOptional()
  @IsIn([ProductStatus.PUBLISHED, ProductStatus.DRAFT])
  status: ProductStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
