import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

let ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
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

  let { loading, contact, errorMessage } = state;

  return (
    <React.Fragment>
      <section className="view-contact-intro">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="text-warning my-2 fw-bold">View Appointment</h3>
              <p className="fst-italic">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestiae, id sed minus quod maxime porro. Dignissimos
                consequuntur alias omnis, earum, molestiae possimus delectus
                quaerat ut autem eveniet perferendis nihil. Repellat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      src="https://w7.pngwing.com/pngs/852/102/png-transparent-dialer-contact-list-contact-manager-android-android-blue-simple-mobile-phones-thumbnail.png"
                      alt="Contactimage"
                      className=" contact-img"
                    />
                  </div>

                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name: <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Location:{" "}
                        <span className="fw-bold">{contact.location}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Date: <span className="fw-bold">{contact.date}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile Number:{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Address:{" "}
                        <span className="fw-bold">{contact.address}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link
                      to={"../contacts/list"}
                      className="btn btn-warning my-2"
                    >
                      {" "}
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ViewContact;
