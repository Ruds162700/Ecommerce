import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

const Error = ({ message }) => {
    return (
        <Container className="mt-5">
            <Alert variant="danger">
                <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
                <p>{message}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Link to="/" className="btn btn-primary">
                        Go to Home
                    </Link>
                </div>
            </Alert>
        </Container>
    );
};

export default Error;
