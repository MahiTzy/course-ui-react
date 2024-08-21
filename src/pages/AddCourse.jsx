import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { addCourse } from "../services/course";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    courseCode: '',
    description: ''
  });

  const [validation, setValidation] = useState({
    title: true,
    courseCode: true,
    description: true
  });

  const resetCourse = () => {
    setCourse({
      title: '',
      courseCode: '',
      description: ''
    });
    setValidation({
      title: true,
      courseCode: true,
      description: true
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCourse({
      ...course,
      [name]: value
    });

    setValidation({
      ...validation,
      [name]: value.trim() !== ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = Object.keys(course).every(key => course[key].trim() !== '');

    if (!isValid) {
      setValidation({
        title: course.title.trim() !== '',
        courseCode: course.courseCode.trim() !== '',
        description: course.description.trim() !== ''
      });
      toast.error('Please fill all fields');
      return;
    }

    addCourse(course).then(data => {
      console.log(data);
      toast.success('Course added successfully');
      resetCourse();
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="mb-0">Add Course</h2>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    onChange={handleChange}
                    value={course.title}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter title"
                    invalid={!validation.title}
                  />
                  <FormFeedback>Field required!</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="courseCode">Course Code</Label>
                  <Input
                    onChange={handleChange}
                    value={course.courseCode}
                    type="text"
                    name="courseCode"
                    id="courseCode"
                    placeholder="Enter course code"
                    invalid={!validation.courseCode}
                  />
                  <FormFeedback>Field required!</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    onChange={handleChange}
                    value={course.description}
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Enter description"
                    invalid={!validation.description}
                  />
                  <FormFeedback>Field required!</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddCourse;
