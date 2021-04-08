import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/filter-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { ProductStatus } from './product-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDto, user);
  }

  async getAllProducts(
    filterDto: ProductFilterDto,
    user: User,
  ): Promise<Product[]> {
    return this.productRepository.getAllProducts(filterDto, user);
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    user: User,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });
    const updatedProduct = { ...product, ...updateProductDto };
    return this.productRepository.save(updatedProduct);
  }

  async updateProductStatus(
    id: number,
    status: ProductStatus,
    user: User,
  ): Promise<Product> {
    const product = await this.getProductById(id, user);
    product.status = status;
    await product.save();
    return product;
  }

  async deleteProduct(id: number, user: User): Promise<void> {
    const result = await this.productRepository.delete({
      id,
      userId: user.id,
    });
    console.log(result);
    if (!result.affected) {
      throw new NotFoundException('Could not find product.');
    }
  }

  async getProductById(id: number, user: User): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
        userId: user.id,
      },
    });
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
