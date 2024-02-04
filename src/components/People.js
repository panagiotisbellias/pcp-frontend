import { useRoutes } from "react-router-dom";
import ListPeopleComponent from "./people/ListPeopleComponent";
import CreatePerson from "./people/CreatePerson";
import ViewPerson from "./people/ViewPerson";

export default function People() {

    const element = useRoutes([
        { path: "/", element: <ListPeopleComponent /> },
        { path: "/add-person/_add", element: <CreatePerson /> },
        { path: "/add-person/:id", element: <CreatePerson /> },
        { path: "/view-person/:id", element: <ViewPerson /> }
    ]);

    return (

        <div>
            <div>
                <h1>People Management</h1>
                {element}
            </div>
        </div>
    );

}