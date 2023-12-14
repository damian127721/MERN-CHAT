import React, {useState} from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()

    const submitHandler = async () => {
        setLoading(true)
        if (!email || !password) {
            toast({
                title: "Please Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return
        }

        try {
            const config = {
                haders: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post("/api/user/login", {email, password}, config)
            toast({
                title: "Login Successful",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })

            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            navigate("/chats", { replace: true })
        } catch (error) {
            toast({
                title: "Error occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        }
    }

    const showHandler = () => setShow((prevShow) => !prevShow)

  return (
    <VStack spacing="5px">
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
                <Input 
                    value={email}
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input 
                    type={show ? "text" : "password"}
                    value={password}
                    placeholder='Enter Your Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                    <Button marginLeft={-10} h="1.75rem" size="sm" onClick={showHandler}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
        colorScheme="blue"
        w="100%"
        marginTop={15}
        onClick={submitHandler}
        isLoading={loading}
        >
            Login
        </Button>
        <Button
        colorScheme="red"
        w="100%"
        onClick={() => {
            setEmail("guest@example.com")
            setPassword("123456")
        }}
        >
            Guest credentials
        </Button>
    </VStack>
  )
}

export default Login