package Proyect_prueba.demo.DTO.Usuario;

import lombok.Data;

@Data
public class EditarUsuarioDTO {
    
    private String nombre;
    
    private String apellido;

    private String password;

    private boolean estado = true;

}
