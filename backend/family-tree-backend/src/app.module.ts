import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonsModule } from './persons/persons.module';
import { TreesModule } from './trees/trees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './persons/entities/person.entity';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/familytree'),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'familytree',
      entities: [Person]
    }),
    PersonsModule,
    TreesModule
    ,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
