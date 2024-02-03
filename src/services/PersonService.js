import axios from 'axios';

const API_SERVICE = "http://localhost:8080/api/people";

export function getAllPeople() {
    return axios.get(API_SERVICE);
};

export function getPersonById(id) {
    return axios.get(`${API_SERVICE}/${id}`);
};

export function createPerson(person) {
    return axios.post(API_SERVICE, person);
};

export function updatePerson(id, person) {
    return axios.put(`${API_SERVICE}/${id}`, person);
};

export function deletePerson(id) {
    return axios.delete(`${API_SERVICE}/${id}`);
}
