import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../notes/model/notebook';
import { FeedbackViewModel } from '../feedback/feedback.component';
import { Note } from '../notes/model/note';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = window["cfgApiBaseUrl"] + "/api";
  private GET_ALL_NOTEBOOKS = `${this.BASE_URL}\\notebooks\\all`;
  private SEND_FEEDBACK = `${this.BASE_URL}\\feedback`;
  private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}\\notebooks`;
  private DELETE_NOTEBOOK = `${this.BASE_URL}\\notebooks\\`;
  private GET_ALL_NOTES = `${this.BASE_URL}\\notes\\all`;
  private GET_ALL_NOTES_BY_NOTEBOOK_ID = `${this.BASE_URL}\\notes\\byNotebook\\`;
  private SAVE_NEW_NOTE = `${this.BASE_URL}\\notes`;
  private DELETE_NOTE_URL = `${this.BASE_URL}\\notes\\`;

  constructor(private httpClient: HttpClient) { }

  getAllNotebooks() : Observable<Notebook[]>{
    return this.httpClient.get<Notebook[]>(this.GET_ALL_NOTEBOOKS);
  }

  sendFeedback(feedback : FeedbackViewModel) : Observable<any>{
    return this.httpClient.post(this.SEND_FEEDBACK,feedback);
  }

  postNotebook(notebook : Notebook) : Observable<Notebook>{
    return this.httpClient.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK,notebook);
  }

  deleteNotebook(id:string) : Observable<any>{
    return this.httpClient.delete(this.DELETE_NOTEBOOK + id);
  }

  getAllNotes() : Observable<Note[]>{
    return this.httpClient.get<Note[]>(this.GET_ALL_NOTES);
  }

  getAllNotesByNotebookId(notebookId : string) : Observable<Note[]>{
    return this.httpClient.get<Note[]>(this.GET_ALL_NOTES_BY_NOTEBOOK_ID + notebookId);
  }

  saveNote(note : Note) : Observable<Note> {
    return this.httpClient.post<Note>(this.SAVE_NEW_NOTE, note);
  }

  deleteNote(noteId:string):Observable<any>{
    return this.httpClient.delete(this.DELETE_NOTE_URL + noteId);
  }
}
