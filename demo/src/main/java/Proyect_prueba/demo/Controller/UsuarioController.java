package Proyect_prueba.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Proyect_prueba.demo.DTO.Usuario.CrearUsuarioDTO;
import Proyect_prueba.demo.DTO.Usuario.LoginDTO;
import Proyect_prueba.demo.DTO.Usuario.LoginResponseDTO;
import Proyect_prueba.demo.DTO.Usuario.UsuarioDTO;
import Proyect_prueba.demo.DTO.Usuario.UsuarioRequestDTO;
import Proyect_prueba.demo.Models.Usuario;
import Proyect_prueba.demo.service.UsuarioService;

@RestController
@RequestMapping("/demoAPI/usuarios")
@CrossOrigin("*")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/Usuarios")
    public ResponseEntity<?> listarusuarios()
    {
        List<UsuarioDTO> lista = usuarioService.findAll();

        if(lista.isEmpty()){
            return ResponseEntity.badRequest().body("No existen Usuarios");
        }
        return ResponseEntity.ok(lista);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        try{
            LoginResponseDTO reponse = usuarioService.login(loginDTO);
            return ResponseEntity.ok(reponse);
        }
        catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/NombrePorUsuario")
    public ResponseEntity<?> obtenerUsuarioPorNombre(@RequestBody UsuarioRequestDTO  usuarioResponseDTO)
    {
       try{
            Usuario usuario = usuarioService.obtenerPorNombre(usuarioResponseDTO.getNombre());

            UsuarioDTO response = new UsuarioDTO();
            response.setId(usuario.getId());
            response.setNombre(usuario.getNombre());
            response.setApellido(usuario.getApellido());
            response.setEstado(usuario.isEstado());

            return ResponseEntity.ok(response);
        }
       catch(Exception ex){
        return ResponseEntity.badRequest().body(ex.getMessage());
       }
    }

    @PostMapping("/CrearUsuario")
    public Usuario crearUsuario(@RequestBody CrearUsuarioDTO dto )
    {
        return usuarioService.crearUsuario(dto);
    }
    
}
