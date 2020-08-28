import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/DataService';
import * as jwt_decode from "jwt-decode";
import { Ad } from '../shared/Ad';


@Component({
    selector:'homePage-component',
    templateUrl:'homePage.component.html',
    styleUrls: ['homePage.component.css']
})

export class HomePageComponent implements OnInit {

    ads: any;
    userId: any;
    isClient = true;
    constructor(private router: Router, public data: DataService) {
    }

    localsto

    ngOnInit() {
        const token = localStorage.getItem('token');
        const decodeToken = jwt_decode(token);
        this.userId = decodeToken.jti;
              if(decodeToken.Role=="Agent" || decodeToken.Role=="Admin"){
                  this.isClient = false;
              }
        this.data.getAllAds().subscribe(response => {
            this.ads = response;
        });
    }

    SearchAds(startDate:Date, endDate: Date){
        localStorage.setItem('startDate' , startDate.toString());
        localStorage.setItem('endDate', endDate.toString());
        //this.ads where date matching
    }

    AddToCart(ad:Ad) {
        if (localStorage.ads !== undefined) {
            let newList = [];
            newList = JSON.parse(localStorage.ads);
            newList.push(ad);
            localStorage.ads = JSON.stringify(newList);
        } else {
            let newList = [];
            newList.push(ad);
            localStorage.ads = JSON.stringify(newList);
        }
        
        this.router.navigate(['/Cart']);
    }

    Delete(id: any) {
        //this.data.deleteAds(id)
        //.subscribe(() => {
            //reload
        //});
    }

    ShowDetails(id: string){
        this.router.navigate(['Ad/', id]);
    }

    Edit(id: string){}

    CreateNewAdd() {
        this.router.navigate(["/addAd"]);
    }


}