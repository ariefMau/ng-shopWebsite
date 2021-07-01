import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faWineGlassAlt,
  faCookieBite,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-1" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faWineGlassAlt} className="mr-2" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCookieBite}  />;
    
  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        console.log("Response : ", res);
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={2} mt="2">
        <h5>
          <b>Daftar Kategori</b>
        </h5>
        <hr />
        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={categoriYangDipilih === category.nama && "category-aktif"}
                style={{cursor: 'pointer'}}
              >
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
