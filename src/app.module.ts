import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './modules/product.module';
import { CartModule } from './modules/cart.module';
import { OrderModule } from './modules/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://amit_singh:kya_hal_hai_tere@cluster0.jpqo2bq.mongodb.net/IDS-DB'
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    ProductModule,
    CartModule,
    OrderModule,
  ],
})
export class AppModule {}
