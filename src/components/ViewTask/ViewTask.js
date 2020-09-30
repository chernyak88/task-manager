import React, { Component } from 'react'
import './ViewTask.css'
import { Modal } from 'react-bootstrap';

class AddTask extends Component {
  constructor(){
    super()
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.state = {
      show : false
    }
  }

  handleClose(){
    this.setState({
      show : false
    })
  }

  handleShow(){
    this.setState({
      show : true
    })
  }

  render() {
    return (
      <div className="row">
          <Modal className="fullscreen" show={this.state.show} onHide={this.handleClose}>
            <h3 className="MainTitle">Задача №{this.props.item.num}</h3>
            <Modal.Header>
              <Modal.Title>Краткое описание</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                  <div className="form-group">
                      <div className="form-control disabled">{this.props.item.title}</div>
                  </div>
                  <button type="button" onClick={this.handleClose} className="btn btn-primary">Вернуться в список</button>
              </form>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default AddTask;