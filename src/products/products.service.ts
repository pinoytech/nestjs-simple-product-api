import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Product, ProductStatus } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFilterDto } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  createProduct(createProductDto: CreateProductDto): Product {
    const { name, description, price, status } = createProductDto;
    const product: Product = {
      id: uuidv4(),
      name,
      description,
      price,
      status,
    };
    this.products.push(product);
    return product;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProduct(productId: string): Product {
    const [product] = this.findProduct(productId);
    return { ...product };
  }

  getProductsWithFilters(filterDto: ProductFilterDto): Product[] {
    const { status, search } = filterDto;

    let products = this.getAllProducts();

    if (status) {
      products = products.filter(product => product.status === status);
    }

    if (search) {
      products = products.filter(product => {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    return products;
  }

  updateProduct(id: string, updateProductDto: UpdateProductDto): Product {
    const [product, productIndex] = this.findProduct(id);

    let updatedProduct = { ...product };
    const { name, description, price } = updateProductDto;

    if (name) {
      updatedProduct.name = updateProductDto.name;
    }

    if (description) {
      updatedProduct.description = description;
    }

    if (price) {
      updatedProduct.price = price;
    }

    this.products[productIndex] = updatedProduct;

    return this.products[productIndex];
  }

  updateProductStatus(id: string, status: ProductStatus): Product {
    const [product] = this.findProduct(id);
    product.status = status;
    return product;
  }

  deleteProduct(id: string): void {
    const [_, productIndex] = this.findProduct(id);
    this.products.splice(productIndex, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return [product, productIndex];
  }
}
