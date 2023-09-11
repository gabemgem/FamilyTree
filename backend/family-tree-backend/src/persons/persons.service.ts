import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Person } from './schema/person.schema';
// import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    // @InjectModel(Person.name) private personModel: Model<Person>
    @InjectRepository(Person) private personRepository: MongoRepository<Person>,
    ) {}


  async findAll() {
    // let tempPerson = new Person()
    // tempPerson._id = '111';
    // tempPerson.name = 'ggg';

    // return this.personsRepository.insertOne(tempPerson);
    return this.personRepository.find()
      .then((data) => {
        console.log(data);
        return data;
      });
      // return this.personModel.find().exec()
      // .then((data) => {
      //   console.log(data);
      //   return data;
      // });
  }

  createOne(createPersonDto: CreatePersonDto) {
    console.log(createPersonDto);
    const newPerson = new Person();
    newPerson.name = createPersonDto.name;
    newPerson.firstName = createPersonDto.firstName;
    newPerson.middleName = createPersonDto.middleName;
    newPerson.lastName = createPersonDto.lastName;
    newPerson.otherNames = createPersonDto.otherNames;
    newPerson.birth = createPersonDto.birth;
    newPerson.death = createPersonDto.death;
    newPerson.currentLocation = createPersonDto.currentLocation;
    newPerson.relationships = createPersonDto.relationships;
    newPerson.notes = createPersonDto.notes;

    return this.personRepository.insertOne(newPerson);
  }

  createMany(createPersonDtos: CreatePersonDto[]) {
    const newPeople = createPersonDtos.map((createPersonDto) => {
      const newPerson = new Person();
      newPerson.name = createPersonDto.name;
      newPerson.firstName = createPersonDto.firstName;
      newPerson.middleName = createPersonDto.middleName;
      newPerson.lastName = createPersonDto.lastName;
      newPerson.otherNames = createPersonDto.otherNames;
      newPerson.birth = createPersonDto.birth;
      newPerson.death = createPersonDto.death;
      newPerson.currentLocation = createPersonDto.currentLocation;
      newPerson.relationships = createPersonDto.relationships;
      newPerson.notes = createPersonDto.notes;
      return newPerson;
    });

    return this.personRepository.insertMany(newPeople);
  }



  // findAll() {
  //   return `This action returns all persons`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
