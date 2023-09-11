import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  

  getAllData() {
    return {
      general: {
        title: 'Test Family Tree',
        text: 'This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. This is some test for developing a family tree viewer. '
      },
      people: [
      {
        id: 1,
        name: 'Gabe Maayan',
        firstName: 'Gabe',
        middleName: 'Evan',
        lastName: 'Maayan',
        otherNames: ['gmaayan'],
        birth: {
          date: '3/30/98',
          location: 'Boston, MA'
        },
        death: null,
        relationships: {
          mother: 3,
          father: 2,
          siblings: [4],
          spouses: [5],
        },
        notes: 'This is gabe',
      },
      {
        id: 2,
        name: 'Jon',
        firstName: 'Jon',
        middleName: null,
        lastName: 'Maayan',
        otherNames: ['jmaayan'],
        birth: {
          date: '3/30/98',
          location: 'Boston, MA'
        },
        death: null,
        relationships: {
          mother: null,
          father: null,
          siblings: [],
          spouses: [3],
        },
        notes: '',
      },
      {
        id: 3,
        name: 'Cheryl',
        firstName: 'Cheryl',
        middleName: null,
        lastName: 'Maayan',
        otherNames: [],
        currentLocation: 'St. Louis, MO',
        birth: {
          date: '3/30/98',
          location: 'Boston, MA'
        },
        death: null,
        relationships: {
          mother: null,
          father: null,
          siblings: [],
          spouses: [2],
        },
        notes: '',
      },
      {
        id: 4,
        name: 'Ari',
        firstName: 'Ari',
        middleName: null,
        lastName: 'Maayan',
        otherNames: [],
        currentLocation: 'Nashville, TN',
        birth: {
          date: '3/30/98',
          location: 'Boston, MA'
        },
        death: null,
        relationships: {
          mother: 3,
          father: 2,
          siblings: [1],
          spouses: [],
        },
        notes: '',
      },
      {
        id: 5,
        name: 'Emily',
        firstName: 'Emily',
        middleName: null,
        lastName: 'McDonnell',
        otherNames: [],
        birth: {
          date: '3/30/98',
          location: 'Boston, MA'
        },
        death: {
          date: 'never',
          location: 'Outer Space',
        },
        relationships: {
          mother: null,
          father: null,
          siblings: [],
          spouses: [1],
        },
        notes: '',
      },
    ]};
  }
}
