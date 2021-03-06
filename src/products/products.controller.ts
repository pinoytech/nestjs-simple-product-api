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
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/filter-product.dto';
import { Product } from './product.entity';
import { ProductStatus } from './product-status.enum';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto, user);
  }

  @Get()
  getAllProducts(
    @Query(ValidationPipe) filterDto: ProductFilterDto,
    @GetUser() user: User,
  ): Promise<Product[]> {
    return this.productsService.getAllProducts(filterDto, user);
  }

  @Get('/:id')
  getProduct(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.getProductById(id, user);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto, user);
  }

  @Patch('/:id/status')
  updateProductStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.updateProductStatus(id, status, user);
  }

  @Delete('/:id')
  deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.productsService.deleteProduct(id, user);
  }
}
