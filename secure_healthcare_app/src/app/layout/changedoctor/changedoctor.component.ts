import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService} from '../../services/rest.service'

@Component({
  selector: 'app-changedoctor',
  templateUrl: './changedoctor.component.html',
  styleUrls: ['./changedoctor.component.scss']
})
export class ChangedoctorComponent implements OnInit {
  reports: Array<String>;
  doctors: Array<String>;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private restService: RestService) {
  }
  private changedoctor={
    PatientIdRef:'',
    ReportId:'',
    newDoctorId:''

  }

  changeDoctor(e)
  {
    e.preventDefault();
    var username = localStorage.getItem('username'); 
    this.changedoctor.PatientIdRef = username;
    this.changedoctor.ReportId = e.target.elements[0].value;
    this.changedoctor.newDoctorId = e.target.elements[1].value;
    console.log(this.changedoctor.PatientIdRef)
    console.log(this.changedoctor.ReportId)
    console.log(this.changedoctor.newDoctorId)
    console.log(this.restService.changeDoctor(this.changedoctor))

  }

  ngOnInit() {


    this.restService.getAllReports().subscribe(
      data =>{
          this.reports = [];
          for(let key in data)
          {
              this.reports.push(data[key]['reportId']);
              console.log(data[key]['reportId']);
          }
      }
  );

  this.restService.getAllDoctors().subscribe(
    data =>{
        this.doctors = [];
        for(let key in data)
        {
            this.doctors.push(data[key]['DoctorId']);
            console.log(data[key]['DoctorId']);
        }
    }
);
  }

}
