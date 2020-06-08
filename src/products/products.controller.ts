import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { Product } from './product.model';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): Product {
    return this.productsService.getProduct(id);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): Product {
    return this.productsService.updateProduct(id, name, description, price);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): void {
    this.productsService.deleteProduct(id);
  }
}
