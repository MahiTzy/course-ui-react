import { Button, Container } from "reactstrap";

const Home = () => {
  return (
    <Container className="mt-5 text-center">
      <h1 className="display-4">Welcome to Your Dashboard</h1>
      <p className="lead">Manage your courses and course instances from this dashboard.</p>
      <Button color="primary">Get Started</Button>

    </Container>
  );
}

export default Home
