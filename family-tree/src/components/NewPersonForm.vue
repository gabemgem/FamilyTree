<script>
import { createPerson } from '../scripts/dataService'

export default {
  props: ['rawData'],
  data() {
    return {
      valid: false,
      formdata: {
        name: '',
        firstName: '',
        middleName: '',
        lastName: '',
        otherNames: '',
        birth: {
          location: '',
          date: '',
        },
        death: {
          location: '',
          date: '',
        },
        currentLocation: '',
        notes: '',
        relationships: {
          mother: { name: '', id: null },
          father: { name: '', id: null },
          stepParents: [],
          siblings: [],
          stepSiblings: [],
          spouses: [],
        },
      },
      nameRules: [
        value => {
          if (value) return true

          return 'Name is required.'
        },
        value => {
          if (value?.length <= 10) return true

          return 'Name must be less than 10 characters.'
        },
      ],
    }
  },
  methods: {
    clearData() {
      this.formdata.firstname = '';
      this.formdata.middlename = '';
      this.formdata.lastname = '';
      this.formdata.othernames = '';
      this.formdata.birth = {
        location: '',
        date: '',
      };
      this.formdata.death = {
        location: '',
        date: '',
      };
      this.formdata.currentlocation = '';
      this.formdata.notes = '';
      this.formdata.relationships = {
        mother: null,
        father: { name: '', id: null },
        stepparents: [],
        siblings: [],
        stepsiblings: [],
        spouses: [],
      };
    },
    submitData() {
      this.formdata.name = `${this.formdata.firstName} ${this.formdata.lastName}`;
      console.log(this.formdata);
      // createPerson(this.formdata)
    }
  },
}
</script>

<template>
  <v-form v-model="valid">
      <v-text-field
        v-model="formdata.firstName"
        :rule="nameRules"
        label="First Name"
      ></v-text-field>
      <v-text-field
        v-model="formdata.middleName"
        :rule="nameRules"
        label="Middle Name"
      ></v-text-field>
      <v-text-field
        v-model="formdata.lastName"
        :rule="nameRules"
        label="Last Name"
      ></v-text-field>
      <v-textarea
        v-model="formdata.otherNames"
        label="Other Names (comma separated)"
      ></v-textarea>
      <v-text-field
        v-model="formdata.currentLocation"
        label="Current Location"
      ></v-text-field>
      <v-textarea
        v-model="formdata.notes"
        label="Notes"
      ></v-textarea>
      Birth 
      <v-text-field
        v-model="formdata.birth.date"
        label="Birth Date"
      ></v-text-field>
      <v-text-field
        v-model="formdata.birth.location"
        label="Birth Location"
      ></v-text-field>
      Death 
      <v-text-field
        v-model="formdata.death.date"
        label="Death Date"
      ></v-text-field>
      <v-text-field
        v-model="formdata.death.location"
        label="Death Location"
      ></v-text-field>
      Relationships (you may only add connections to people already in the family tree)
      <v-autocomplete
        v-model="formdata.relationships.mother"
        :items="rawData.people"
        item-title="name"
        item-value="id"
        chips
        clearable
        label="Mother"
      ></v-autocomplete>
      <v-autocomplete
        v-model="formdata.relationships.father"
        :items="rawData.people"
        item-title="name"
        item-value="id"
        chips
        clearable
        label="Father"
      ></v-autocomplete>
      <v-autocomplete
        v-model="formdata.relationships.stepParents"
        :items="rawData.people"
        item-title="name"
        item-value="id"
        chips
        closable-chips
        label="Step Parents"
        multiple
      ></v-autocomplete>
  </v-form>
</template>