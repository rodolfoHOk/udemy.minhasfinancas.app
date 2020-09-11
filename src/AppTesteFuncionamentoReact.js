import React from 'react';

class App extends React.Component{

  state = {
    nome: '',
    numero1: null,
    numero2: null,
    resultado: null,
  }

  somar = () => {
    const soma = parseInt(this.state.numero1) + parseInt(this.state.numero2)
    this.setState({resultado: soma})
  }
  
  render(){
    return(
      <div>
        <label>Nome:</label>
        <input type="text" value={this.state.nome} 
          onChange={(e) => this.setState({nome: e.target.value})} />
        <br/>
        O nome digitado foi: {this.state.nome}
        <br/>
        <br/>
        <label>Primeiro número:</label>
        <input type="text" value={this.state.numero1} 
          onChange={(e) => this.setState({numero1: e.target.value})} />
        <br/>
        <label>Segundo número:</label>
        <input type="text" value={this.state.numero2} 
          onChange={(e) => this.setState({numero2: e.target.value})} />
        <br/>
        <button 
          onClick={this.somar}>
            Somar
        </button>
        <br/>
        O resultado é: {this.state.resultado}
      </div>
    )
  }
}

export default App;
