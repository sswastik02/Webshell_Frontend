import React from 'react';
class PrevCommands extends React.Component {
    state = {
        history:[],
        number:0
    }
    componentDidMount(){
        this.setState({
            history:this.props.history
        })
    }
    static getDerivedStateFromProps(props, state) {
        if ((props.history !== state.history) || (props.number !== state.number)) {
          return {
            history:props.history,
            number:props.number
          };
        }
    }
    render() { 
        let history = this.state.history.slice(Math.max(this.state.history.length - this.state.number, 0))
        return <div className="prevcommands">
        {history.map(({ command, response }) => (
           <div className="shellPrompt">
             <span className="dollar">$</span>
            {command} <br/>
            {response} <br/><br/>
          </div>
        ))}
      </div>;
    }
}
 
export default PrevCommands;