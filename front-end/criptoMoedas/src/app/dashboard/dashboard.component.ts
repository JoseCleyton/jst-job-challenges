import { Component, OnInit } from '@angular/core';
import { BitcoinAverageService } from '../service/bitcoinAverage-service'
import { Utils } from '../utils/utils'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/*
Classe responsável por montar todas as informações do DashBoard
  Ela se comunica com o serviço de BitcoinAverage, que consome a API do BitcoinAverage.
*/
export class DashboardComponent implements OnInit {
  // Atributos de controle para alternar na visualização dos cards de cada gráficos por moeda
  public graficoLitecoin: boolean
  public graficoBitcoin: boolean
  public graficoEthereum: boolean

  // Atributo de controle para o mostrar o gráfico
  public carregarGrafico: boolean

  // Atributo da classe Utils, onde está o metodo que monta o gráfico
  private utils: Utils

  // Atributo de controle para mostrar a barra de carregamento dos valores das moedas no card
  public carregamento: boolean

  /*
  Arrays que guarda as cotações de cada moeda, assim, tenho apenas uma estrutura de dados guardando
    todas as informações
  */
  public cotacaoMoedas = []

  // Atributo que guarda as informações do gráfico
  public grafico: any

  constructor(private bitcoinAverageService: BitcoinAverageService) { 
    // Crio 3 indices, um para cada moeda e guardo as informações referente a cada uma
    this.cotacaoMoedas['bitcoin'] = []
    this.cotacaoMoedas['litecoin'] = []
    this.cotacaoMoedas['ethereum'] = []
    this.carregamento = true
    this.graficoBitcoin = true;
    this.graficoLitecoin = false
    this.graficoEthereum = false
    this.utils = new Utils()
  }

  ngOnInit() {  
    // Chamada da função que atualiza o Dashboard
    this.atualizaDashboard();    
  }
  
  /*
    Busca os dados da moeda Bitcoin chamando o serviço bitcoinAverageService
  */
  public buscarCotacaoBitcoin(){
    this.carregamento = true
    this.cotacaoMoedas['bitcoin'] = []
    this.bitcoinAverageService.buscarUltimoValorPorMoeda('BTC')
    .then((resposta:any)=>{
      this.carregamento = false
        this.cotacaoMoedas['bitcoin'] = resposta
    })
    .then(()=>{
      this.montarGraficoBitcoin()
    })
    .catch((erro)=>{
      console.log(erro)

    })
  }
  /*
    Busca os dados da moeda Litecoin chamando o serviço bitcoinAverageService
  */
  public buscarCotacaoLitecoin(){
    this.carregamento = true
    this.cotacaoMoedas['litecoin'] = []
    this.bitcoinAverageService.buscarUltimoValorPorMoeda('LTC')
    .then((resposta:any)=>{
      this.carregamento = false
      this.cotacaoMoedas['litecoin'] = resposta
    })
    .catch((erro)=>{
      console.log(erro)  
    })
  }
  /*
    Busca os dados da moeda Ethereum chamando o serviço bitcoinAverageService
  */
  public buscarCotacaoEthereum(){
    this.carregamento = true
    this.cotacaoMoedas['ethereum'] = []
    this.bitcoinAverageService.buscarUltimoValorPorMoeda('ETH')
    .then((resposta:any)=>{
      this.carregamento = false
      this.cotacaoMoedas['ethereum'] = resposta
    })
    .catch((erro)=>{
      console.log(erro)
    })
  }
  /* Monta gráfico do Bitcoin chamando um metodo generico para montar os gráficos passando os valores
      do Bitcoin
  */
  public montarGraficoBitcoin(){
    this.graficoBitcoin = true
    this.graficoLitecoin = false
    this.graficoEthereum = false
    this.grafico = undefined
    this.grafico = this.utils.montarGrafico('Bitcoin',this.cotacaoMoedas['bitcoin']['open'], 'rgba(0, 100, 0)')   
    this.carregarGrafico = true
  }
    
  /* Monta gráfico do Litecoin chamando um metodo generico para montar os gráficos passando os valores
      do Litecoin
  */   
  public montarGraficoLitecoin(){
    this.graficoLitecoin = true
    this.graficoBitcoin = false
    this.graficoEthereum = false
    this.grafico = undefined
    this.grafico = this.utils.montarGrafico('Litecoin',this.cotacaoMoedas['litecoin']['open'], 'rgba(30, 144, 255)') 
    this.carregarGrafico = true
  }
      
  /* Monta gráfico do Ethereum chamando um metodo generico para montar os gráficos passando os valores
      do Ethereum
  */      
  public montarGraficoEthereum(){
    this.graficoBitcoin = false
    this.graficoLitecoin = false
    this.graficoEthereum = true
    this.grafico = undefined
    this.grafico = this.utils.montarGrafico('Ethereum',this.cotacaoMoedas['ethereum']['open'], 'rgba(255, 0, 0)') 
    this.carregarGrafico = true
  }

  // Atualiza as informação do DashBoard a cada 15 segundos
  private atualizaDashboard(){
    this.buscarCotacaoBitcoin()
    this.buscarCotacaoLitecoin()
    this.buscarCotacaoEthereum()  
    /*
    setInterval(()=>{
      this.buscarCotacaoBitcoin()
      this.buscarCotacaoLitecoin()
      this.buscarCotacaoEthereum()  
    },15000)
   */
  }

}
