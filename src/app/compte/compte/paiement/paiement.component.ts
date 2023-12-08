import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {
  //@ViewChild('paypal');
  buttonpaypal:any;
  constructor(public toastr:ToastrService,private paypalElement:ElementRef) { }
  
  ngOnInit(): void {
      console.log(window.paypal);
      window.paypal
      .Buttons({
        style:{
          layout:'horizontal',
          color: 'blue',
        },
        createOrder:(data:any, actions:any)=>
        {
          return actions.order.create({
            purchase_units:[
              {
                amount: {
                  value:'10',
                  currency_code: 'USD'

                }
              }
            ]
          });
        },
        onApprouve:(data:any,actions:any) =>{
          return actions.order.capture().then((details:any)=>{
            this.toastr.success('Payement effectue avec success ....');
          })
        },
        onError: (error:any) =>{
            console.log(error);
        }
        
      }).render(this.paypalElement.nativeElement)
  }

}
