package Proyect_prueba.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Proyect_prueba.demo.Models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByNombre(String nombre);

    List<Usuario> findByApellido(String apellido);
    
    List<Usuario> findByEstado(boolean estado);

}
