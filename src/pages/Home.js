import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import Hasil from "../components/Hasil";
import ListCategories from "../components/ListCategories";
import Menus from "../components/Menus";

import { API_URL } from "../utils/Constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListKeranjang();
  }

  //componentDidUpdate(prevState) {
  //  if (this.state.keranjangs !== prevState.keranjangs) {
  //    axios
  //      .get(API_URL + "keranjangs?")
  //      .then((res) => {
  //      console.log("Response : ", res);
  //        const keranjangs = res.data;
  //        this.setState({ keranjangs });
  //      })
  //      .catch((error) => {
  //        console.log(error);
  //      });
  //  }
  //}

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs?")
      .then((res) => {
        console.log("Response : ", res);
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        console.log("Response : ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses",
                text: keranjang.product.nama + " Sukses Masuk Keranjang",
                icon: "success",
                button: "Oke",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          //jika berhasil
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses",
                text: keranjang.product.nama + " Sukses Masuk Keranjang",
                icon: "success",
                button: "oke",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Col>
                <h5>
                  <b>Daftar Produk</b>
                </h5>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil
                keranjangs={keranjangs}
                getListKeranjang={this.getListKeranjang}
              />
            </Row>
          </Container>
        </div>
    );
  }
}
