import { Component, OnInit, OnDestroy } from '@angular/core';
import { BitcoinAverageService } from '../service/bitcoinAverage-service'
import { Utils } from '../utils/utils'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
/**
 * @class
 * @implements - OnInit
 * DashboardComponent
 */
export class DashboardComponent implements OnInit , OnDestroy{
  /**
   * @public
   * @type {boolean}
   * Atributo de controle para alternar na visualização dos cards de cada gráficos do Bitcoin
  */
  public graficoBitcoin: boolean
  /**
   * @public
   * @type {boolean}
   * Atributo de controle para alternar na visualização dos cards de cada gráficos do Litecoin
  */
  public graficoLitecoin: boolean
  /**
   * @public
   * @type {boolean}
   * Atributo de controle para alternar na visualização dos cards de cada gráficos do Ethereum
  */
  public graficoEthereum: boolean
  /**
   * @public
   * @type {boolean}
   *  Atributo de controle para o mostrar o gráfico
  */
  public carregarGrafico: boolean

  /**
   * @public
   * @type {Utils}
   * Atributo da classe Utils, onde está o metodo que monta o gráfico
  */
  public utils: Utils

  /**
   * @public
   * @type {boolean}
   * Atributo de controle para mostrar a barra de carregamento dos valores das moedas no card
   */
  public carregamento: boolean

  /**
   @public
   @type {any[]}
  Arrays que guarda as cotações de cada moeda
  */
  public cotacaoMoedas:any = []
public intervalo
  /**
   * @public
   * @type {any}
   * Atributo que guarda as informações do gráfico
  */
  public grafico: any
/**
 * @constructor
 * @param {BitcoinAverageService} bitcoinAverageService - atributo do serviço BitcoinAverageService
 */
  constructor(public bitcoinAverageService: BitcoinAverageService) { 
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

  this.buscarCotacao('bitcoin', 'BTC')
    .then((resposta:any)=>{
      this.carregamento = false
      this.cotacaoMoedas['bitcoin'] = resposta    
      this.montarGrafico(true, false, false, 'Bitcoin', 'rgba(0, 100, 0)') 
    })
  this.buscarCotacao('litecoin','LTC')
    .then((resposta:any)=>{
      this.carregamento = false
      this.cotacaoMoedas['litecoin'] = resposta    
      this.montarGrafico(false, true, false, 'Litecoin', 'rgba(30, 144, 255)') 
    })
  this.buscarCotacao('ethereum', 'ETH') 
    .then((resposta:any)=>{
      this.carregamento = false
      this.cotacaoMoedas['ethereum'] = resposta    
      this.montarGrafico(false, false, true, 'Ethereum', 'rgba(255, 0, 0)') 
    })
    
  this.atualizaDashboard() 
  
  }
  
  /**
   * @public
   * Busca a cotação por moeda e carrega o gráfico do Bitcoin por default
   * @param {string} moeda - nome da moeda com letras minúsculas
   * @param {string} siglaDaMoeda - sigla da moeda com letras maiúscula
   */
  public buscarCotacao(moeda: string, siglaDaMoeda: string){
    this.carregamento = true
    this.cotacaoMoedas[moeda] = []
    return this.bitcoinAverageService.buscarUltimoValorPorMoeda(siglaDaMoeda)
    
  }
  
  /**
   * @public
   * @param {boolean} bitcoin - se false esconde o grafico para essa moeda
   * @param {boolean} litecoin - se false esconde o grafico para essa moeda
   * @param {boolean} ethereum - se false esconde o grafico para essa moeda
   * @param {boolean} moeda - nome da moeda com primeira letra maiúscula
   * @param {boolean} moeda2 - nome da moeda com todas as letras minúsculas
   * @param {boolean} cor - cor para o gráfico
   */
  public montarGrafico(bitcoin: boolean, litecoin: boolean, ethereum: boolean, moeda: string, cor: string ){
    this.graficoBitcoin = bitcoin
    this.graficoLitecoin = litecoin
    this.graficoEthereum = ethereum    
    this.grafico = undefined
    this.grafico = this.utils.montarGrafico(moeda,this.cotacaoMoedas[moeda.toLowerCase()]['open'], cor)   
    this.carregarGrafico = true
  }

  /**
   * @private
   * Atualiza as informação do DashBoard a cada 15 segundos
   */ 
  private atualizaDashboard(){
    
   this.intervalo = setInterval(()=>{
        this.buscarCotacao('bitcoin', 'BTC')
        .then((resposta:any)=>{
          this.carregamento = false
          this.cotacaoMoedas['bitcoin'] = resposta 
          console.log('Buscando')
        })
      this.buscarCotacao('litecoin','LTC')
        .then((resposta:any)=>{
          this.carregamento = false
          this.cotacaoMoedas['litecoin'] = resposta 
          console.log('Buscando')
        })
      this.buscarCotacao('ethereum', 'ETH') 
        .then((resposta:any)=>{
          this.carregamento = false
          this.cotacaoMoedas['ethereum'] = resposta
          console.log('Buscando')
        }) 
    },15000)  
    
  }

  ngOnDestroy(){
    clearInterval(this.intervalo)
  }
  
}
