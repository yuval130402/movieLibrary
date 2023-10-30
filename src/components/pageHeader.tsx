import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface PageHeaderProps {
  title: string,
  children?: React.ReactNode
}

export const PageHeader = ({ title, children }: PageHeaderProps) => {
  // Get title and children, Title to put on top of page -> children to add in title.
  return (
    <>
      <Container fluid>
        <Row>
          <Col style={{ display: "flex" }}>
            <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
              <h1 style={{ color: "black" }}>{title}</h1>
            </div>
          <div style={{top: 0, right: 0}}>{children}</div>
          </Col>
        </Row>
      </Container>
      <hr></hr>
    </>
  );
};
