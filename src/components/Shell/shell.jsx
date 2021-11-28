import React, { Component } from "react";
import axios from "axios";
import "./shell.css";
import PrevCommands from "./prevCommands";
class Shell extends Component {
  state = {
    promptHeight: "20px",
    cwd: `/${this.props.user}`,
    command: "",
    history: [
      {
        command: "pwd",
        response: `/${this.props.user}`,
      },
      {
        command: "whoami",
        response: `${this.props.user}`,
      },
    ],
    number: 0,
    commandIndex:-1
  };

  getKeyStroke = (event) => {
    var elem = document.getElementsByName("command")[0];
    if (event.key === "Enter") {
      if (this.state.command === "clear") {
        elem.value = '';
        event.preventDefault()
        this.updateHistory(this.state.history, 0, "",0);
      } else this.postCommand(this.state.command);
    }
    if(event.key === "ArrowUp")
    {
      if(this.state.commandIndex === this.state.history.length)
      return
      elem.value = this.state.history.at(this.state.commandIndex).command
      event.preventDefault()
      this.setState({
        command:this.state.history.at(this.state.commandIndex).command,
        commandIndex:this.state.commandIndex - 1
      })
    }
    if(event.key === "ArrowDown")
    {
      if(this.state.commandIndex === -1)
      {
        elem.value = ''
      event.preventDefault()
      this.setState({
        command:'',
        commandIndex:-1
      })
      }
      elem.value = this.state.history.at(this.state.commandIndex).command
      event.preventDefault()
      this.setState({
        command:this.state.history.at(this.state.commandIndex).command,
        commandIndex:this.state.commandIndex + 1
      })
    }
    
  };

  postCommand = (command) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/",
        { command: command },
        { headers: { Authorization: `Token ${this.props.token}` } }
      )
      .then((res) => {
        let hist = {
          command: `${res.data.command}`,
          response: `${res.data.response}`,
          cwd: `${res.data.cwd}`,
        };
        let initialHistory = this.state.history;
        console.log(hist);
        initialHistory = Array.from(initialHistory);
        initialHistory.push(hist);
        console.log(initialHistory.at(-1));
        var elem = document.getElementsByName("command")[0];
        elem.value = "";
        this.updateHistory(initialHistory, this.state.number + 1, "",0);
      })
      .catch((err) => {});
  };
  updateHistory = (historyData, numberOfHistory, command,commandIndex) => {
    this.setState({
      history: historyData,
      cwd: historyData.at(-1).cwd,
      number: numberOfHistory,
      command: command,
      commandIndex:commandIndex,
    });
  };

  autoGrowPrompt = () => {
    var elem = document.getElementsByName("command")[0];
    // console.log('hello')
    this.setState({
      promptHeight: `${elem.scrollHeight}px`,
      command: `${elem.value}`,
    });
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/", {
        headers: { Authorization: `Token ${this.props.token}` },
      })
      .then((res) => {
        let hist = [];
        hist = Array.from(
          res.data.map((x) => {
            return {
              command: x.command,
              response: x.response,
              cwd: x.cwd,
            };
          })
        );
        this.updateHistory(hist, this.state.number, this.state.command);
      })
      .catch((err) => {});
  }

  render() {
    return (
      <div className="WebShell">
        <PrevCommands history={this.state.history} number={this.state.number} />
        <div className="Shell">
          <div id="sysinfo">
            {this.props.user}@web-shell {this.state.cwd}
          </div>
          <div className="shellPrompt">
            <span className="dollar">$</span>
            <textarea
              autoFocus
              onKeyDown={(key) => this.getKeyStroke(key)}
              onInput={this.autoGrowPrompt}
              style={{ height: this.state.promptHeight }}
              name="command"
              id="prompt"
            ></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default Shell;
