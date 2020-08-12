import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { ApiService } from '../shared/api.service';
import { Note } from './model/note';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

   notebooks : Notebook[] = [];
   notes : Note[] = [];
   selectedNotebook: Notebook;
   searchText: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks() {
    let url = 'http://localhost:8082/api/notebooks/all';
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
        console.log('get all notebook successfully!!');
      },
      err=>{
        alert('Error occured while getting all notebooks');
      }
    )
  }

  public createNotebook() {
    let notebook : Notebook = {
      name:'New Notebook',
      id:null,
      nbOfNotes:0
     };
     this.apiService.postNotebook(notebook).subscribe(
       res=>{
         notebook.id = res.id;
         this.notebooks.push(notebook);
       },
       err=> {
         alert('Error occured during creating new notebook');
       }
     );
  }

  public updateNotebook(updateNotebook:Notebook){
    this.apiService.postNotebook(updateNotebook).subscribe(
      res=>{ },
      err=>{
        alert("Error ouccured while updating notebook");
      }
    );
  }

  public deleteNotebook(notebook : Notebook){
    if(confirm('Are you sure you want to delete this notebook?')){
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res=> { 
          let indexOfDeletedNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfDeletedNotebook,1);
        },
        err => {
          alert("Error while deleting this notebook");
        }
      )
    }
  }

  public getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res=> {
        this.notes = res;
      },
      err => {
        alert('Error occured while loading all notes');
      }
    )
  }

  public deleteNote(note: Note){
    if(confirm("Are you sure you want to delete this note?")){
      this.apiService.deleteNote(note.id).subscribe(
        res =>{
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err=>{alert("An error has occurred deleting the note");}
      );
    }
  }

  public createNote(notebookId:string){
    let newNote : Note = {
      id: null,
      title : "New title",
      text : "Write some text here",
      lastModifiedOn : null,
      notebookId : notebookId
    };
    this.apiService.saveNote(newNote).subscribe(
      res=> {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      err => {
        alert("Error occured while adding new note");
      }
    )
  }

  selectNotebook(notebook: Notebook) {
    this.selectedNotebook = notebook;
    this.apiService.getAllNotesByNotebookId(notebook.id).subscribe(
      res=> {
        this.notes = res;
      },
      err =>{alert("An error has occurred while downloading the notes;")}
    );
  }

  updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {
      },
      err => {alert("An error occurred while saving the note");}
    );
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }

}
