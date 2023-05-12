package com.fanta4.immobiliare.controller.api;

import com.fanta4.immobiliare.persistence.model.Images;
import com.fanta4.immobiliare.service.ImagesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImagesController {
    private final ImagesService i;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void createImage(@RequestBody Images image) {
        i.createImage(image);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Images> findByID(@PathVariable Integer id) {
        return i.getByID(id);
    }

    @GetMapping("/findByImmobile/{immobileID}")
    public ResponseEntity<List<Images>> findByImmobileID(@PathVariable Integer immobileID) {
        return i.getImagesByImmobileID(immobileID);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Object> deleteImage(@PathVariable Integer id) {
        return i.deleteByID(id);
    }
}
