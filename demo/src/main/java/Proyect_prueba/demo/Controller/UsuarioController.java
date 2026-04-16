package Proyect_prueba.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Proyect_prueba.demo.DTO.Usuario.CrearUsuarioDTO;
import Proyect_prueba.demo.DTO.Usuario.EditarUsuarioDTO;
import Proyect_prueba.demo.DTO.Usuario.LoginDTO;
import Proyect_prueba.demo.DTO.Usuario.LoginResponseDTO;
import Proyect_prueba.demo.DTO.Usuario.RefreshTokenRequestDTO;
import Proyect_prueba.demo.DTO.Usuario.RefreshTokenResponseDTO;
import Proyect_prueba.demo.DTO.Usuario.UsuarioDTO;
import Proyect_prueba.demo.Models.Usuario;
import Proyect_prueba.demo.Security.JwtService;
import Proyect_prueba.demo.service.UsuarioService;

@RestController
@RequestMapping("/demoAPI/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/Usuarios")
    public ResponseEntity<?> listarusuarios() {
        List<UsuarioDTO> lista = usuarioService.findAll();

        if (lista.isEmpty()) {
            return ResponseEntity.badRequest().body("No existen Usuarios");
        }
        return ResponseEntity.ok(lista);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            LoginResponseDTO reponse = usuarioService.login(loginDTO);
            return ResponseEntity.ok(reponse);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestDTO dto) {
        try {
            String refreshToken = dto.getRefreshToken();

            String username = jwtService.extractUsername(refreshToken);

            Usuario usuario = usuarioService.obtenerEntidadPorNombre(username);

            if (!jwtService.isRefreshToken(refreshToken) || !jwtService.isTokenValid(refreshToken, usuario)) {
                return ResponseEntity.badRequest().body("Refresh token inválido");
            }

            String newAccessToken = jwtService.generateAccessToken(usuario);

            return ResponseEntity.ok(new RefreshTokenResponseDTO(newAccessToken));

        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Refresh token inválido o expirado");
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscar(@RequestParam(required = false) String nombre,
            @RequestParam(required = false) String apellido) {
        try {
            List<UsuarioDTO> usuarios = usuarioService.BuscarUsuario(nombre, apellido);
            return ResponseEntity.ok(usuarios);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(usuarioService.obtenerUsuarioPorId(id));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/CrearUsuario")
    public Usuario crearUsuario(@RequestBody CrearUsuarioDTO dto) {
        return usuarioService.crearUsuario(dto);
    }

    @PutMapping("editar/{id}")
    public Usuario editar(@PathVariable Long id, @RequestBody EditarUsuarioDTO dto) {
        return usuarioService.EditarUsuario(id, dto);
    }

    @PatchMapping("desactivar/{id}")
    public Usuario DesactivarUsuario(@PathVariable Long id, @RequestParam boolean estado) {
        return usuarioService.DesactivarUsuario(id, estado);
    }

}
