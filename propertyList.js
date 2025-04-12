import React,{useEffect, useState} from "react";
import axios from "axios";
import "./propertyForm.css";

function PropertyList({onDelete,onEdit}) {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios
          .get("http://localhost:5000/properties")
          .then((response) => {
            setProperties(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    const handleDelete = (id) => {
        axios
          .delete(`http://localhost:5000/properties/${id}`)
          .then(() => {
            onDelete(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const handleEdit = (property) => {
        onEdit(property);
      };

      const handleSearch = (event) => {
        event.preventDefault();
        const searchedProperty = properties.find(property => property.id === searchTerm);
        if (searchedProperty) {
            setSelectedProperty(searchedProperty);
        } else {
            alert('Property not found');
        }
      };

    return (
        <div>
            <h2>Property List</h2>
            <form onSubmit={handleSearch}>
                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by ID" />
                <button type="submit">Search</button>
            </form>
            <table id="property">
                <thead>
                    <tr>
                        <th>Property ID</th>
                        <th>Owner</th>
                        <th>Property Type</th>
                        <th>Rental Status</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property.id}>
                            <td>{property.propertyid}</td>
                            <td>{property.owner}</td>
                            <td>{property.propertytype}</td>
                            <td>{property.RentalStatus}</td>
                            <td>{property.location}</td>
                            <td>
                                <button  id="edit"onClick={() => handleEdit(property)}>Edit</button>
                                <button id="edit"onClick={() => handleDelete(property.id)}>Delete</button>
                                <button id="edit"onClick={() => setSelectedProperty(property)}>Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedProperty && (
                <div>
                    <h2>Property Details</h2>
                    <p>Property ID: {selectedProperty.propertyid}</p>
                    <p>Owner: {selectedProperty.owner}</p>
                    <p>Property Type: {selectedProperty.propertytype}</p>
                    <p>Rental Status: {selectedProperty.RentalStatus}</p>
                    <p>Location: {selectedProperty.location}</p>
                </div>
            )}
        </div>
    );
}
export default PropertyList

