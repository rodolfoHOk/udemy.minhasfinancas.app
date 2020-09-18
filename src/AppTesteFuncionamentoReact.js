/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      numero1: null,
      numero2: null,
      resultado: null,
    };
  }

  somar = () => {
    const { numero1 } = this.state;
    const { numero2 } = this.state;
    // eslint-disable-next-line radix
    const soma = parseInt(numero1) + parseInt(numero2);
    this.setState({ resultado: soma });
  }

  render() {
    const { nome } = this.state;
    const { numero1 } = this.state;
    const { numero2 } = this.state;
    const { resultado } = this.state;
    return (
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => this.setState({ nome: e.target.value })}
        />
        <br />
        O nome digitado foi:
        {' '}
        {nome}
        <br />
        <br />
        <label>Primeiro número:</label>
        <input
          type="text"
          value={numero1}
          onChange={(e) => this.setState({ numero1: e.target.value })}
        />
        <br />
        <label>Segundo número:</label>
        <input
          type="text"
          value={numero2}
          onChange={(e) => this.setState({ numero2: e.target.value })}
        />
        <br />
        <button onClick={this.somar}>
          Somar
        </button>
        <br />
        O resultado é:
        {' '}
        {resultado}
      </div>
    );
  }
}

export default App;
