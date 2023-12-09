import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import fitnesslogo from "../../../../src/fitness-logo.jpg";

let EditContact = () => {
  let { contactId } = useParams();
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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);

        if (isMounted) {
          setState({
            ...state,
            loading: false,
            contact: response.data,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            ...state,
            loading: false,
            errorMessage: error.message,
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let { loading, contact, errorMessage } = state;

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
        alert("Appointment updated successfully.");
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };
  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="edit-contact">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="text-center">
                    <img
                      src={fitnesslogo}
                      className="App-logo p-2"
                      alt="logo"
                    />
                  </div>
                  <h2 className="subtitle text-center p-4 text-primary">
                    Edit Apointments
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
                        className="btn btn-primary"
                        value="Update"
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

export default EditContact;
