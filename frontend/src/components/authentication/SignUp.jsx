import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, InputRightElement, Show, VStack, useToast } from '@chakra-ui/react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()
    const [Show, setShow] = useState(false)
    
    const [loading, setLoading] = useState(false)
    const handleCLick = () => setShow(!Show)
    const toast = useToast()
    const navigate = useNavigate()


    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
     //   console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "LinkUs");
            data.append("cloud_name", "minor-linkus");
            fetch("https://api.cloudinary.com/v1_1/minor-linkus/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    //console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                   // console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };
    const submitHandler = async () => {

        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",

            })
            setLoading(false)
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: "password do not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",

            })
            return;
        }
        //console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config             );
            console.log(data);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chat')
            

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };



    return (
        <VStack spacing="5px" color='black' >SignUp
            <FormControl id='first-name' isRequired >
                <FormLabel> Name </FormLabel>
                <Input
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email1' isRequired >
                <FormLabel> Email </FormLabel>
                <Input
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password1' isRequired >
                <FormLabel> Password </FormLabel>
                <InputGroup>
                    <Input
                        type={Show ? "text" : "password"}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleCLick} >
                            {Show ? "hide" : "show"}

                        </Button>


                    </InputRightElement>

                </InputGroup>





            </FormControl>
            <FormControl id='confirmpassword' isRequired >
                <FormLabel> Confirm Password </FormLabel>
                <InputGroup>
                    <Input
                        type={Show ? "text" : "password"}
                        placeholder='Enter your Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleCLick} >
                            {Show ? "hide" : "show"}

                        </Button>


                    </InputRightElement>
                </InputGroup>
            </FormControl>







            <FormControl id='pic' >
                <FormLabel> Upload Your picture </FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>





            <Button
                colorScheme='blue'
                width="100%"
                style={{ margin: 15 }}
                onClick={submitHandler}
                isLoading={loading}    >

                Sign Up

            </Button>



        </VStack>
    )

}

export default SignUp