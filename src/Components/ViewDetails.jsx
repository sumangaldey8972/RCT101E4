import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Heading,
    Button,
    
} from '@chakra-ui/react'

import {useParams, Link} from "react-router-dom"
import axios from 'axios'

function ViewDetails() {

    const [user, setUser]  = useState({})

    const {id} = useParams()

    useEffect(()=>{
        getData();
    })

    const getData=async()=>{
        const res = await axios.get(`http://localhost:5001/docData/${id}`);
        setUser(res.data)
    }

    return (
        <TableContainer>
                <Heading>Doctor Details</Heading>

                <Button> <Link to="/" > Back TO Home Page</Link></Button>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Hospital</Th>
                        <Th>Specialisation</Th>
                        <Th>Salary</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td> {user.name} </Td>
                        <Td> {user.hospital} </Td>
                        <Td> {user.specialisation} </Td>
                        <Td> {user.salary} </Td>
                    </Tr>
                </Tbody>
                
            </Table>
        </TableContainer>
    )
}

export default ViewDetails