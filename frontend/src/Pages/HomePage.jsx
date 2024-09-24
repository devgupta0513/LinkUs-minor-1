import React, { useEffect } from 'react'
import {Box, Container, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import SignIn from '../components/authentication/SignIn';
import SignUp from '../components/authentication/SignUp'
import { useNavigate } from 'react-router';
const HomePage = () => {

  const navigate = useNavigate();
  useEffect(() => {

          const user = JSON.parse(localStorage.getItem("userInfo"))
          console.log(user)
          if (user) {
              navigate("/chat")
          }
      
  }, [navigate])



  return (

    
    
      <Container maxW="xl" centerContent >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          
          p={3}
          bg={"white"}
          w="100%"
          m="40px 0 15px 0 "
          borderRadius="lg"
          borderWidth="1px"
        >
        
          <Text fontSize="5xl" fontFamily="Work sans" >
            LinkUs    
            
          </Text>
          
        </Box>
        <Box
        bg="white" w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px"
        >
          <Tabs variant='soft-rounded' >
  <TabList mb="1em">
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