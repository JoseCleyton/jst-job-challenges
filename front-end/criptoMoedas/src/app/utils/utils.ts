import { ChartDataSets } from 'chart.js';
import { Label, Color} from 'ng2-charts';

/**
 * @class
 * Classe Utils
*/
export class Utils{
/**
* @public
@type {ChartDataSets} 
* atributo que guarda os valores das linhas do gráfico*/
    public lineChartData: ChartDataSets[];
/**
* @public
@type {Label} 
* atributo que guarda os nomes dos labels do gráfico
*/
    public lineChartLabels: Label[];  
/**
* @public
@type {Color} 
* atributo que guarda cores das bordas e do background do gráfico
*/
    public lineChartColors: Color[];
/**
* @public
@type {string} 
* atributo de controle para mostrar a legenda do gráfico
*/
    public lineChartLegend: string;
/**
* @public
@type {string} 
* Atributo que guarda tipo do gráfico
*/
    public lineChartType: string;
    
/**
 * @public
 * Função que monta o gráfico
 * @param {string} moeda - nome da moeda com primeira letra maiúscula
 * @param {number []} valores - valores do gráfico
 * @param {string} cor - cor do gráfico
 */
  public montarGrafico(moeda: string, valores:number [], cor: string): any{
   
    let valorDeAbertura = valores
    
        this.lineChartLabels = [
          'dia', 'hora', 'mês', 'mês 3', 'mês 6', 'semana', 'ano'];
    
        this.lineChartColors = [
          {
            borderColor: 'black',
            backgroundColor: cor,
          },
        ];
    
        this.lineChartLegend = 'true';
        this.lineChartType = 'line';

        let grafico = {
            lineChartData :[
                { data:
                    [
                     valorDeAbertura['day'] ,
                     valorDeAbertura['hour'],
                     valorDeAbertura['month'],
                     valorDeAbertura['month_3'],
                     valorDeAbertura['month_6'],
                     valorDeAbertura['week'],
                     valorDeAbertura['year']
                    ],label: 'Valores do ' + moeda }
            ] ,
            lineChartLabels: this.lineChartLabels,
            lineChartColors: this.lineChartColors,
            lineChartLegend: this.lineChartLegend,
            lineChartType: this.lineChartType
        }

        return grafico
      }

    
}