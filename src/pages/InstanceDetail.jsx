import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import Swal from "sweetalert2";
import { deleteCourseInstance, getCourseInstanceById } from "../services/course-instances";

const InstanceDetail = () => {
  const { year, semester, id } = useParams();

  const navigate = useNavigate();

  const [instance, setInstance] = useState({
    id: '',
    year: '',
    semester: '',
    course: {
      id: '',
      title: '',
      courseCode: '',
      description: ''
    }
  });

  useEffect(() => {
    getCourseInstanceById(year, semester, id).then(data => {
      setInstance(data);
    }
    ), []
  })

  const handleDelete = (year, semester, id) => {
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
          deleteCourseInstance(year, semester, id).then(() => {
            Swal.fire(
              'Deleted!',
              'Your course has been deleted.',
              'success'
            );
            navigate("/dashboard/instances");
          });
        }
      });
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <h3>Instance Details</h3>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6}>
              <p><strong>ID:</strong> {instance.id}</p>
              <p><strong>Year:</strong> {instance.year}</p>
              <p><strong>Semester:</strong> {instance.semester}</p>
            </Col>
            <Col md={6}>
              <p><strong>Course ID:</strong> {instance.course.id}</p>
              <p><strong>Course Title:</strong> {instance.course.title}</p>
              <p><strong>Course Code:</strong> {instance.course.courseCode}</p>
              <p><strong>Description:</strong> {instance.course.description}</p>
            </Col>
          </Row>

          <Button onClick={handleDelete(year, semester, id)} color="danger" className="mt-3 ml-2">
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default InstanceDetail
