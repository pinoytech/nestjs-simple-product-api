import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';

import { Product, ProductStatus } from './product.model';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/filter-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  getAllProducts(
    @Query(ValidationPipe) filterDto: ProductFilterDto,
  ): Product[] {
    if (Object.keys(filterDto).length) {
      return this.productsService.getProductsWithFilters(filterDto);
    } else {
      return this.productsService.getAllProducts();
    }
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): Product {
    return this.productsService.getProduct(id);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Patch('/:id/status')
  updateProductStatus(
    @Param('id') id: string,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
  ): Product {
    return this.productsService.updateProductStatus(id, status);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): void {
    this.productsService.deleteProduct(id);
  }
}
