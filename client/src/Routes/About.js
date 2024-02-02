
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
const About = () => {
    return (
        <>
            <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" >Fit-o-Fine</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/profile">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            {/* <div className="xyz" align="center">
            <input className="form-control mr-sm-2" type="search" placeholder="Enter test" aria-label="Search"/>
          </div>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
          
        </Container>
      </Navbar>
                <div className="p-5 mb-4 bg-light rounded-3" >
                    <div >
                        <h1 className="display-5 fw-bold">Fit-o-Fine</h1>
                        <p className="col-md-8 fs-4 py-5"> The project is about developing Real-time Access and Storage of Medical Test Reports of Patients for Any Period of Time using blockchain technology.
                         Our blockchain system is used to preserve and exchange patient data through hospitals, diagnostic laboratories, pharmacy firms, and physicians. 
                         It is helpful to medical institutions to gain insight and enhance the analysis of medical records. There are lots of issues if we use relational database except of blockchain network
                        like security,real time access of data for any period of time etc. But when we use block chain, we successfully integrated the features and overcame those issues that were there if done with traditional databases.
                        Implementation of the application using block chain is also provided.</p>
                    </div>
                </div>
                <center>
                <footer className="pt-3 mt-4 text-muted border-top">
                    © 2023
                </footer>
                </center>
                </div>
            
        </>
    );
};

export default About;