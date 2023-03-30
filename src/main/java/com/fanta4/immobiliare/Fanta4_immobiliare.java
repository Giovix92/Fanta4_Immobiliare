package com.fanta4.immobiliare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class Fanta4_immobiliare {

    public static void main(String[] args) {
        SpringApplication.run(Fanta4_immobiliare.class, args);
    }

}
