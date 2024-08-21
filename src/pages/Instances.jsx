import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { getCourseInstancesByYearAndSemester } from "../services/course-instances";

const Instances = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseDeliveries, setCourseDeliveries] = useState([]);

  const [validation, setValidation] = useState({
    year: true,
    semester: true
  });

  const handleFetch = () => {

    const isValid =
      year.trim() !== "" &&
      !isNaN(year) &&
      Number(year) > 0 &&
      semester.trim() !== "" &&
      !isNaN(semester) &&
      Number(semester) > 0;

    if (!isValid) {
      setValidation({
        year: year.trim() !== '' && !isNaN(year) && Number(year) > 0,
        semester: semester.trim() !== '' && !isNaN(semester) && Number(semester) > 0
      });
      toast.error("Please fill all fields with valid values");
      return;
    }
    if (year && semester) {
      getCourseInstancesByYearAndSemester(year, semester).then((data) => {
        setCourseDeliveries(data);
        if (data.length === 0) {
          toast.info("No course instances found");
        } else {
          toast.success("Course instances fetched successfully");
        }
        setYear("");
        setSemester("");
        setValidation({
          year: true,
          semester: true
        });
      }).catch((error) => {
        console.error("Failed to fetch course instances:", error);
        toast.error("Failed to fetch course instances");
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="mb-0">Fetch Course Deliveries</h2>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="year">Year</Label>
                  <Input
                    type="text"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter year"
                    invalid={!validation.year}
                  />
                  <FormFeedback>Invalid year</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="semester">Semester</Label>
                  <Input
                    type="text"
                    id="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Enter semester"
                    invalid={!validation.semester}
                  />
                  <FormFeedback>Invalid semester</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" onClick={handleFetch} className="mt-3">
              Fetch
            </Button>
          </Form>

          <Row className="mt-4">
            {courseDeliveries.length > 0 ? (
              courseDeliveries.map((cd) => (
                <Col md={4} key={cd.id} className="mb-4">
                  <Card>
                    <CardHeader>
                      <h5>Course Instance ID: {cd.id}</h5>
                    </CardHeader>
                    <CardBody>
                      <p><strong>Course ID:</strong> {cd.course.id}</p>
                      <p><strong>Year:</strong> {cd.year}</p>
                      <p><strong>Semester:</strong> {cd.semester}</p>
                      <Link to={`/dashboard/instance/${cd.year}/${cd.semester}/${cd.course.id}`} color="info" className="me-2 btn btn-info">
                        View Details
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              ))
            ) : (
              <Col md={12}>
                <Card>
                  <CardBody>
                    No course deliveries found for the specified year and semester.
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default Instances;
