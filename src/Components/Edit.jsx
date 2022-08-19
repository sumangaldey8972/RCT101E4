import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function EditDoctor({ id, getDocData }) {
  const [hospital, setHospital] = useState([]);
  const [details, setDetails] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    const res = await axios.get("http://localhost:8080/data");
    setHospital(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // console.log(details)
    const postDoctorData = async () => {
      await axios({
        method: "PUT",
        url: `http://localhost:5001/docData/${id}`,
        data: details,
      });
    };

    postDoctorData();
    getData();
    getDocData();
    onClose();
  };

  const getDocDataById = async () => {
    const res = await axios.get(`http://localhost:5001/docData/${id}`);
    setDetails(res.data);
    getData();
    onOpen();
  };

  return (
    <>
      <Button onClick={getDocDataById}>Edit</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Doctor Information</ModalHeader>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Doctor name</FormLabel>
              <Input
                marginBottom={3}
                placeholder="Enter Doctor Name"
                value={details.name}
                onChange={handleChange}
                name="name"
              />

              <Select
                marginBottom={3}
                placeholder="Choose Hospital"
                onChange={handleChange}
                name="hospital"
              >
                {hospital.map((e) => (
                  <option value={e.name} key={e.id}>
                    {" "}
                    {e.name}{" "}
                  </option>
                ))}
              </Select>

              <Select
                marginBottom={3}
                placeholder="Choose Specialisation"
                onChange={handleChange}
                name="specialisation"
              >
                <option value="Nephrology">Nephrology</option>
                <option value="General">General</option>
                <option value="Radiologist">Radiologist</option>
              </Select>

              <Input
                marginBottom={3}
                placeholder="Enter Salary"
                value={details.salary}
                onChange={handleChange}
                name="salary"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditDoctor;
