import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../app.authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subData: any[] = null;

  dataResponse: any = [];

  resultSummary;

  counter: number = -1;

  offset: number = 0;

  str;

  options = {
    headers: new HttpHeaders().set('X-RapidAPI-Key', 'cca326f766mshe31a4765bd2932ep182933jsn455b3bbb973b')
    .set('X-RapidAPI-Host', 'travel-advisor.p.rapidapi.com')
  };

  constructor(private http: HttpClient, protected authService: AuthService) { }

  ngOnInit() {
    this.preRequest();
  }

  preRequest()
  {
    this.authService.getLocation().then(pos=>
      {

        this.str = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${pos.lat}&longitude=${pos.lng}&limit=9&offset=${this.offset}`;

        console.log(this.str);

        this.http.get(this.str, this.options).subscribe((response: any) => 
                {
                    let arr;
                    this.resultSummary = response.paging.total_results;
                    arr = response;
                    arr.data = response.data.filter(item => "name" in item );
                    this.dataResponse = arr;
                    console.log(this.dataResponse);
                });
      });
  }
  
  next()
  {
    if((this.offset + 9) <= this.resultSummary)
    {
      this.offset = this.offset + 9;
      this.counter = -1;
      this.dataResponse = [];
      this.preRequest();
    }
  }

  previous()
  {
    if((this.offset - 9) >= 0)
    {
      this.offset = this.offset - 9;
      this.counter = -1;
      this.dataResponse = [];
      this.preRequest();
    }
  }

  getImage()
  {
    this.counter++;
    if("photo" in this.dataResponse.data[this.counter])
    {
      return this.dataResponse.data[this.counter].photo.images.medium.url;
    } 
    return 'template_1.jpg';
  }

  checkFunc(item)
  {
    if(("rating" in item) === false)
    {
      return false;
    }
    return true;
  }

  checkPrice(item)
  {
    if(item[0] === "$" &&
    item[1] === "$" || item.includes("$$$"))
    {
      return 70;
    }
    else if(item[0] === "$")
    {
      return 30;
    }
    return 0;
  }

  pbarColor(item)
  {
    if(this.checkPrice(item) === 30)
    {
      return "success";
    }
    else if(this.checkPrice(item) === 70)
    {
      return "danger";
    }
    return "primary";
  }

  checkString(item)
  {
    if(/\s/.test(item) === true && item.length > 16)
    {
      return "20%";
    }
    return 0;
  }
}