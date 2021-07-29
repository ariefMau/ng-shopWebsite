import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Sukses extends Component {
  render() {
    return (
      <div classname="mt-4 text-center">
        <Image src="assets/images/Done.png" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant="secondary" as={Link} to="/">
          kembali
        </Button>
      </div>
    )
  }
}
