import React, { Component } from 'react'
import './ListTask.css'
import AddTask from '../AddTask/AddTask'
import DeleteTask from '../DeleteTask/DeleteTask'
import EditTask from '../EditTask/EditTask'
import ViewTask from '../ViewTask/ViewTask'

class ListTask extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      currentItem: {
        id: null,
        title: null,
        num: null
      }
    };
    this.addChild = React.createRef();
    this.deleteChild = React.createRef();
    this.editChild = React.createRef();
    this.viewChild = React.createRef();
    this.addShow = this.addShow.bind(this);
    this.deleteShow = this.deleteShow.bind(this);
    this.editShow = this.editShow.bind(this);
    this.viewShow = this.viewShow.bind(this);
  }

  getTasks() {
    fetch("https://test.megapolis-it.ru/api/list")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  componentDidMount() {
    this.getTasks()
  }

  componentDidUpdate() {
    this.getTasks()
  }

  addShow(){
    this.addChild.current.handleShow();
  }

  deleteShow(e){
    this.deleteChild.current.handleShow();
    this.setState(Object.assign(
      this.state.currentItem,
      {id: e.currentTarget.dataset.id, title: e.currentTarget.dataset.title}
      )
    );
  }

  editShow(e){
    this.editChild.current.handleShow();
    this.setState(Object.assign(
      this.state.currentItem,
      {id: e.currentTarget.dataset.id, title: e.currentTarget.dataset.title}
      )
    );
  }

  viewShow(e){
    let index = this.state.items.findIndex(el => el.id === +e.currentTarget.dataset.id);
    let num = index + 1;
    this.setState(Object.assign(
      this.state.currentItem,
      {id: e.currentTarget.dataset.id, title: e.currentTarget.dataset.title, num: num}
      )
    );
    this.viewChild.current.handleShow();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    let count = 1;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="row">
          <div className="col-sm-8">
            <h3 className="MainTitle">Список задач</h3>
          </div>
          <div className="col-sm-4">
            <button type="button" className="btn btn-success AddTask-button" onClick = {this.addShow}>Добавить</button>
          </div>
          <div className="col-sm-12 ListTask">
            <ul className="list-group">
              {items.map(item => (
                <li key={item.id} className="list-group-item">
                  <div data-id={item.id} data-title={item.title} onClick = {this.viewShow}>Задача №{count++}</div>
                  <div data-id={item.id} data-title={item.title} onClick = {this.viewShow}>{item.title}</div>
                  <div>
                    <button type="button" data-id={item.id} data-title={item.title} className="Task-button DeleteTask-button" onClick = {this.deleteShow}></button>
                    <button type="button" data-id={item.id} data-title={item.title} className="Task-button EditTask-button" onClick = {this.editShow}></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <AddTask ref = {this.addChild}/>
          <DeleteTask ref = {this.deleteChild} item = {this.state.currentItem}/>
          <EditTask ref = {this.editChild} item = {this.state.currentItem}/>
          <ViewTask ref = {this.viewChild} item = {this.state.currentItem}/>
        </div>
      );
    }
  }
}

export default ListTask;