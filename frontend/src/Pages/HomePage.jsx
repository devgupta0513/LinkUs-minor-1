import React, { useEffect } from 'react'
import {Box, Container, Image, Img, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import SignIn from '../components/authentication/SignIn';
import SignUp from '../components/authentication/SignUp';
import Cookies from "js-cookie";

import { useNavigate } from 'react-router';
const title = process.env.REACT_APP_TILE;
const HomePage = () => {

  const navigate = useNavigate();
  useEffect(() => {

          // const user = JSON.parse(sessionStorage.getItem("User"))
           const user = Cookies.get("token");
          console.log(user)
          if (user) {
              navigate("/chat")
          }
      
  }, [navigate])



  return (

    
      
      <Container 
      maxW="xl"
       centerContent minHeight="100vh" 
       display="flex" 
       flexDirection="column" 
       justifyContent="center"
       >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          
          p={3}
          bg={"white"}
          w="100%"
           mb="15px"
          // m="10px 0 15px 0 "
          borderRadius="lg"
          borderWidth="1px"
        >
        
          <Text fontSize="5xl" fontFamily="Work sans" >
           {process.env.REACT_APP_TILE}    
            
          </Text>
          
        </Box>
        <Box
        bg="white" 
        w="100%"
         p={4} borderRadius="lg" color="black" borderWidth="1px"
         overflowY="auto"
          maxHeight="80vh"
        >
          <Tabs variant='soft-rounded' >
  <TabList mb="0.5em">
    <Tab width="50%">SIGN IN</Tab>
    <Tab width="50%">SIGN UP</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <SignIn/>
    </TabPanel>
    <TabPanel>
    <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>

        </Box>
        
      </Container>

  
  )
}

export default HomePage