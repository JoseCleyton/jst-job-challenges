import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AssinaturaService } from './assinatura-service';
import { ulrsApi } from '../config/api'

// Serviço que consome a API do BitcoinAverage
export class BitcoinAverageService{
    private header : HttpHeaders

    constructor(private http : HttpClient, private apiConfig: AssinaturaService){
        this.header = new HttpHeaders()
    }

    // Função que busca todas as siglas e nomes das Cripto Moedas
    public bucarNomesCriptoMoedas(){
        
        this.apiConfig.criarAssinatura()
            .then((signature)=>{
                this.header.set('X-signature', signature)
            })
                return this.http.get(ulrsApi.urlNomesDasMoedas,{
                    headers: this.header
                }) 
                    .toPromise()         
        
            
    }

    // Função que busca o ultimo valor da cripto moeda pelo nome e trás convertida para moeda Real Brasileiro - BRL
    public buscarUltimoValorPorMoeda(moeda: string){
        this.apiConfig.criarAssinatura()
            .then((signature)=>{
                this.header.set('X-signature', signature)
            })
                return this.http.get(ulrsApi.urlCotacaoPorMoeda+moeda+'BRL',{
                    headers: this.header
                })
                    .toPromise()     
    }

}

