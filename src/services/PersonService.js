import axios from 'axios';

const API_SERVICE = "http://localhost:8080/api/people";

class PersonService {

    getAllPeople() {
        return axios.get(API_SERVICE);
    };
    
    getPersonById(id) {
        return axios.get(`${API_SERVICE}/${id}`);
    };
    
    createPerson(person) {
        return axios.post(API_SERVICE, person);
    };
    
    updatePerson(id, person) {
        return axios.put(`${API_SERVICE}/${id}`, person);
    };
    
    deletePerson(id) {
        return axios.delete(`${API_SERVICE}/${id}`);
    };

}

export default new PersonService();
