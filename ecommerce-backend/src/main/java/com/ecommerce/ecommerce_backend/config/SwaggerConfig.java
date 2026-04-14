package com.ecommerce.ecommerce_backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String BEARER_SCHEME = "bearerAuth";

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Fashion E-Commerce API")
                        .description("""
                                REST API for a handmade & custom fashion e-commerce platform.
                                
                                Features: Hand-painted T-shirts, Embroidered Kurtis, Custom Jeans, and User-designed clothing.
                                
                                Modules: Auth · Users · Products · Cart · Orders · Custom Orders · Reviews · Wishlist · Admin
                                
                                🔐 To use secured endpoints: Login via /api/auth/login → copy token → click Authorize 🔒
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Fashion Store Team")
                                .email("support@fashionstore.com")))
                .addSecurityItem(new SecurityRequirement().addList(BEARER_SCHEME))
                .components(new Components()
                        .addSecuritySchemes(BEARER_SCHEME, new SecurityScheme()
                                .name(BEARER_SCHEME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Enter JWT token obtained from POST /api/auth/login")));
    }
}
