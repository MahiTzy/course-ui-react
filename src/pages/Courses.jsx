import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap"
import Swal from "sweetalert2"
import { deleteCourse, getAllCourses } from "../services/course"

const Courses = () => {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    getAllCourses().then(data => {
      setCourses(data)
    }
    )
  }
    , [])

  const handleDelete = (id) => {
    return () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this course!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCourse(id).then(() => {
            setCourses(courses.filter(course => course.id !== id));
            Swal.fire(
              'Deleted!',
              'Your course has been deleted.',
              'success'
            );
          });
        }
      });
    }
  };

  return (
    <>
      {courses.length > 0 ? (
        <Row>
          {courses.map(course => (
            <Col key={course.id} sm="6">
              <Card>
                <CardHeader>
                  <h3>Course Id: {course.id}</h3>
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h5">{course.title}</CardTitle>
                  <CardText>{course.description}</CardText>
                  <Link color="primary" to={`/dashboard/course/${course.id}`} className="me-2 btn btn-primary">View</Link>
                  <Button color="danger" onClick={handleDelete(course.id)}>Delete</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <CardBody>
            <CardText>No courses available.</CardText>
          </CardBody>
        </Card>
      )}
    </>
  );
}


export default Courses
