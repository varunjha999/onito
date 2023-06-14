import {
    Box,
    Button,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
 
  
  const Navbar = () => {
    
    return (
      <div style={{width:"100%"}}>
      <Box
        
        bg={useColorModeValue("aqua.100", "blue.900")}
        h="80px"
        // w="100%"
        style={{
          width:"100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
         
        }}
        p="10px"
      >
        <Box>
          <Text as="b" fontFamily={"cursive"} fontSize={"3xl"}>
           Form Validation
          </Text>
        </Box>
        <Box w="20%" style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/">
            <Button size="lg">Home</Button>
          </Link>
          <Link to="/user">
            <Button size="lg">Data</Button>
          </Link>
        </Box>
        
      </Box>
      </div>
    );
  };
  
  export default Navbar;
  