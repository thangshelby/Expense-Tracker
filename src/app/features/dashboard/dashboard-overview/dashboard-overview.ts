import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: string[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-dashboard-overview',
  imports: [NgApexchartsModule, CurrencyPipe],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.css',
})
export class DashboardOverview {
  chartSeries: ApexAxisChartSeries = [
    {
      name: 'Previous Month',
      data: [480, 500, 580, 470, 510, 560, 460, 550],
    },
    {
      name: 'Current Month',
      data: [520, 530, 650, 600, 620, 690, 520, 640],
    },
  ];

  chartOptions: ChartOptions = {
    series: this.chartSeries,
    chart: {
      type: 'bar',
      height: 200,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        // borderRadius: 6,
        borderRadiusWhenStacked: 'all',
        borderRadiusApplication: 'around',
        // endingShape: 'rounded',#1E40AF
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    colors: ['#1E40AF', '#60A5FA'], // navy + skyblue
    legend: {
      position: 'bottom',
    },
  };
}
