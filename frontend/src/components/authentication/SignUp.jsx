import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, InputRightElement, Show, VStack, useToast } from '@chakra-ui/react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";



const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [otpe, setOtpe] = useState("");
    const [OtpBackend, setOtpBackend] = useState("");
    const [ShowVerifyOtp, setShowVerifyOtp] = useState(false);
    const [ShowGetOtp, setShowGetOtp] = useState(true);
    const [IsVerify, setIsVerify] = useState(false);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const endpoint = process.env.REACT_APP_BASE_URL;
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const navigate = useNavigate();
    useEffect(() => {
        let timer;
        if (!ShowGetOtp) {
            timer = setTimeout(() => {
                setShowGetOtp(true); // Enable the "GET OTP" button after 2 minutes
            }, 120000); // 2 minutes in milliseconds
        }
        return () => clearTimeout(timer); // Clear the timer on component unmount
    }, [ShowGetOtp]);

    const otpHandle = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!email) {
            toast({
                title: "Please enter  the gmail",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (!emailRegex.test(email)) {
            toast({
                title: "Please enter a valid email address",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        setShowGetOtp(false); // Hide the button immediately after click
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${endpoint}/api/user/sendotp`,
                { email },
                config
            );
            setOtpBackend(data.otp);
            // console.log(data.otp);

            toast({
                title: "OTP SEND SUCCESSFULLY",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // setLoading(false);
        }
    };

    const otpSubmitHandle = async () => {
        // setLoading(true);
        // setShowGetOtp(true);
        if (!otpe) {
            toast({
                title: "Please fill  the otp",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }
        if (otpe.search(/[0-9]+/) === -1) {

            toast({
                title: "You have entered a characters instead of a valid OTP",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (otpe.length !== 6) {

            toast({
                title: "OTP MUST BE OF 6 DIGIT",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }


        try {
            if (otpe !== OtpBackend) {
                toast({
                    title: "OTP IS IN VALID",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                return;

            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };


            const { data } = await axios.post(
                `${endpoint}/api/user/verifyotp`,
                { email, otpe },
                config
            );
            

            toast({
                title: "OTP VERIFIED SUCCESSFULLY",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setIsVerify(true)
            setOtpe('');
        } catch (error) {
            // console.log("api error");
            toast({
                title: "Error Occurred!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // setLoading(false);
        }
    };

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
        if (!IsVerify) {
            toast({
                title: "Email is not verified",
                description: "You have to verify your gmail first",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
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
                `${endpoint}/api/user`,
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
            
            // sessionStorage.setItem("User", JSON.stringify(data.token));
            Cookies.set("token", JSON.stringify(data), {
                expires: 1, // 1 day expiry
                secure: true, // HTTPS only
                sameSite: "Strict", // Protect against CSRF
                // sameSite: "Lax", // Cross-origin compatibility
                path: "/"
            });
            // const tol =Cookies.get("token");
            // console.log(tol);
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
        <VStack spacing="5px" color='black' p={0} m={0} >
            <FormControl id='first-name' isRequired >
                <FormLabel> Name </FormLabel>
                <Input
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='email1' isRequired >
                <FormLabel> Email </FormLabel>
                <InputGroup>
                    <Input
                        placeholder="Enter your Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputRightElement width="5.6rem">
                        <Button
                            colorScheme="blue"
                            h="1.75rem"
                            size="sm"
                            onClick={otpHandle}
                            isDisabled={!ShowGetOtp} // Disable button based on ShowGetOtp state
                        >
                            GET OTP
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="otp1" isRequired>
                <FormLabel>OTP</FormLabel>
                <InputGroup>
                    <Input
                        placeholder="Enter your otp"
                        onChange={(e) => setOtpe(e.target.value)}
                        value={otpe}
                    />
                    {/* <InputRightElement width="6.3rem"> */}
                    <InputRightElement width={IsVerify ? "5.6rem" : "6.3rem"}>
                        {!ShowGetOtp && (
                            <Button
                                colorScheme="green"
                                marginRight="6px"
                                h="1.75rem"
                                size="sm"
                                onClick={otpSubmitHandle}
                                isDisabled={IsVerify}
                                display={ShowVerifyOtp ? 'none' : 'block'}
                            >
                                {IsVerify ? 'VERIFIED' : 'VERIFY OTP'}

                            </Button>
                        )}
                    </InputRightElement>
                </InputGroup>
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
                        <Button h="1.75rem" size="sm" onClick={handleClick} >
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
                        <Button h="1.75rem" size="sm" onClick={handleClick} >
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