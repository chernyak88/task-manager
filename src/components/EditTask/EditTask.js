import React, { Component } from 'react'
import './EditTask.css'
import { Modal } from 'react-bootstrap';

class AddTask extends Component {
  constructor(){
    super()
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
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

  handleEdit(){
    fetch('https://test.megapolis-it.ru/api/list/' + this.props.item.id, {
      method: "POST",
      body: JSON.stringify({
          title: document.getElementById('editTask').value,
        }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())

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
                      <input type="text" className="form-control" id="editTask" defaultValue={this.props.item.title}></input>
                  </div>
                  <button type="button" onClick={this.handleEdit} className="btn btn-success">Изменить</button>
              </form>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default AddTask;