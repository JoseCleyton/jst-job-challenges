import { Component, OnInit } from '@angular/core';
import { BitcoinAverageService } from '../service/bitcoinAverage-service';

@Component({
  selector: 'app-lista-siglas',
  templateUrl: './lista-siglas.component.html',
  styleUrls: ['./lista-siglas.component.scss']
})
export class ListaSiglasComponent implements OnInit {
public siglasMoedas = []
public moedaSelecionada;
public nova = []
public siglasCarregadas: boolean
  constructor(private bitcoinAverage: BitcoinAverageService) { 
    this.siglasCarregadas = false
  }

  ngOnInit() {
    
    this.bitcoinAverage.bucarNomesCriptoMoedas()
      .then((siglas:any)=>{
        this.siglasCarregadas = true
        console.log(siglas)
       let siglasMoedasAux = Object.keys(siglas.crypto)
        console.log(this.siglasMoedas)
        siglasMoedasAux.map((sigla)=>{
          let moeda = {
            sigla: sigla,
            nome: siglas.crypto[sigla]
          }
          this.siglasMoedas.push(moeda)
        })
        console.log(this.siglasMoedas)
      })
      .catch(()=>{
        this.siglasCarregadas = false
      })
  }

  public selecionarMoeda(sigla: string){
    this.moedaSelecionada = {
      sigla: '',
      valor: 0,
      nome: ''
    }
        this.moedaSelecionada = this.siglasMoedas.find((moeda)=>{
            return moeda.sigla === sigla
        })
        this.bitcoinAverage.buscarUltimoValorPorMoeda(sigla)
      .then((resposta: any)=>{
        this.moedaSelecionada.valor = resposta.last
      })
  }

}
