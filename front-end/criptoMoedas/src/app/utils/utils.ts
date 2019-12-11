import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

// Classe Utils
export class Utils{
    public lineChartData: ChartDataSets[];
    public lineChartLabels: Label[];  
    public lineChartColors: Color[];
    public lineChartLegend;
    public lineChartType;
    public lineChartPlugins;
    
    // Função que monta o gráfico
  public montarGrafico(moeda: string, valores: [], cor: string){
   
    let valorDeAbertura = valores
    
        this.lineChartLabels = [
          'day', 'hour', 'month', 'month_3', 'month_6', 'week', 'year'];
    
        this.lineChartColors = [
          {
            borderColor: 'black',
            backgroundColor: cor,
          },
        ];
    
        this.lineChartLegend = 'true';
        this.lineChartType = 'line';
        this.lineChartPlugins = [];
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
            lineChartType: this.lineChartType,
            lineChartPlugins: this.lineChartPlugins
        }

        return grafico
      }

    
}