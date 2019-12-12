import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { chavesApi, ulrsApi } from '../config/api'

/**
 * @class
 * AssinaturaService
 * Serviço que cria a assinatura para consumir a API do BitcoinAverage.
 * Este serviço é injetado no serviço bitcoinAverage
 */

@Injectable()
export class AssinaturaService{
/**
 * @constructor
 * @param {HttpClient} http - módulo HTTP
 */
    constructor(public http: HttpClient){}
    /**
     * @public
     * @returns {Promise<string>} - retorna a assinatura
     * Cria a assinatura para autenticação
     */
    public criarAssinatura(): Promise<string>{
        let assinatura : string;
        let timestamp : Number;
        this.http.get(ulrsApi.urlTempoServidor)
        .toPromise()
        .then((times:any)=>{
            timestamp = times.epoch
            })
                .then(()=>{            
                    let cargaUtil = timestamp + '.' + chavesApi.chavePublica;
                    
                    let digestValue = CryptoJS.HmacSHA256(cargaUtil, chavesApi.chavePrivada)
                    
                    assinatura = timestamp + "." + chavesApi.chavePublica + "." +digestValue;
                })
                    return new Promise((resolve, reject)=>{
                        resolve(assinatura)
                    })
        
    }
}