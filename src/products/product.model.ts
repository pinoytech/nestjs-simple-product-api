export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
}

export enum ProductStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}
