package Proyect_prueba.demo.DTO.Usuario;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Data
@JsonPropertyOrder({ "id", "nombre", "apellido", "estado" })
public class UsuarioDTO {

    private Long id;
    private String nombre;
    private String apellido;
    private boolean estado;
}
