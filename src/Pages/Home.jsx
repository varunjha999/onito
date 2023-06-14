import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const Home = () => {
  const schema = yup
    .object().shape({
      Name: yup.string().required("Name is required"),
      Age: yup.string()
      .required('Age is required'),
      Gender: yup.string().required("Gender is required"),
      EmergrncyNo:yup
      .string()
      .matches(/^[6-9]\d{9}$/, 'Must be a valid Indian mobile number'),
      Number:yup
      .string()
      .matches(/^[6-9]\d{9}$/, 'Must be a valid Indian mobile number'),
    //
    //
    })
    .required();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit =async(data) => {
    console.log("data1",data);
    try {
      await axios.post('http://localhost:8080/Registration/user', data)
      alert('Form submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Please check your email should be unique');
    }
    
    

  };
  return (
    <Box bg="#838bcc" w="100%" h="900px">
      <br />
      <Box
        //bg="#fffffd"
        bg={useColorModeValue("white", "gray.900")}
        w="95%"
        h="700px"
        m="auto"
        borderRadius={"10px"}
        p="10px"
      >
        <Text fontSize={"3xl"}>Registration</Text>
        <Text fontSize={"2xl"} as="u">
          Personal Details
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={3} spacing={3}>
            <FormControl >
              <Flex gap="5px">
                <FormLabel>Name<span style={{color:"red"}}>*</span> </FormLabel>
                <Input
                placeholder="Enter Name"
                type="text"
                {...register("Name")}
              />
              </Flex>
             
              {errors.Name && (
                 <span style={{ color: "red" }}>{errors.Name?.message}</span>
                // console.log(errors.Name?.message)
              )}
            </FormControl>

            <FormControl>
              <Flex gap="5px">
                <FormLabel>Date of birth or Age<span style={{color:"red"}}>*</span></FormLabel>
                <Input
                  placeholder="DD/MM/YYYY or Age in Year"
                  type="number"
                  {...register("Age")}
                />
              </Flex>
              {errors.Age && (
                 <span style={{ color: "red" }}>{errors.Age?.message}</span>
              
              )}
            </FormControl>
            <FormControl>
              <Flex gap="5px">
                <FormLabel>Sex<span style={{color:"red"}}>*</span></FormLabel>
                <Select placeholder="Enter Sex" {...register("Gender")}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </Flex>
              {errors.Gender && (
                <span style={{ color: "red" }}>{errors.Gender?.message}</span>
              )}
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={3}>
            <FormControl>
              <Flex gap="5px">
                <FormLabel>Mobile</FormLabel>
                <Input
                  placeholder="Enter Mobile"
                  {...register("Number")}
                />
              </Flex>
              {errors.Number && (
                 <span style={{ color: "red" }}>{errors.Number?.message}</span>
              
              )}
            </FormControl>
            <FormControl>
              <Flex gap="5px">
                <FormLabel>Govt ID</FormLabel>
                <Select placeholder="ID Type" {...register("Govt_ID_Type")}>
                  <option value="aadhar,">Aadhar</option>
                  <option value="pan">PAN</option>
               
                </Select>
                <Input
                  placeholder="Enter Govt ID"
                  {...register("Govt_ID_Number")}
                />

              </Flex>
              {errors.Govt_ID_Type && (
                <span style={{ color: "red" }}>{errors.Govt_ID_Type?.message}</span>
              )}
            </FormControl>
          </SimpleGrid>
          {/* ---------------contect details----------------------- */}
          <Text fontSize={"2xl"} as="u">
            Contect Details
          </Text>
          <SimpleGrid columns={3} spacing={3}>
            <FormControl>
              <Flex gap="5px">
                <FormLabel>Guardian Details</FormLabel>
                <Select
                  placeholder="Enter Label"
                  {...register("GuardianDetails")}
                >
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="other">Other</option>
                </Select>
                <Input
                  placeholder="Enter Gardian Name"
                  {...register("GuardianName")}
                />
              </Flex>
            </FormControl>

            <FormControl>
              <Flex gap="5px">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Enter Email"
                  type="email"
                  {...register("Email")}
                />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex>
                <FormLabel>Emergency Number</FormLabel>
                <Input
                  placeholder="Enter Emergrncy No"
                  typr="number"
                  {...register("EmergrncyNo")}
                />
              </Flex>
              {errors.EmergrncyNo && (
                 <span style={{ color: "red" }}>{errors.EmergrncyNo?.message}</span>
              
              )}
            </FormControl>
          </SimpleGrid>

          {/* ------------------Address details--------------------------- */}
          <Text fontSize={"2xl"} as="u">
            Address Details
          </Text>
          <SimpleGrid columns={3} spacing={3}>
            <FormControl mb="10px">
              <Flex gap="5px">
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Enter Address"
                  type="text"
                  {...register("Address")}
                />
              </Flex>
            </FormControl>

            <FormControl mb="10px">
              <Flex gap="5px">
                <FormLabel>State</FormLabel>
                <Select placeholder="Enter State" {...register("State")}>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Bihar">Bihar</option>
                  <option value="UP">UP</option>
                </Select>
              </Flex>
            </FormControl>
            <FormControl>
              <Flex>
                <FormLabel>City</FormLabel>
                <Select
                  placeholder="Enter City/town/village"
                  {...register("City")}
                >
                  <option value="Ranchi">Ranchi</option>
                  <option value="Patna">Patna</option>
                  <option value="Kanpur">Kanpur</option>
                </Select>
              </Flex>
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={3}>
            <FormControl>
              <Flex gap="5px">
                <FormLabel>Country</FormLabel>
                <Input
                  placeholder="Enter Country Name"
                  type="text"
                  w="40%"
                  {...register("Country")}
                />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex gap="5px">
                <FormLabel>Pincode</FormLabel>
                <Input
                  placeholder="Enter Pincode"
                  w="40%"
                  type="number"
                  {...register("Pincode")}
                />
              </Flex>
            </FormControl>
          </SimpleGrid>
          {/* ----------------------Other Details---------------- */}
          <Text fontSize={"2xl"} as="u">
            Other Details
          </Text>
          <SimpleGrid columns={4} spacing={3}>
            <FormControl mb="10px">
              <Flex gap="5px">
                <FormLabel>Occupation</FormLabel>
                <Input
                  placeholder="Enter Occupation"
                  type="text"
                  {...register("Occupation")}
                />
              </Flex>
            </FormControl>

            <FormControl mb="10px">
              <Flex gap="5px">
                <FormLabel>Religion</FormLabel>
                <Select placeholder="Enter Religion" {...register("Religion")}>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="other">other</option>
                </Select>
              </Flex>
            </FormControl>
            <FormControl>
              <Flex>
                <FormLabel>Marital Status</FormLabel>
                <Select
                  placeholder="Enter Marital status"
                  {...register("MaritalStatus")}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </Flex>
            </FormControl>
            <FormControl>
              <Flex>
                <FormLabel>Blood Group</FormLabel>
                <Select placeholder="Group" {...register("BloodGroup")}>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Select>
              </Flex>
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={1} spacing={3}>
            <FormControl>
              <Flex gap="5px">
                <FormLabel>Nationality</FormLabel>
                <Input
                  placeholder="Enter Nationality "
                  type="text"
                  w="40%"
                  {...register("Nationality")}
                />
              </Flex>
            </FormControl>
          </SimpleGrid>
          <Box
            style={{
              width: "20%",
              margin: "auto",
              marginRight: "10px",
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button colorScheme="red" variant="outline">
              CANCEL
            </Button>
            <Button colorScheme="green" type="submit">
              SUBMIT
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Home;
