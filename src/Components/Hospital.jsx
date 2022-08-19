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
} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";

function Hospital() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const getData = async () => {
    await axios.get("http://localhost:8080/data");
  };

  const handleOnSubmit = () => {
    const postData = async () => {
      await axios({
        method: "POST",
        url: "http://localhost:8080/data",
        data: {
          id: Date.now(),
          name: initialRef.current.value,
        },
      });
    };
    postData();
    onClose();
  };

  useEffect(()=>{
    getData();
  },[])

  return (
    <>
      <Button onClick={onOpen}>ADD HOSPITAL</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Hospital Information</ModalHeader>

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Hospital name</FormLabel>
              <Input ref={initialRef} placeholder="Enter Hospital Name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Hospital;
