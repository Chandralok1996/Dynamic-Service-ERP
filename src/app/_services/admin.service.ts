import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'

})

export class AdminService {
public selectedData:any;
//private apiUrl = 'qrCode/getFormDetails';
  constructor( private _http: HttpClient, private _cookie: CookieService ) {}

  getFormList(): Observable<any> {
    return this._http.get<any>( `${environment._url}/formTemplate/getFormList` );
  }

  getFormByID(fmls_id: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/formTemplate/getFormDetails/${fmls_id}` );
  }
  // getFormByIDForQR(fmls_id: number): Observable<any> {
  //  return this._http.get<any>(`${environment._url}/${this.apiUrl}/${fmls_id}`);
  // }
  addColumnInForm(data: any): Observable<any> {
    return this._http.post<any>( `${environment._url}/formTemplate/addColumn`, data );
  }

  updateColumnInForm(data: any): Observable<any> {
    return this._http.put<any>( `${environment._url}/formTemplate/updateColumn`, data );
  }

  installationcreate(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/user/createUser`,
      data,
      httpOptions
    );
  }
  updateuser(data:any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.put<any[]>(
      `${environment._url}/user/updateUser`,
      data,
      httpOptions
    );
  }
  userlist():Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),

    };
    return this._http.get<any>( `${environment._url}/user/getUserList`,
    httpOptions
     );

  }
  getuserdetails(userid: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/user/getUserDetails/${userid}` );
  }

  //Asset - Module
  itemCreate(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/assets/createAsset`,
      data,
      httpOptions
    );
  }
  resetUserPassword(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({'auth-token': JSON.parse(localStorage.getItem('user') || '').token, 'Content-Type': 'application/json'})};
    return this._http.put<any[]>(`${environment._url}/user/updatepassword`, data, httpOptions);
  }
//To create master data
  createMasterData(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({'auth-token': JSON.parse(localStorage.getItem('user') || '').token, 'Content-Type': 'application/json'})};
    return this._http.post<any[]>(`${environment._url}/formTemplate/createMaster`, data, httpOptions);
  }

  //To update master data
  updateMasterData(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({'auth-token': JSON.parse(localStorage.getItem('user') || '').token, 'Content-Type': 'application/json'})};
    return this._http.put<any[]>(`${environment._url}/formTemplate/updateMaster`, data, httpOptions);
  }
  itemList():Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.get<any>( `${environment._url}/assets/getAssetList`,
    httpOptions
     );
  }

  getItemdetails(astd_id: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/assets/getAssetDetails/${astd_id}`);
  }
  

  //get ticket details
  getIncidentdetailsForUpdatebyId(inid_id: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/incident/getIncidentDetails/${inid_id}`);
  }
    //get ticket details for update
    getIncidentdetailsbyId(inid_id: number): Observable<any> {
      return this._http.get<any>( `${environment._url}/incident/getIncidentDetailsUpdate/${inid_id}`);
    }
 //get housekeeping ticket details for update
  getHousekeepingIncidentdetailsForUpdate(hksd_id: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/houseKeeping/getHksDetails/${hksd_id}`);
 
  }
    //get housekeeping ticket details
   getHousekeepingIncidentdetailsbyId(hksd_id: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/houseKeeping/getHksDetailsUpdate/${hksd_id}`);
  }
  //get hr service ticket details for update
  getHRServiceIncidentdetailsbyIdForUpdate(hrsd_id: number): Observable<any> {
    return this._http.get<any>( `${environment._url}/hrService/getHrServiceDetails/${hrsd_id}`);
  }

  //Update housekeeping incident
  updateHousekeepingIncident(data: any): Observable<any> {
    return this._http.put<any>( `${environment._url}/houseKeeping/updateHks`, data );
  }
 
    //get hr service ticket details
    getHRServiceIncidentdetailsbyId(hrsd_id: number): Observable<any> {
      return this._http.get<any>( `${environment._url}/hrService/getHrServiceDetailsUpdate/${hrsd_id}`);
    }
 
  updateItem(astd_id:any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.put<any[]>(
      `${environment._url}/assets/updateAsset`,
      astd_id,
      httpOptions
    );
  }

   //module-Link
  createLink(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/formTemplate/createFormLink`,
      data,
      httpOptions
    );
  }
 linkList(fmls_id:any):Observable<any>
  {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.get<any>( `${environment._url}/formTemplate/getLinkedFormList/${fmls_id}`,
    httpOptions
     );
  }
//incident list
incidentList(status:any):Observable<any>
{
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.get<any>(`${environment._url}/incident/getIncidentList?status=${status}`,
  httpOptions
   );
}
// http://172.16.15.22:6714/incident/getIncidentList?status=Opened
  orgFiledPrivilege(data: any): Observable<any> {
    return this._http.post<any>( `${environment._url}/formTemplate/createFormFieldOrgAccess`, data );
  }
  
  applyFormprevilenge(data: any): Observable<any> {
    return this._http.post<any>( `${environment._url}/formTemplate/createFormOrgAccess`, data );
  }

  //crete ticket for end user
incidentCreate(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/incident/createIncident`,
    data,   
    httpOptions
  );
}
//create ticket for house keeping user
incidentCreateForHousekeeping(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/houseKeeping/createHks`,
    data,   
    httpOptions
  );
}

//update incident
incidentUpdate(data: any): Observable<any> {
  return this._http.put<any>( `${environment._url}/incident/updateIncident`, data );
}
  //role-create
  createRole(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/user/createUser`,
      data,
      httpOptions
    );
  }

  //create organization
   createOrganization(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
        'Content-Type': 'application/json'
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/formTemplate/createOrg`,
      data,
      httpOptions
    );
  }
 
  applyprevilenge(data: any): Observable<any> {
    return this._http.post<any>( `${environment._url}/formTemplate/createFormFieldAccess`, data );
  }
getcilist():Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.get<any>( `${environment._url}/ci/getConfigItemList`,
    httpOptions
     );
  }
  getconfigdetails(cicd_id: number): Observable<any> {
    return this._http.get<any>(`${environment._url}/ci/getConfigItemDetails/${cicd_id}`);
  }
  //get Organization List
getOrgList(): Observable<any> {
  return this._http.get<any>( `${environment._url}/formTemplate/getOrgList`);
}
//create config
configCreate(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/ci/createConfigItem`,
    data,
    httpOptions
  );
}
getLinkFormList():Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.get<any>( `${environment._url}/formTemplate/getAllLinkedForms`,
    httpOptions
     );
  }
getData(){
return this.selectedData;
}
setData(data:any){
  this.selectedData = data;
}
getapprovalListDetails():Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.get<any>( `${environment._url}/approval/getDropDownList`,
    httpOptions
     );
  }

  //getApprovalList
  // getapprovalList():Observable<any>
  // {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
  //     }),
  //   };
  //   return this._http.get<any>( `${environment._url}/approval/getApprovalList`,
  //   httpOptions
  //    );
  // }
 
  //request approval approval
    approval(data: any): Observable<any[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
        }),
      };
      return this._http.put<any[]>(
        `${environment._url}/approval/ApproveRequest`,
        data,
        httpOptions
      );
    }

  getapprovalsList(): Observable<any> {
      return this._http.get<any>(`${environment._url}/approval/getApprovalsList`);
    }
  getapprovalList(): Observable<any> {
    return this._http.get<any>( `${environment._url}/approval/getApprovalList/`);
  }
  //Create approval
createApproval(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/approval/createApproval`,
    data,
    httpOptions
  );
}
//Create approver

 createApprover(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/approval/addApprover`,
    data,
    httpOptions
  );
}
updateApproval(data: any): Observable<any> {
  return this._http.put<any>( `${environment._url}/approval/updateApproval`, data );
}
updateApprover(data: any): Observable<any> {
  return this._http.put<any>( `${environment._url}/approval/updateApprover`, data );
}
//delete approval
deleteApproval(data: any): Observable<any> {
  return this._http.put<any>( `${environment._url}/approval/deleteApproval`, data );
}

//delete approver
deleteApprover(apprv_id:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
    };
  return this._http.delete<any>(`${environment._url}/approval/deleteApprover/${apprv_id}`,
  httpOptions)
} 
getApprovaldetails(appr_id: number): Observable<any> {
  return this._http.get<any>(`${environment._url}/approval/getApprovalDetails/${appr_id}`);
}
getApprovalMailTempDetails(apprv_id: number, lble_id: number): Observable<any> {
  return this._http.get<any>(`${environment._url}/approval/getTemplateDetails/${apprv_id}/${lble_id}`);
}
//get incident Details
getIncidentDetails(inid_id: any): Observable<any> {
  return this._http.get<any>(`${environment._url}/incident/getIncidentDetails/${inid_id}`);
}
//add template
addTemplate(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/approval/addTemplate`,
    data,
    httpOptions
  );
}

//add id based linking
addIDBasedLinking(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/formTemplate/createIdBasedLinking`,
    data,
    httpOptions
  );
}
//get id based linking
getIDBasedLinking(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/formTemplate/getIdBsdLinkedFormList`,
    data,
    httpOptions
  );
}
//update configuration item
updateCI(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.put<any[]>(
    `${environment._url}/ci/updateConfigItem`,
    data,
    httpOptions
  );
}

//update template
updateTemplate(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.put<any[]>(
    `${environment._url}/approval/updateTemplate`,
    data,
    httpOptions
  );
}

//get QR code Location List
getQRCodeLocation(): Observable<any> {
  return this._http.get<any>( `${environment._url}/qrCode/getQrLocationList` );
}
//create incident by qr code
createIncidentByQRCode(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
    //  'Content-Type': 'application/json'
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/qrCode/createHks`,
    data,
    httpOptions
  );
}
//get linked form list for  QR code ticket creation
getdropdownLinkedList(): Observable<any> {
    return this._http.get<any>( `${environment._url}/qrCode/getDropdownLinkedFormList` );
  }
  //get linked form list for housekeeping ticket creation
getdropdownLinkedListForHousekeeping(): Observable<any> {
  return this._http.get<any>( `${environment._url}/formTemplate/getDropdownLinkedFormList` );
}
//get linked form list by id for qr code ticket creation
getIDBasedLinkingForQRCode(fmls_id: any): Observable<any[]> {
  return this._http.get<any>(`${environment._url}/qrCode/getLinkedFormList/${fmls_id}`);
}
//get housekeeping related tickets
getHouseKeepingTickets(status:any): Observable<any> {
  return this._http.get<any>( `${environment._url}/houseKeeping/getHkList?status=${status}`);
}
//get housekeeping tickets for QR code
getHouseKeepingTicketsForQR(): Observable<any> {
  return this._http.get<any>( `${environment._url}/qrCode/getHkList`);
}
//get HR service tickets 
getHRServiceTicketList(status:any): Observable<any> {
  return this._http.get<any>(`${environment._url}/hrService/getHrServiceList?status=${status}`);
}
  //create HR Service Ticket
  createHRIncident(data: any): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
      }),
    };
    return this._http.post<any[]>(
      `${environment._url}/hrService/createHrs`,
      data,
      httpOptions
    );
  }
 //Update HR Incident
 //update template
updateHRIncident(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.put<any[]>(
    `${environment._url}/hrService/updateHrs`,
    data,
    httpOptions
  );
}
//get itsm tickets report
getIncidentReport(days:any): Observable<any> {
  return this._http.get<any>( `${environment._url}/dashboard/getReport/${days}`);
}
//create service as ci
createCIService(data: any): Observable<any[]> {
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.post<any[]>(
    `${environment._url}/ci/createServices`,
    data,
    httpOptions
  );
}
//get service details
getServiceDetails(srvd_id:any): Observable<any> {
  return this._http.get<any>( `${environment._url}/ci/getServicesDetails/${srvd_id}`);
}
//getServiceList
getServiceList(): Observable<any> {
  return this._http.get<any>( `${environment._url}/ci/getServicesList`);
}
//get it support user list
getITSupportUserList(): Observable<any> {
  return this._http.get<any>( `${environment._url}/incident/getAssignToList`);
}
//get housekeeping user list
getHousekeepingUserList(): Observable<any> {
  return this._http.get<any>( `${environment._url}/houseKeeping/getAssignToList`);
}
//get HR user list
getHRUserList(): Observable<any> {
  return this._http.get<any>( `${environment._url}/hrService/getAssignToList`);
}
getReportData(type:any,days:any,sDate:any,eDate:any):Observable<any>
{
  const httpOptions = {
    headers: new HttpHeaders({
      'auth-token': JSON.parse(localStorage.getItem('user') || '').token,
    }),
  };
  return this._http.get<any>(`${environment._url}/dashboard/getTicketReport?type=${type}&days=${days}&sDate=${sDate}&eDate=${eDate}`,
  httpOptions
   );
}
//get ticket list by filter
getTicketListOnFilter(status:any,days:any,sDate:any,eDate:any,type:any): Observable<any> {
  return this._http.get<any>( `${environment._url}/formTemplate/getTicketsList?status=${status}&days=${days}&sDate=${sDate}&eDate=${eDate}&type=${type}`);
}
}


