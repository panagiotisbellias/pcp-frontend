import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PersonService from "../../services/PersonService";

export default function ViewPerson() {

    const { id } = useParams();
    const [person, setPerson] = useState({});

    useEffect(() => {
        let intervalId;

        const fetchInfo = () => {
            PersonService.getPersonById(id).then(res => {
                setPerson(res.data);
            });
        };

        intervalId = setInterval(fetchInfo, 3000);

        return () => {
            clearInterval(intervalId);
        }
    }, [id, person]);

    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">View Person Details</h3>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <tr>
                            <th>ID</th>
                            <td>{person.id}</td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>{person.firstName}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{person.lastName}</td>
                        </tr>
                        <tr>
                            <th>Salutation</th>
                            <td>{person.salutation}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )

}
