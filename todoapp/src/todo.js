import React from 'react'

class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state = {name:props.name,time:props.time,id:props.id,checked:props.checked}
    }
    render(){
        return(
            <tr className="todoRow" id={"todoID"+this.state.id}>
                <td className="todoName">{this.state.name}</td>
                <td className="todoTime">{this.state.time}</td>
                <td className="todoDone">
                    <input type="checkbox" name="todoCheck" id={"check"+this.state.id} className="todoChecks" defaultChecked={this.state.checked}  
                    onClick={()=>this.props.updateRow(this.state.id)}
                    
                    />
                    <label htmlFor={"check"+this.state.id}></label>
                </td>
                <td className="removeRow" onClick={()=>(this.props.removeRow(this.state.id))}>
                    <span>✖</span>
                </td>
            </tr>
            )
    }


}

export default Todo;
