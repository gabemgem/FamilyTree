import axios from 'axios'

const dataUrl = 'http://localhost:3000';

export async function loadData() {
    const dataResponse = await axios.get(dataUrl)
    return dataResponse.data
}

export async function createPerson(data) {
    const createPersonUrl = dataUrl + '/persons/create_one';
    return axios.post(createPersonUrl, data);
} 
