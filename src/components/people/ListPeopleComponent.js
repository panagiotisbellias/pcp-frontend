import PersonService from "../../services/PersonService";
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function ListPeopleComponent() {

    const [people, setPeople] = useState([]);
    const navigate = useNavigate();

    const deletePerson = (id) => {
        PersonService.deletePerson(id).then(res => {
            setPeople(people.filter((person) => person.id !== id));
        });
    };

    const ViewPerson = (id) => {
        navigate(`/view-person/${id}`);
    }

    const editPerson = (id) => {
        navigate(`/add-person/${id}`);
    }

    const addPerson = () => {
        navigate('/add-person/_add');
    }

    useEffect(() => {
        let intervalId;

        const fetchPeople = () => {
            PersonService.getAllPeople().then((res) => {
                setPeople(res.data);
            }).catch((error) => {
                console.error(error);
            });
        };

        intervalId = setInterval(fetchPeople, 3000);

        return () => {
            clearInterval(intervalId);
        }
    }, [people]);

    return (
        <div>
            <h2 className="text-center">People List</h2>
            <div className="row add-person-div">
                <button className="btn btn-primary add-person-btn" onClick={addPerson}>Add Person</button>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> Salutation </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            people.map(
                                person => 
                                    <tr key={person.id}>
                                        <td> {person.firstName} </td>
                                        <td> {person.lastName} </td>
                                        <td> {person.salutation} </td>
                                        <td>
                                            <button onClick={() => editPerson(person.id)} className="btn btn-info">Update</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => deletePerson(person.id)} className="btn btn-danger">Delete</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => ViewPerson(person.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}
