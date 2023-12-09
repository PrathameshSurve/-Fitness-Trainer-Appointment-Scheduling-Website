import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

let AddContact = () => {
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      location: "",
      date: "",
      mobile: "",
      address: "",
    },
    errorMessage: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
        alert("New appointment added successfully.");
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  let { loading, contact, errorMessage } = state;

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className="subtitle text-center p-4 text-success">
                    Add Apointments
                  </h2>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci cumque odit deserunt consequuntur tempore minima ad
                    eligendi in perspiciatis a!
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="location"
                        value={contact.location}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="date"
                        value={contact.date}
                        onChange={updateInput}
                        type="datetime-local"
                        className="form-control"
                        placeholder="Date"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        value={contact.mobile}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Mobile Number"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="address"
                        value={contact.address}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        required
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-success"
                        value="Create"
                        required
                      />
                      <Link
                        to={"../contacts/list"}
                        className="btn btn-dark ms-2"
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AddContact;
