import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../Services/data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-diary-entry',
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.css']
})
export class DiaryEntryComponent implements OnInit {

  @Input() diary: any;
  @Output() ondelete = new EventEmitter();

  constructor(private diaryService: DataService ,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  deleteEntry(id: any) {
    this.diaryService.delete(id).subscribe(res => {
      this.ondelete.emit();
    });
  }

  getImgUrl(diary: any) {
    let imgData = diary?.pictures[0]?.photoData
    if (imgData)
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + imgData);
    else
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYWuhcxmhBdb1B2vXhXAGAFn-XdyyUmQFfQw&usqp=CAU'; //default img 
  }
}


