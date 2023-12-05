import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

    desconectar() {
    fetch('api/desconectar', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => { window.location.href = "/" });
}

  render() {
    return (
      <div>
            <h1>Página inicial</h1>
            <a href="/atendimentos/">Ver atendimentos</a>
            <br />
            <a href="/servicos/">Ver serviços</a>
            <br />
            <button onClick={() => this.desconectar()}>Desconectar</button>
      </div>
    );
  }
}
