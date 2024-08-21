import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import { getCourseById } from "../services/course";

const Course = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [deliveries, setDeliveries] = useState([]);

    const { title, description, courseCode } = course;

    useEffect(() => {
        getCourseById(id).then(data => {
            setCourse(data);
            setDeliveries(data.deliveries);
        });
    }, [id]);

    return (
        <Container className="my-4">
            <Row>
                <Col md="8" className="mx-auto">
                    <Card>
                        <CardHeader>
                            <h3>Course Details</h3>
                        </CardHeader>
                        <CardBody>
                            <CardTitle tag="h4" className="mb-3">{title}</CardTitle>
                            <CardText className="mb-2"><strong>Course Code:</strong> {courseCode}</CardText>
                            <CardText className="mb-4">{description}</CardText>
                            <CardText className="mb-2"><strong>Total Deliveries:</strong> {deliveries.length}</CardText>
                            {deliveries.length > 0 ? (
                                <ListGroup>
                                    {deliveries.map(delivery => (
                                        <ListGroupItem key={delivery.id}>
                                            <strong>Year:</strong> {delivery.year}&nbsp;&nbsp;
                                            <strong>Semester:</strong> {delivery.semester}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            ) : (
                                <CardText>No deliveries available.</CardText>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Course;
