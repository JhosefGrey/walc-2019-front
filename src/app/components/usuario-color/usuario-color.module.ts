import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioColorRoutingModule } from './usuario-color-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsuarioColorRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class UsuarioColorModule { }
