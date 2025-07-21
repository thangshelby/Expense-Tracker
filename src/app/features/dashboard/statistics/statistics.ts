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
      type: 'line',
      height: 400,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeWidth: 2,
      strokeColors: ['#008FFB', '#00E396'],
    },

    plotOptions: {
      line: {},
      // bar: {
      //   horizontal: false,
      //   columnWidth: '10%',
      //   // borderRadius: 6,
      //   borderRadiusWhenStacked: 'all',
      //   borderRadiusApplication: 'around',
      //   // endingShape: 'rounded',#1E40AF
      // },
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
