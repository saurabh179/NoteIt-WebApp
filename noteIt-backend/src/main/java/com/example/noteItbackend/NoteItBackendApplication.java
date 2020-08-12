package com.example.noteItbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class NoteItBackendApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(NoteItBackendApplication.class, args);
	}

}
