import { useEffect, useState } from "react";
import axios from "axios";
import "./propertyForm.css";

function PropertyForm({ selectedProperty, onSave }) {
  const [property, setProperty] = useState({
    propertyid: "",
    owner: "",
    propertytype: "",
    RentalStatus: "",
    location: "",
  });

  useEffect(() => {
    if (selectedProperty) {
      setProperty(selectedProperty);
    }
  }, [selectedProperty]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedProperty) {
      axios
        .put(`http://localhost:5000/properties/${selectedProperty.id}`, property)
        .then((response) => {
          onSave(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:5000/properties", property)
        .then((response) => {
          onSave(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <center><h1>Property Form</h1></center>
      <center>
      <table>
        <tbody>
          <tr>
            <th>Property ID</th>
            <td>
              <input
                type="text"
                name="propertyid"
                value={property.propertyid}
                onChange={handleChange}
                placeholder="Property ID"
              />
            </td>
          </tr>
          <tr>
            <th>Owner</th>
            <td>
              <input
                type="text"
                name="owner"
                value={property.owner}
                onChange={handleChange}
                placeholder="Owner"
              />
            </td>
          </tr>
          <tr>
            <th>Property Type</th>
            <td>
              <input
                type="text"
                name="propertytype"
                value={property.propertytype}
                onChange={handleChange}
                placeholder="Property Type"
              />
            </td>
          </tr>
          <tr>
            <th>Rental Status</th>
            <td>
              <input
                type="text"
                name="RentalStatus"
                value={property.RentalStatus}
                onChange={handleChange}
                placeholder="Rental Status"
              />
            </td>
          </tr>
          <tr>
            <th>Location</th>
            <td>
              <input
                type="text"
                name="location"
                value={property.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </td>
          </tr>
          <tr>
          <button type="submit">
        {selectedProperty ? "Update Property" : "Add Property"}
      </button>
          </tr>
        </tbody>
      </table>
      </center>
      
    </form>
  );
}

export default PropertyForm;

