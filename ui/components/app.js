import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function TodoTitle(props){
  return(
    <div className="row title_container text-center">
      <h1 className="title">
        todos
      </h1>
      <div className="pending_items">
        <p> {props.count} stuff to complete </p>
      </div>
    </div>
  );
}

function TodoItem(props){
  return(
    <li className="todo_item">
      <input className="todo_checkbox" type="checkbox" onChange={props.changeStatus.bind(this, props.toDoId)}
        checked={props.isComplete}/>
      <label className={`todo_name ${props.isComplete}`}> {props.name} </label>
      <button className="delete" onClick={props.destroyItem.bind(this, props.toDoId)}> </button>
    </li>
  )
}

function TodoList(props){
  let filteredTodos = [];
  if(props.currentFilter == 'all'){
    filteredTodos = props.toDos;
  }
  else if(props.currentFilter == 'active'){
    filteredTodos = props.toDos.filter((record)=>(record.is_active))
  }
  else{
    filteredTodos = props.toDos.filter((record)=>(!record.is_active))
  }

  return(
    <div className="items_list">
      <ul className="todo_list">
        {
          filteredTodos.map((val, key) => (
            <TodoItem key={key} name={val.todo_name} toDoId={val.id}
              changeStatus={props.changeStatus} destroyItem={props.destroyItem} isComplete={!val.is_active}/>
          ))
        }
      </ul>
    </div>
  );
}

function Footer(props){
  return(
    <div className="filters_bottom">
      <div className="col-12">
        <div className="all_filter">
          <a href='javascript:void(0)' onClick={props.changeFilter.bind(this, 'all')}>All</a>
        </div>
        <div className="active_filter">
          <a href='javascript:void(0)' onClick={props.changeFilter.bind(this, 'active')}>Active</a>
        </div>
        <div className="completed_filter">
          <a href='javascript:void(0)' onClick={props.changeFilter.bind(this, 'completed')}>Completed</a>
        </div>
      </div>
    </div>
  );
}

function TodoBox(props){
  return(
    <div className="todo_box">
      <div className="new_item_input">
        <input id="new_item" className="form-control form-control-lg" value = {props.value} onChange = {props.handleChange.bind(this)} placeholder="What needs to be done?" onKeyPress={props.addTodo.bind(this)} autoFocus />
      </div>
      <TodoList {...props}/>
      <Footer changeFilter={props.changeFilter}/>
    </div>
  );
}


class ToDo extends React.Component{
  constructor(props){
    super(props);
    this.baseUrl = 'http://localhost:8000'
    this.state = {
      toDoInput: '',
      toDos: [],
      currentFilter: 'all',
      count : 0,
    }

    this.changeStatus = this.changeStatus.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.destroyItem = this.destroyItem.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  componentDidMount(){
    axios.get(`${this.baseUrl}/api/v1/todo`)
    .then((response) => {
      this.setState({toDos: response.data})
      this.getCount();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  saveTodo(todo){
    let todoData = {};
    todoData.todo_name = todo;
    let toDos = this.state.toDos;
    console.log(todoData);
    axios.post(`${this.baseUrl}/api/v1/todo/create/`,todoData)
    .then((response) => {
      this.setState({
          toDos : toDos.concat({
          id: response.data.id,
          todo_name: response.data.todo_name,
          is_active: 1
        }),
        toDoInput: ''
      });
      this.getCount();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  addTodo(e){
    if (e.key === 'Enter') {
      let input_val = this.state.toDoInput;
      let toDos = this.state.toDos;
      if(input_val) {
      this.saveTodo(input_val);
    }
  }
}
getCount(){
  let filteredTodos = this.state.toDos.filter((record)=>(record.is_active));
  this.setState({
    count : filteredTodos.length
  });
}

  changeFilter(filter){
    this.setState({
      currentFilter: filter
    });
  }

  handleChange(e){
    this.setState({
      toDoInput: e.target.value
    });
  }

  changeStatus(id, e){
    let toDos = this.state.toDos;
    let index = toDos.findIndex((record) => (
      record.id == id
    ));
    let status = !e.target.checked;
    toDos[index].is_active = status;
    axios.patch(`${this.baseUrl}/api/v1/todo/${id}`, {is_active: ''+status})
    .then(res => {
      console.log(res);
    })
    this.setState({
      toDos: toDos
    });
    this.getCount();
  }

  destroyItem(id,e){
    let toDos = this.state.toDos;
    let index = toDos.findIndex((record) => (
      record.id == id
    ));
    axios.delete(`${this.baseUrl}/api/v1/todo/${id}`)
    .then(res => {
      if(res.data.success){
        let filtered = toDos.slice();
        filtered.splice(index,id);
        this.setState({
          toDos: filtered
        });
      }
    })
  }

  render(){
    return (
    <div>
      <TodoTitle count = {this.state.count} />
      <TodoBox toDos={this.state.toDos} value={this.state.toDoInput} handleChange={this.handleChange} addTodo={this.addTodo} changeStatus={this.changeStatus}
        changeFilter={this.changeFilter} destroyItem={this.destroyItem} currentFilter={this.state.currentFilter}/>
    </div>
    );
  }
}

ReactDOM.render(
  <ToDo />,
  document.getElementById('root')
);
