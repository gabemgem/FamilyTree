import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post('create_one')
  createOne(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.createOne(createPersonDto);
  }

  @Post('create_many')
  createMany(@Body() createPersonDtos: CreatePersonDto[]) {
    return this.personsService.createMany(createPersonDtos);
  }

  @Get()
  @Post('get_all')
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  @Post('get_one/:id')
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }

  @Post('update_one/:id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @Post('delete_one/:id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }
}
