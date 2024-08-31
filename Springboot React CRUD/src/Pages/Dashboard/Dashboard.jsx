import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchEmployees = async () => {
            try {
                const response = await fetch("https://spring-backend.railway.internal/api/employees");
                const data = await response.json();

                setEmployees(data);
            } catch (error) {
                console.log("Error fetching employees: ",error.message);
            }

        }
        
        fetchEmployees();
    },[])

    const handleDelete = async(employeeId) =>{
        try {
            const response = await fetch(`http://spring-backend.railway.internal/api/employee/${employeeId}`,{
                method: "DELETE",
            });

            if(response.ok){
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee)=> employee.id !== employeeId)
                )
            }
            console.log(`Employee with ID ${employeeId} deleted successfully`);
        } catch (error) {
            console.log("Error deleting employee",error.message);
        }
    }

    const handleUpdate = (employeeId) => {
        navigate(`/employee/${employeeId}`)
    }

  return (
    <>
        <Container className='mt-5'>
            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <Button vairant='outline-secondary' onClick={()=>handleUpdate(employee.id)}>Update</Button>{" "}
                                        <Button variant="outline-danger" onClick={()=>handleDelete(employee.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Dashboard