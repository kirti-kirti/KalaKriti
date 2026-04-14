package com.ecommerce.ecommerce_backend.service;

import com.ecommerce.ecommerce_backend.exception.BadRequestException;
import com.ecommerce.ecommerce_backend.exception.ResourceNotFoundException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif"
    );

    @Value("${app.upload.dir}")
    private String uploadDir;

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(Paths.get(uploadDir));
        log.info("Upload directory initialized: {}", uploadDir);
    }

    /**
     * Stores file locally.
     * To migrate to AWS S3: replace body with s3Client.putObject(bucket, key, file.getInputStream())
     * and return the S3 public URL.
     */
    public String store(MultipartFile file) {
        if (file.isEmpty()) throw new BadRequestException("File is empty");
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new BadRequestException("Only JPEG, PNG, WEBP, and GIF images are allowed");
        }
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        try {
            Path target = Paths.get(uploadDir).resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            log.info("File stored: {}", filename);
            return "/api/files/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage(), e);
        }
    }

    public byte[] load(String filename) {
        try {
            Path file = Paths.get(uploadDir).resolve(filename).normalize();
            return Files.readAllBytes(file);
        } catch (IOException e) {
            throw new ResourceNotFoundException("File not found: " + filename);
        }
    }
}
