import React from 'react'
import { Button, Flex, Heading } from "@chakra-ui/react"
import Hospital from './Hospital'
import Doctor from './Doctor'
function Home() {
  return (
    <div>
      <Heading m="1rem" fontSize="26px" >Welcome To the Hospital Management System</Heading>
      <Flex gap="1rem" >
        <Hospital />
        <Doctor/>
      </Flex>
    </div>
  )
}

export default Home