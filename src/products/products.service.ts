import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  createProduct(createProductDto: CreateProductDto): Product {
    const { name, description, price } = createProductDto;
    const product: Product = {
      id: uuidv4(),
      name,
      description,
      price,
    };
    this.products.push(product);
    return product;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const [product] = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
  ): Product {
    const [product, productIndex] = this.findProduct(id);

    const updatedProduct = { ...product };

    if (name) {
      updatedProduct.name = name;
    }

    if (description) {
      updatedProduct.description = description;
    }

    if (price) {
      updatedProduct.price = price;
    }

    return (this.products[productIndex] = updatedProduct);
  }

  deleteProduct(id: string) {
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
