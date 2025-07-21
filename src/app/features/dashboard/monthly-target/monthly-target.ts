import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexFill,
  ApexStroke,
  ApexPlotOptions,
  ApexDataLabels,
} from 'ng-apexcharts';
@Component({
  selector: 'app-monthly-target',
  imports: [NgApexchartsModule],
  templateUrl: './monthly-target.html',
  styleUrl: './monthly-target.css',
})
export class MonthlyTarget {
  percentage = 75.55;
  target = '20K';
  revenue = '20K';
  today = '20K';
  todayEarnings = 3287;

  // Calculate circle progress
  radius = 50;
  circumference = 2 * Math.PI * this.radius;

  get strokeDashoffset(): number {
    return this.circumference - (this.percentage / 100) * this.circumference;
  }

  chartSeries = [75.55];

  chartOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    } as ApexChart,

    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '70%',
        },
        track: {
          background: '#E5E7EB', // gray-200
          strokeWidth: '100%',
        },
        dataLabels: {
          show: false, // Tắt phần trăm mặc định
        },
      },
    } as ApexPlotOptions,

    fill: {
      colors: ['#3B4890'], // navy
    } as ApexFill,

    stroke: {
      lineCap: 'round',
    } as ApexStroke,

    dataLabels: {
      enabled: false,
    } as ApexDataLabels,

    labels: ['Progress'],
  };
}
