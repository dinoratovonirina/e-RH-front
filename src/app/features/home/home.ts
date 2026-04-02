import { Component } from '@angular/core';
import { Navbar } from "../../shared/components/navbar/navbar/navbar";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [Navbar],
})
export class Home {}