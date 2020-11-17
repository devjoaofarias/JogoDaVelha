import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);

    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');

    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    //LINHAS
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0]);
    }

    //COLUNAS
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    //DIAGONAL 1
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0]);
    }

    //DIAGONAL 2
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2]);
    }

    //NENHUM GANHADOR
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo('');
    }

    //JOGO NAO FINALIZADO
    setJogadasRestantes((jogadasRestantes - 1));
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador');
  }

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
    default:
      break;
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>

        <View style={styles.inLineItems}>
          <TouchableOpacity style={styles.boxJogador}
            onPress={() => iniciarJogo('X')}>
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boxJogador}
            onPress={() => iniciarJogo('O')}>
            <Text style={styles.jogadorO}>0</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>

        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.inLineItems}>

                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity
                        style={styles.boxJogador}
                        key={numeroColuna}
                        onPress={() => jogar(numeroLinha, numeroColuna)}
                        disabled={coluna !== ''}>
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          })
        }

        <TouchableOpacity
          onPress={() => setTela('menu')}>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>


      </View>
    );
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Opa, temos um resultado!</Text>

        {
          ganhador === '' &&
          <Text style={styles.ganhador}>Nenhum ganhador</Text>
        }

        {
          ganhador !== '' &&
          <>
            <Text style={ganhador === 'X' ? styles.ganhadorX : styles.ganhadorO}>Vencedor:</Text>
            <View style={styles.boxJogador}>
              <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }

        <TouchableOpacity
          onPress={() => setTela('menu')}>
          <Text style={styles.textoVoltar}>Jogar novamente</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090909',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fbfbfb",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    color: "#fbfbfb",
    marginTop: 20,
    marginBottom: 10,
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: '#181818',
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  textoVoltar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbfbfb',
    marginTop: 30,
  },
  jogadorX: {
    fontSize: 40,
    color: '#df0003'
  },
  jogadorO: {
    fontSize: 40,
    color: '#016799'
  },
  inLineItems: {
    flexDirection: 'row',
  },
  ganhadorO: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#016799',
  },
  ganhadorX: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#df0003',
  },
});
