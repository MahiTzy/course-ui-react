import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { getAllCourses } from "../services/course";
import { addCourseInstance } from "../services/course-instances";

const AddNewInstance = () => {
  const [instance, setInstance] = useState({
    year: '',
    semester: '',
    course: {
      id: ''
    }
  });

  const [validation, setValidation] = useState({
    year: true,
    semester: true,
    courseId: true
  });

  const [course, setCourse] = useState([]);

  useEffect(() => {
    // Fetch courses
    getAllCourses().then(data => {
      setCourse(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "courseId") {
      setInstance((prevInstance) => ({
        ...prevInstance,
        course: {
          id: value
        }
      }));
    } else {
      setInstance((prevInstance) => ({
        ...prevInstance,
        [name]: value
      }));
    }

    // Validate fields for non-empty values and numeric constraints
    if (name === "year" || name === "semester") {
      setValidation((prevValidation) => ({
        ...prevValidation,
        [name]: value.trim() !== '' && !isNaN(value) && Number(value) > 0
      }));
    } else {
      setValidation((prevValidation) => ({
        ...prevValidation,
        [name]: value.trim() !== ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid =
      instance.year.trim() !== "" &&
      !isNaN(instance.year) &&
      Number(instance.year) > 0 &&
      instance.semester.trim() !== "" &&
      !isNaN(instance.semester) &&
      Number(instance.semester) > 0 &&
      instance.course.id !== "";

    if (!isValid) {
      setValidation({
        year: instance.year.trim() !== '' && !isNaN(instance.year) && Number(instance.year) > 0,
        semester: instance.semester.trim() !== '' && !isNaN(instance.semester) && Number(instance.semester) > 0,
        courseId: instance.course.id.trim() !== ''
      });
      toast.error('Please fill all fields correctly');
      return;
    }

    addCourseInstance(instance).then(data => {
      console.log(data);
      toast.success('Course instance added successfully');
      setInstance({
        year: '',
        semester: '',
        course: {
          id: ''
        }
      });
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h3>Add New Course Instance</h3>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="year">Year</Label>
                  <Input
                    onChange={handleChange}
                    value={instance.year}
                    type="text"
                    name="year"
                    id="year"
                    placeholder="Enter Year"
                    invalid={!validation.year}
                  />
                  <FormFeedback>Valid year required!</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="semester">Semester</Label>
                  <Input
                    onChange={handleChange}
                    value={instance.semester}
                    type="text"
                    name="semester"
                    id="semester"
                    placeholder="Enter Semester"
                    invalid={!validation.semester}
                  />
                  <FormFeedback>Valid semester required!</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="courseSelect">Course Name</Label>
                  <Input
                    type="select"
                    name="courseId"
                    id="courseSelect"
                    onChange={handleChange}
                    value={instance.course.id}
                    invalid={!validation.courseId}
                  >
                    <option value="">Select Course</option>
                    {course.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </Input>
                  <FormFeedback>Select a course!</FormFeedback>
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

export default AddNewInstance;
