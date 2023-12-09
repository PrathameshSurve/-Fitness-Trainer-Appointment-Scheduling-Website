import "./App.css";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import ContactList from "./components/contacts/ContactList/ContactList";
import AddContact from "./components/contacts/AddContact/AddContact";
import ViewContact from "./components/contacts/ViewContact/ViewContact";
import EditContact from "./components/contacts/EditContact/EditContact";

let App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<ContactList />} />
        <Route path={"contacts/list"} element={<ContactList />} />
        <Route path={"contacts/add"} element={<AddContact />} />
        <Route path={"contacts/view/:contactId"} element={<ViewContact />} />
        <Route path={"contacts/edit/:contactId"} element={<EditContact />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
