import { useState } from 'react';
import './PostUser.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

const PostUser = () => {

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

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        console.log(formData)

        try {
            const response = await fetch("https://mysql.railway.internal:3306",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Employee Created: ",data);
            navigate("/")
        } catch (error) {
            console.log("Error creating employee: ",error.message);
        }
    }

  return (
    <>
        <div className='center-form'>
            <h1>ADD NEW EMPLOYEE</h1>
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
                    Add Employee
                </Button>
            </Form>
        </div>
    </>
  )
}

export default PostUser