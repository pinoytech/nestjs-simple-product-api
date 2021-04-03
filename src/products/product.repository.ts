import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilterDto } from './dto/filter-product.dto';

import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getAllProducts(filterDto: ProductFilterDto): Promise<Product[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('product');

    if (status) {
      query.andWhere('product.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(product.name) LIKE :search OR LOWER(product.description) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }
    const products = await query.getMany();
    return products;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, status } = createProductDto;
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.status = status;
    await product.save();

    return product;
  }
}
