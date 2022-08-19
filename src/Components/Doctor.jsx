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
import EditDoctor from "./Edit";
import { Link } from "react-router-dom";

function Doctor() {
  const [hospital, setHospital] = useState([]);
  const [details, setDetails] = useState({});
  const [showData, setShowData] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const getHospitalData = async () => {
    const res = await axios.get("http://localhost:8080/data");
    setHospital(res.data);
    onOpen();
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
        method: "POST",
        url: "http://localhost:5001/docData",
        data: details,
      }).then(() => getDocData());
    };

    postDoctorData();
    onClose();
  };

  useEffect(() => {
    getDocData();
  }, []);

  const getDocData = async () => {
    const res = await axios.get("http://localhost:5001/docData");
    setShowData(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5001/docData/${id}`);
    getDocData();
  };

  return (
    <>
      <Button onClick={getHospitalData}>ADD DOCTOR</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Doctor Information</ModalHeader>

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
                value={details.salary}
                placeholder="Enter Salary"
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

      <table style={{ border: "1px solid black" }}>
        <thead style={{ border: "1px solid black" }}>
          <tr>
            <td style={{ border: "1px solid black" }}>id</td>
            <td style={{ border: "1px solid black" }}>Name</td>
            <td style={{ border: "1px solid black" }}>Hospital</td>
            <td style={{ border: "1px solid black" }}>Specialisations</td>
            <td style={{ border: "1px solid black" }}>Salary</td>
            <td style={{ border: "1px solid black" }}>Details</td>
            <td style={{ border: "1px solid black" }}>Delete</td>
            <td style={{ border: "1px solid black" }}>Edit</td>
          </tr>
        </thead>

        <tbody>
          {showData.map((e) => (
            <tr key={e.id}>
              <td style={{ border: "1px solid black" }}> {e.id} </td>
              <td style={{ border: "1px solid black" }}> {e.name} </td>
              <td style={{ border: "1px solid black" }}> {e.hospital} </td>
              <td style={{ border: "1px solid black" }}>
                {" "}
                {e.specialisation}{" "}
              </td>
              <td style={{ border: "1px solid black" }}> {e.salary} </td>
              <td style={{ border: "1px solid black" }}>
                {" "}
                <Button>
                  {" "}
                  <Link to={`/docData/${e.id}`}> View More Details </Link>{" "}
                </Button>{" "}
              </td>
              <td style={{ border: "1px solid black" }}>
                {" "}
                <Button onClick={() => handleDelete(e.id)}>
                  {" "}
                  Delete{" "}
                </Button>{" "}
              </td>
              <td style={{ border: "1px solid black" }}>
                {" "}
                <Button>
                  {" "}
                  <EditDoctor
                    id={e.id}
                    getDocData={getDocData}
                    getHospitalData={getHospitalData}
                  />{" "}
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Doctor;
