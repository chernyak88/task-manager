import React, { Component } from 'react'
import './DeleteTask.css'
import { Modal } from 'react-bootstrap';

class AddTask extends Component {
  constructor(){
    super()
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete(){
    fetch('https://test.megapolis-it.ru/api/list/' + this.props.item.id, {
      method: 'DELETE',
    })
    .then(res => res.json())

    this.handleClose()
  }

  render() {
    return (
      <div className="row">
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>Краткое описание</Modal.Title>
              <button type="button" className="Task-button close" onClick = {this.handleClose}></button>
            </Modal.Header>
            <Modal.Body>
              <form>
                  <div className="form-group">
                      <input type="text" className="form-control disabled" value={this.props.item.title} readOnly></input>
                  </div>
                  <button type="button" onClick={this.handleDelete} className="btn btn-success btn-delete">Удалить</button>
              </form>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default AddTask;