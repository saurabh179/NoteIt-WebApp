package com.example.noteItbackend.api;

import com.example.noteItbackend.Mapper;
import com.example.noteItbackend.api.viewmodel.NotebookViewModel;
import com.example.noteItbackend.db.NotebookRepository;
import com.example.noteItbackend.model.Notebook;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.ValidationException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notebooks")
@CrossOrigin
public class NotebookController {

    private NotebookRepository notebookRepository;
    private Mapper mapper;

    public NotebookController(NotebookRepository notebookRepository, Mapper mapper) {
        this.notebookRepository = notebookRepository;
        this.mapper = mapper;
    }

    @GetMapping("/all")
    public List<Notebook> all() {
        List<Notebook> allCategories = this.notebookRepository.findAll();
        return allCategories;
    }

    @PostMapping
    public Notebook save(@RequestBody NotebookViewModel notebookViewModel, BindingResult bindingResult) {
        System.out.println("bind k uper");
        if (bindingResult.hasErrors()) {
            System.out.println("bind k under");
            throw new ValidationException();
        }
        System.out.println("bind k neeche");
        Notebook notebookEntity = this.mapper.convertToNotebookEntity(notebookViewModel);

        // save notebookEntity instance to db
        this.notebookRepository.save(notebookEntity);

        return notebookEntity;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        this.notebookRepository.deleteById(UUID.fromString(id));
    }

}
