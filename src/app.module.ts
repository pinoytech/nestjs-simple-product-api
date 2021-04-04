import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
})
export class AppModule {}
