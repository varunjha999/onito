import { useEffect, useRef, useState } from 'react';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';
import axios from 'axios';
import {  Button } from '@chakra-ui/react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';





const Data = () => {
  const tableRef = useRef(null);
  const [data,setData]=useState([]);
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(limit);
  const [searchQuery, setSearchQuery] = useState("");
  
 


  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setStart(0);
    setEnd(parseInt(e.target.value));
  };



  // function
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/Registration/getUser?q=${searchQuery}`
        );
        setData(response.data);
      } catch (error) {
        console.log("getting error ", error);
      }
    };
    getData();
  }, [searchQuery,limit]);


  useEffect(() => {
   
    const eventFired = (type) => {
      const n = document.querySelector('#demo_info');
      n.innerHTML += '<div>'+type+' event - '+new Date().getTime()+'</div>';
      n.scrollTop = n.scrollHeight;     
    }

    const table = new DataTable(tableRef.current);

    document
      .querySelector('#example tbody')
      .addEventListener('click', function (e) {
        const data = table.row( e.target ).data();
        eventFired( 'You clicked on '+data[0]+'\'s row' );
      });


    return () => {
      table.destroy(true);
    };
  }, []);

 
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePrint = () => {
    const table = document.getElementById('example');
    const newWin = window.open('');
    newWin.document.write(table.outerHTML);
    newWin.print();
    newWin.close();
  };

  const exportToExcel = () => {
    const sheetName = 'Data'; // name of the sheet in the Excel file
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
  
    const dataInJSON = data.map((el) => ({
      Name: el.Name,
      Age: el.Age,
      Gender: el.Gender,
      Number: el.Number,
      Address: el.Address,
      Govt_ID_Type: el.Govt_ID_Type,
      Govt_ID_Number: el.Govt_ID_Number,
      GuardianDetails: el.GuardianDetails,
      GuardianName: el.GuardianName,
      Nationality: el.Nationality,
    }));
  
    // Convert the JSON data to an Excel workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataInJSON);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
    // Create and download the Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: fileType });
    const fileName = `table_data${fileExtension}`;
    saveAs(blob, fileName);
  };
  
  

console.log("data",data)
console.log("limit",limit)

//let datalimit=
  return (
    <>
      <div id="demo_info" className="box"></div>
      <div className="dataTables_wrapper">
        <div className="dataTables_length" id="example_length" style={{marginTop:"20px"}}>
          <label>
            Show 
            <select name="example_length" aria-controls="example" className="" onChange={handleLimitChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select> entries
          
          </label>{"  "}
       
          <Button onClick={handlePrint}>Print</Button>{"  "}
          <Button onClick={exportToExcel}>Excel</Button>

    
   
        </div>
        <div id="example_filter" className="dataTables_filter " style={{marginTop:"20px"}}>
          <label>
            Search:
            <input type="search" className="" placeholder="" aria-controls="example" onChange={handleSearchInputChange}  value={searchQuery} />
          </label>
        </div>
        <table id="example" className="display dataTable" style={{width: '98%',margin:"auto",borderCollapse:"collapse",border:"1px solid black",marginTop:"30px"}} aria-describedby="example_info">
          <thead>
            <tr>
              <th className="sorting sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: '133.406px'}}>Name</th>
              <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1"  aria-label="Position: activate to sort column ascending" style={{width: '221.578px'}}>Age/Sex</th>
              <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Office: activate to sort column ascending" style={{width: '98.75px'}}>Mobile</th>
              <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Age: activate to sort column ascending" style={{width: '40.0156px'}}>Address</th>
              <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Start date: activate to sort column ascending" style={{width: '87.1719px'}}>Govt ID</th>
              <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Salary: activate to sort column ascending" style={{width: '74.7812px'}}>Guardian Details</th>
              <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Salary: activate to sort column ascending" style={{width: '74.7812px'}}>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {/* Add your table data here */}
            {data?.slice(start,end).map((el,i)=>(
              <tr key={i}>
              <td className="sorting sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: '133.406px'}}>{el.Name}</td>
              <td className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Position: activate to sort column ascending" style={{width: '275.578px'}}>{el.Age}/{el.Gender}</td>
              <td className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Office: activate to sort column ascending" style={{width: '98.75px'}}>{el.Number}</td>
              <td className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Age: activate to sort column ascending" style={{width: '40.0156px'}}>{el.Address}</td>
              <td className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Start date: activate to sort column ascending" style={{width: '87.1719px'}}>{el.Govt_ID_Type}-{el.Govt_ID_Number}</td>
              <td className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Salary: activate to sort column ascending" style={{width: '74.7812px'}}>{el.GuardianDetails}-{el.GuardianName}</td>
              <td className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Salary: activate to sort column ascending" style={{width: '74.7812px'}}>{el.Nationality}</td>
            </tr>


            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Data;