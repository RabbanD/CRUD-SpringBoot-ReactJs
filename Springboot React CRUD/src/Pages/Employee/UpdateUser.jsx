import "./UpdateUser.css";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from "react-router-dom";


const UpdateUser = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        department:""
    })

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }

    useEffect(()=>{
        const fetchEmployee = async ()=>{
            try {
                const response = await fetch(`https://spring-backend-production-dd4b.up.railway.app/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching user: ",error.message);
            }
        }
        fetchEmployee()
    },[id])

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await fetch(`https://spring-backend-production-dd4b.up.railway.app/api/employee/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("USer Updated: ",data)

            navigate("/")

        } catch (error) {
            console.error("Error Updating user: ",error.message);
        }
    }

  return (
    <>
    <div className='center-form'>
        <h1>Edit Employee</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formBasicName'>
                <Form.Control type='text' 
                name='name' 
                placeholder='Enter Name'
                value={formData.name}
                onChange={handleInputChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='formBasicName'>
                <Form.Control type='text' 
                name='email' 
                placeholder='Enter Email'
                value={formData.email}
                onChange={handleInputChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='formBasicName'>
                <Form.Control type='text' 
                name='phone' 
                placeholder='Enter Phone'
                value={formData.phone}
                onChange={handleInputChange}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='formBasicName'>
                <Form.Control type='text' 
                name='department' 
                placeholder='Enter Department'
                value={formData.department}
                onChange={handleInputChange}>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type='submit' className='w-100'>
                Edit Employee
            </Button>
        </Form>
    </div>
</>
  )
}

export default UpdateUser