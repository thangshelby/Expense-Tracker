import { Component, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexMarkers,
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: string[];
  legend: ApexLegend;
  stroke: ApexStroke;
  markers: ApexMarkers;
};
@Component({
  selector: 'app-statistics',
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics {
  period = signal('annually');
  onSetPeriod(newPeriod: string) {
    this.period.update(() => newPeriod);
  }

  chartSeries: ApexAxisChartSeries = [
    {
      name: 'Expense',
      data: [480, 500, 580, 470, 510, 560, 460, 550],
    },
    {
      name: 'Income',
      data: [520, 530, 650, 600, 620, 690, 520, 640],
    },
  ];

  chartOptions: ChartOptions = {
    series: this.chartSeries,
    stroke: {
      // curve: 'smooth',
      width: [1, 1],
    },
    chart: {
      type: 'area',
      height: 400,
      toolbar: {
        show: false,
      },
    },

    markers: {
      size: 4,
      colors: ['#fff'],
      strokeWidth: 2,
      strokeColors: ['#008FFB', '#00E396'],
    },

    plotOptions: {
      line: {},
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
