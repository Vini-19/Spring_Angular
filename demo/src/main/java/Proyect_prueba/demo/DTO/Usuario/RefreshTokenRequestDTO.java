package Proyect_prueba.demo.DTO.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RefreshTokenRequestDTO {
    private String refreshToken;
}