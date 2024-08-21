import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { getCourseById } from "../services/course";

const Course = () => {
    const param = useParams();

    const { id } = param;

    const [course, setCourse] = useState({});

    const [deliveries, setDeliveries] = useState([]);

    const { title, description, courseCode } = course;

    useEffect(() => {
        getCourseById(id).then(data => {
            setCourse(data);
            setDeliveries(data.deliveries);
        }
        ), []
    })

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">{title}</CardTitle>

                    <CardText>Course Code: {courseCode}</CardText>
                    <CardText>{description}</CardText>
                    <CardText>Total Deliveries: {deliveries.length}</CardText>
                    <CardText>{deliveries.map(delivery => (
                        <div key={delivery.id}>
                            Year: {delivery.year}
                            &nbsp;Semester: {delivery.semester}
                        </div>
                    ))}</CardText>
                </CardBody>

            </Card>
        </div>
    )
}

export default Course
