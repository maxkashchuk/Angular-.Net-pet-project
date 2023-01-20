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

  pagArr: string[] = ["1","...", "4", "5", "6", "...", "9"];

  pagMinArr: string[] = [];

  movePage: boolean = true;

  countPage: boolean;

  lastPage: boolean;

  options = {
    headers: new HttpHeaders().set('X-RapidAPI-Key', 'cca326f766mshe31a4765bd2932ep182933jsn455b3bbb973b')
    .set('X-RapidAPI-Host', 'travel-advisor.p.rapidapi.com')
  };

  isLoading: boolean;

  constructor(private http: HttpClient, protected authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.preRequest();
  }

  preRequest()
  {
    this.authService.getLocation().then(pos=>
      {

        this.str = `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${pos.lat}&longitude=${pos.lng}&offset=0`;

        console.log(this.str);

        this.http.get(this.str, this.options).subscribe((response: any) => 
                {
                    let arr;
                    let maxPages: number;
                    this.resultSummary = response.paging.total_results;
                    arr = response;
                    arr.data = response.data.filter(item => "name" in item );
                    this.dataResponse = arr;

                    console.log(this.dataResponse.data);
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    console.log(this.dataResponse.data.length);
                    
                    if(this.dataResponse.data.length % 9 != 0)
                    {
                      this.pagArr[6] = String((Math.floor(this.dataResponse.data.length / 9)) + 1);
                    }
                    else
                    {
                      this.pagArr[6] = String(this.dataResponse.data.length / 9);
                    }

                    maxPages = +this.pagArr[6];
                    this.pagMinArr = [];

                    if(maxPages < 9)
                    {
                      this.countPage = true;

                      for(let i: number = maxPages; i > 0; i--)
                      {
                        this.pagMinArr.unshift(String(i));
                      }
                    }
                    else if(maxPages >= 9)
                    {
                      this.countPage = false;

                      this.lastPage = false;
                      
                      if(this.offset < 27)
                      {
                        this.pagArr[0] = '1';
                        this.pagArr[1] = '2';
                        this.pagArr[2] = '3';
                        this.pagArr[3] = '4';
                        this.pagArr[4] = '5';
                        this.pagArr[5] = '...';
                        this.pagArr[6] = String(maxPages);
                      }
                      else if(this.offset == ((maxPages * 9) - 9))
                      {
                        this.pagArr[0] = '1';
                        this.pagArr[1] = '...';
                        this.pagArr[2] = String(maxPages - 4);
                        this.pagArr[3] = String(maxPages - 3);
                        this.pagArr[4] = String(maxPages - 2);
                        this.pagArr[5] = String(maxPages - 1);
                        this.pagArr[6] = String(maxPages);
                        this.lastPage = true;
                      }
                      else
                      {
                        this.pagArr[0] = '1';
                        this.pagArr[1] = '...';
                        this.pagArr[2] = String(this.offset / 9);
                        this.pagArr[3] = String((this.offset / 9) + 1);
                        this.pagArr[4] = String((this.offset / 9) + 2);
                        this.pagArr[5] = '...';
                        this.pagArr[6] = String(maxPages);
                      }
                    }

                    this.dataResponse.data = this.dataResponse.data.slice(this.offset, this.offset + 9);
                    console.log(this.dataResponse.data[this.dataResponse.data.length - 1].id);

                    this.movePage = true;
                    this.isLoading = false;
                });
      });
  }
  
  next()
  {
    if((this.offset + 9) <= this.resultSummary)
    {
      this.movePage = false;
      setTimeout(()=> {
        this.isLoading = true;
        this.offset = this.offset + 9;
        this.counter = -1;
        this.dataResponse = [];
        this.preRequest();
      }, 3000);
    }
  }

  previous()
  {
    if((this.offset - 9) >= 0)
    {
      this.movePage = false;
      setTimeout(()=> {
        this.isLoading = true;
        this.offset = this.offset - 9;
        this.counter = -1;
        this.dataResponse = [];
        this.preRequest();
      }, 3000);
      
    }
  }

  choosen(event: any)
  {
    this.movePage = false;
    console.log(event.target.innerHTML);
    setTimeout(()=> {
      this.isLoading = true;
      this.offset = ((+event.target.innerHTML * 9) - 9);
      this.counter = -1;
      this.dataResponse = [];
      this.preRequest();
    }, 3000);
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