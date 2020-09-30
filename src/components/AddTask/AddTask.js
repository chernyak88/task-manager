import React, { Component } from 'react'
import './AddTask.css'
import { Modal } from 'react-bootstrap';

class AddTask extends Component {
  constructor(){
    super()
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.state = {
      show : false,
      title : '',
      error: false
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

  handleAdd(){
    this.setState({
      title : document.getElementById('inputTask').value
    })
    fetch("https://test.megapolis-it.ru/api/list", {
    method: "POST",
    body: JSON.stringify({
        title: document.getElementById('inputTask').value
      }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then( () => {
      if (!this.state.title) {
        this.setState({
          error : true
        })
      } else {
        this.setState({
          error : false
        })
        this.handleClose()
      }
    })
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
                  <div className="form-group no-margin">
                      <input type="text" className="form-control" id="inputTask"></input>
                  </div>
                  {this.state.error &&
                  <span className="error">Заголовок не может быть пустым</span>
                  }
                  <button type="button" onClick={this.handleAdd} className="btn btn-success btn-add">Создать</button>
              </form>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default AddTask;