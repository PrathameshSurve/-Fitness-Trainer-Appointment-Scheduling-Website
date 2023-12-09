import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../../src/services/ContactService";
import Spinner from "../../Spinner/Spinner";
import "./ContactList.css";

let ContactList = () => {
  const [selectedContactId, setSelectedContactId] = useState(null);

  const openModal = (contactId) => {
    setSelectedContactId(contactId);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setSelectedContactId(null);
    document.body.classList.remove("modal-open");
  };

  let [query, setQuery] = useState({
    text: "",
  });

  let searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredContacts: theContacts,
    });
  };

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    try {
      async function fetchData() {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      }
      fetchData();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, []);

  let { loading, contacts, filteredContacts, errorMessage } = state;

  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        async function fetchData() {
          setState({ ...state, loading: true });
          let response = await ContactService.getAllContacts();
          setState({
            ...state,
            loading: false,
            contacts: response.data,
            filteredContacts: response.data,
          });
        }
        fetchData();
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
    closeModal();
  };

  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <h2 className="subtitle text-center p-4">Appointments List</h2>
                <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                  <i className="fa fa-plus-circle me-2"></i>
                  Add New Appointments
                </Link>
                <p className="fst-italic my-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores incidunt similique obcaecati officiis mollitia dolore
                  repellendus dolores culpa modi blanditiis?
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <form className="row">
                      <div className="col">
                        <div className="mb-2">
                          <input
                            name="text"
                            value={query.text}
                            onChange={searchContacts}
                            type="text"
                            className="form-control"
                            placeholder="Search Names"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-2">
                          <input
                            type="submit"
                            className="btn btn-outline-dark"
                            value="Refresh"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 &&
                  filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card m-4">
                          <div className="card-body">
                            <div className="row align-item-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src="https://w7.pngwing.com/pngs/852/102/png-transparent-dialer-contact-list-contact-manager-android-android-blue-simple-mobile-phones-thumbnail.png"
                                  alt="Contactimage"
                                  className=" contact-img"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:{" "}
                                    <span className="fw-bold">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Location:{" "}
                                    <span className="fw-bold">
                                      {contact.location}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Date:{" "}
                                    <span className="fw-bold">
                                      {contact.date}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`../contacts/view/${contact.id}`}
                                  className="btn btn-warning"
                                >
                                  <i className="fa fa-eye" />
                                </Link>

                                <Link
                                  to={`../contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>

                                <button
                                  className="btn btn-danger"
                                  onClick={() => openModal(contact.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>

                                {selectedContactId === contact.id && (
                                  <React.Fragment>
                                    <div className="overlay"></div>
                                    <dialog open className="modalOpen">
                                      Are you sure you want to delete this
                                      appointment?
                                      <br />
                                      <button
                                        className="btn btn-primary me-2"
                                        onClick={closeModal}
                                      >
                                        No
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => clickDelete(contact.id)}
                                      >
                                        Yes, Delete
                                      </button>
                                    </dialog>
                                  </React.Fragment>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ContactList;
