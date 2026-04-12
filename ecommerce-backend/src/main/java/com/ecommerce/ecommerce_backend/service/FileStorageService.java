package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.exception.BadRequestException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(Paths.get(uploadDir));
    }

    /**
     * Stores file locally. Replace this method body with S3 upload logic when migrating to AWS S3.
     * @return public URL/path of the stored file
     */
    public String store(MultipartFile file) {
        if (file.isEmpty()) throw new BadRequestException("File is empty");
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        try {
            Path target = Paths.get(uploadDir).resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            log.info("Stored file: {}", filename);
            return "/api/files/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    public byte[] load(String filename) {
        try {
            return Files.readAllBytes(Paths.get(uploadDir).resolve(filename));
        } catch (IOException e) {
            throw new ResourceNotFoundException("File not found: " + filename);
        }
    }

    private static class ResourceNotFoundException extends RuntimeException {
        ResourceNotFoundException(String msg) { super(msg); }
    }
}
