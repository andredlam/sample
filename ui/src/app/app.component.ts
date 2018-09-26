import { GraphService } from './service/graph.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    chart;

    data = [
        {
            'id': 1,
            'group': 'GNE study',
            'total': 100,
            'enrolled': 10
        },
        {
            'id': 2,
            'group': 'Diabetic',
            'total': 50,
            'Enrolled': 0
        },
        {
            'id': 3,
            'group': 'CHAMP',
            'total': 29,
            'enrolled': 3
        },
        {
            'id': 4,
            'group': 'SD-DOC',
            'total': 98,
            'enrolled': 10
        },
        {
            'id': 5,
            'group': 'Glaucoma',
            'total': 34,
            'Enrolled': 0
        },
        {
            'id': 6,
            'group': 'GNE2',
            'total': 68,
            'enrolled': 32
        }
    ];

    constructor(private graphService: GraphService) {}

    ngOnInit(): void {
        this.graphService.messages.subscribe(msg => {
            for (const each of this.data) {
                if (each.id === msg.id) {
                    // this.removeData(this.chart, 0, msg.id);
                    this.updateTotal(this.chart, msg.id, msg.total);
                    this.updateEnroll(this.chart, msg.id, msg.enrolled);
                    break;
                }
            }
        });

        const labels = [];
        const totals = [];
        const enrolls = [];
        for (const each of this.data) {
            labels.push(each.group);
            totals.push(each.total);
            enrolls.push(each.enrolled);
        }

        this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Patients',
                        data: totals,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false
                    },
                    {
                        label: 'Enrolled',
                        data: enrolls,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        fill: false
                    }
                ]
            },
            options: {
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });
    }

    updateTotal(chart, id, data) {
        chart.data.datasets[0].data[id] = data;
        chart.update();
    }

    updateEnroll(chart, id, data) {
        chart.data.datasets[1].data[id] = data;
        chart.update();
    }

}
