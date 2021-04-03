import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { ProductStatus } from './product-status.enum';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  status: ProductStatus;
}
