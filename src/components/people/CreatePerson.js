import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PersonService from "../../services/PersonService";

export default function CreatePerson() {

    const { id } = useParams();
    
    const [personId, setPersonId] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [salutation, setSalutation] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            PersonService.getPersonById(id).then((res) => {
                let person = res.data;
                setPersonId(person.id);
                setFirstName(person.firstName);
                setLastName(person.lastName);
                setSalutation(person.salutation);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [id]);

    const saveOrUpdatePerson = (e) => {
        e.preventDefault();
        let person = {
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            salutation: salutation ?? ""
        };

        console.log('person => ' + JSON.stringify(person));

        if (firstName === "" || lastName === "") {
            alert('Please fill all the mandatory (*) fields!');
            return;
        }

        if (!id) {
            PersonService.createPerson(person).then(res => {
                navigate('/');
            });
        } else {
            PersonService.updatePerson(person, id).then(res => {
                navigate('/');
            });
        }
    }

    const getTitle = () => {
        if (!id) {
            return <h3 className="text-center">Add Person</h3>
        }
        return <h3 className="text-center">Update Person</h3>
    }

    const cancel = () => {
        navigate('/');
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            getTitle()
                        }
                        <div className="card-body">
                            {id && (
                                <div className="row">
                                    <table className="table table-striped table-bordered">
                                        <tr>
                                            <th>ID</th>
                                            <td>{personId}</td>
                                        </tr>
                                    </table>
                                </div>
                            )}
                            <form>
                                <div className="form-group">
                                    {!id && (
                                        <label htmlFor="firstname">First Name *</label>
                                    )}
                                    {id && (
                                        <label htmlFor="firstname">First Name</label>
                                    )}
                                    <input placeholder="First Name" type="text" id="firstname" name="firstname" className="form-control" value={firstName ?? ""} onChange={(e) => setFirstName(e.target.value)} /><br />
                                </div>
                                <div className="form-group">
                                    {!id && (
                                        <label htmlFor="lastname">Last Name *</label>
                                    )}
                                    {id && (
                                        <label htmlFor="lastname">Last Name</label>
                                    )}
                                    <input placeholder="Last Name" type="text" id="lastname" name="firstname" className="form-control" value={lastName ?? ""} onChange={(e) => setLastName(e.target.value)} /><br />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="salutation">Salutation</label>
                                    <input placeholder="Salutation" type="text" id="salutation" name="firstname" className="form-control" value={salutation ?? ""} onChange={(e) => setSalutation(e.target.value)} /><br />
                                </div>
                                <button className="btn btn-success" onClick={saveOrUpdatePerson} type="submit">Submit</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
