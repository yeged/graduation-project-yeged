import React, { useContext, useState } from "react";
import { uploadFileToStorage } from "../services/useFireStorage";
import {
  getId,
  addTicketToDatabase,
  checkFormInDatabase,
  getClosedFormDataFromDatabase,
  getOpenFormDataFromDatabase,
  responseToDatabase,
} from "../services/useFirestore";

export const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState([]); // User Form Data
  const [openFormsData, setOpenFormsData] = useState([]); // Open Forms
  const [closedFormsData, setClosedFormsData] = useState([]); // Closed Forms

  const sendTicket = async (
    firstName,
    lastName,
    age,
    tcNo,
    address,
    application,
    applicationNo,
    isOpen,
    file
  ) => {
    setIsLoading(true);
    await addTicketToDatabase(
      firstName,
      lastName,
      age,
      tcNo,
      address,
      application,
      applicationNo,
      isOpen,
      ""
    );
    // if user uploaded any file save to storage.
    if (file) {
      const formId = await getId(applicationNo);
      await uploadFileToStorage(formId, file);
    }

    setIsLoading(false);
  };

  // Get users form with valid application number.
  const getForm = async (applicationNo) => {
    setIsLoading(true);
    const existForm = await checkFormInDatabase(applicationNo);
    setFormData(existForm);
    setIsLoading(false);
  };

  // Get open and closed forms
  const getOpenAndClosedForms = async () => {
    setIsLoading(true);
    const openData = await getOpenFormDataFromDatabase();
    setOpenFormsData(openData);
    const closedData = await getClosedFormDataFromDatabase();
    setClosedFormsData(closedData);
    setIsLoading(false);
  };

  const sendResponse = async (id, response) => {
    setIsLoading(true);
    await responseToDatabase(id, response);
    setIsLoading(false);
  };

  const value = {
    isLoading,
    sendTicket,
    getForm,
    formData,
    getOpenAndClosedForms,
    openFormsData,
    closedFormsData,
    sendResponse,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);
export default FormProvider;
