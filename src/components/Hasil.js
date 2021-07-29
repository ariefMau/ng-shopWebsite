import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/Utils";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h5>
          <b>Hasil</b>
        </h5>
        <hr />
        {keranjangs.length !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <h6>Rp. {numberWithCommas(menuKeranjang.product.harga)}</h6>
                  </Col>
                  <Col xs={2}>
                    <h4>
                      <Badge variant="success">{menuKeranjang.jumlah}</Badge>
                    </h4>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(menuKeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
