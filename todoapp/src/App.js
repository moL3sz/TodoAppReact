
import Todo from "./todo"
import React from "react"
import "./App.css"



class TodoList extends React.Component{
  constructor(props){
    super(props)
    this.state = {todos:[]}
    this.addTodo = this.addTodo.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.updateTodo = this.updateTodo.bind(this),
    this.lastTodoId = 0;
  }
  componentDidMount(){
    fetch("http://localhost:4000/todos")
    .then((res) =>{
      return res.json()
    }).then(res=>{
      const todos=res.todos;
      //make a Todo objects from the JSON data
      //then set the state with the correct data,
      //use the setState function for this purpose
      const newTodos = todos.map((todo) =>{
        this.lastTodoId++;
        console.log(this.lastTodoId)
        return <Todo name={todo.name} id={todo.id} time={todo.time} key={todo.id} checked={todo.checked} removeRow={this.removeRow} updateRow={this.updateTodo}/>
      })
      this.setState({
        todos:newTodos
      })
    }).catch(err=>{
      //make a an error label for the html view
    })
  }
  fetchTodo(name,time){
    //add todo to db
    fetch("http://localhost:4000/todos",{
      method:"POST",
      body:JSON.stringify({
        todoName:name,
        todoTime:time
      })
    }).then(res=>{
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })

    this.state.todos.push(<Todo name={name} time={time} id={this.lastTodoId++} removeRow={this.removeRow} key={this.lastTodoId}/>)
    return this.state.todos;
  }
  removeRow(id){

    //send a req to the backend to remove the correct row
    for(var i = 0; i < this.state.todos.length; ++i){
      if (this.state.todos[i].props.id === id){
        
        this.state.todos.splice(i,1);
        fetch("http://localhost:4000/todos",{
          method:"DELETE",
          body:JSON.stringify({
            id:id,
          })
        })
        .then(res =>{
          console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
        
        //here the code goes





        break
      }
    }
    const newTodos = this.state.todos;
    this.setState({
      todos:newTodos
    });
    this.lastTodoId--;
  }

  addTodo(){
    const todoName = document.getElementById("todoName").value;
    const todoTime = document.getElementById("todoTime").value;
    //before we set the next state send a post request to the server to add the the todo into the db


    this.setState({
      todos: this.fetchTodo(todoName,todoTime)
    })
  }

  updateTodo(id){
    //just send req to the server
    //the front-end structrue automatically changes
    fetch("http://localhost:4000",{
      method:"PUT",
      body:JSON.stringify({
        id:id
      })
    })
    .then(response =>{
    })
    .catch(err=>{
      
    })


  }
  render(){
    return (
        <table className="todoList">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map(todo =>(todo))}
          </tbody>
          <tfoot>
            <tr className="spacer"></tr>
            <tr>
              <td colSpan="3">Add Todo</td>
              </tr>
            <tr>
              <td><input type="text" id="todoName"/></td>
              <td><input type="text" id="todoTime"/></td>
              <td><input type="button" value="Add" className="addTodo" onClick={() => {this.addTodo()}}/></td>
            </tr>
          </tfoot>
        </table>


    )
  }
}
export default TodoList;
