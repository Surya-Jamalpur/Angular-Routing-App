import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit:boolean = false;

  constructor(private serversService: ServersService, private currentRoute:ActivatedRoute) { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    console.log(this.currentRoute.snapshot.queryParams);
    console.log(this.currentRoute.snapshot.fragment);

    this.currentRoute.queryParams
    .subscribe(
      (qprms:Params) => {
        this.allowEdit = qprms['allowEdit'] === '1' ? true : false;
      }
    )
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
