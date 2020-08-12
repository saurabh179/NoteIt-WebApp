package com.example.noteItbackend.db;

import com.example.noteItbackend.model.Note;
import com.example.noteItbackend.model.Notebook;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "noteit.db.recreate", havingValue = "true")
public class DbSeeder implements CommandLineRunner {

    private NotebookRepository notebookRepository;
    private NoteRepository noteRepository;

    public DbSeeder(NotebookRepository notebookRepository,
                    NoteRepository noteRepository) {
        this.notebookRepository = notebookRepository;
        this.noteRepository = noteRepository;
        System.out.println("----");
    }


    @Override
    public void run(String... args) {
        // Remove all existing entities
        this.notebookRepository.deleteAll();
        this.noteRepository.deleteAll();


        // Save a default notebook
        Notebook defaultNotebook = new Notebook("Default");
        this.notebookRepository.save(defaultNotebook);

        Notebook quotesNotebook = new Notebook("Quotes");
        this.notebookRepository.save(quotesNotebook);

        // Save the welcome note
        Note note = new Note("Hello", "Welcome to Note It", defaultNotebook);
        System.out.println(defaultNotebook.getId()+" "+defaultNotebook.getName());
        this.noteRepository.save(note);

        // Save a quote note
        Note quoteNote = new Note("Latin Quote", "Carpe Diem", quotesNotebook);
        System.out.println(quotesNotebook.getId()+" "+quotesNotebook.getName());
        this.noteRepository.save(quoteNote);

        System.out.println("Initialized database");
    }
}
