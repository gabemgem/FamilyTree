import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Person, PersonSchema } from './schema/person.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }])
    TypeOrmModule.forFeature([Person])
  ],
  controllers: [PersonsController],
  providers: [PersonsService]
})
export class PersonsModule {}
