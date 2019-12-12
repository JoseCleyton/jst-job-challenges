import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AssinaturaService } from './assinatura-service';
import { ulrsApi } from '../config/api'

/**
 * @class
 * Serviço que consome a API do BitcoinAverage
*/
export class BitcoinAverageService{
    /** 
     * @private
     * @type {HttpHeaders} 
     * atributo que guarda os cabeçalhos das requisições HTTP
    */
    public header : HttpHeaders
/**
 * @constructor
 * @param {HttpClient} http - módulo HTTP
 * @param {AssinaturaService} apiConfig - configuração da API
 */
    constructor(public http : HttpClient, public apiConfig: AssinaturaService){
        this.header = new HttpHeaders()
    }
/**
 * @public
 * busca todas as siglas e nomes das Cripto Moedas
 */ 
    public bucarNomesCriptoMoedas(){
        
        this.apiConfig.criarAssinatura()
            .then((assinatura: string)=>{
                this.header.set('X-signature', assinatura)
            })
                return this.http.get(ulrsApi.urlNomesDasMoedas,{
                    headers: this.header
                })
                .toPromise()         
        
            
    }

/**
 * @public
 * Função que busca o ultimo valor da cripto moeda pelo nome e trás convertida para moeda Real Brasileiro - BRL
 * @param {string} siglaDaMoeda - sigla da moeda a ser pesquisada.
*/  public buscarUltimoValorPorMoeda(siglaDaMoeda: string){
        this.apiConfig.criarAssinatura()
            .then((assinatura: string)=>{
                this.header.set('X-signature', assinatura)
            })
                return this.http.get(ulrsApi.urlCotacaoPorMoeda+siglaDaMoeda+'BRL',{
                    headers: this.header
                })
                  .toPromise()     
    }

}

