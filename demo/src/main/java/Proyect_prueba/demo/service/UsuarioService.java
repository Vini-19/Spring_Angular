package Proyect_prueba.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import Proyect_prueba.demo.DTO.Usuario.CrearUsuarioDTO;
import Proyect_prueba.demo.DTO.Usuario.LoginDTO;
import Proyect_prueba.demo.DTO.Usuario.LoginResponseDTO;
import Proyect_prueba.demo.DTO.Usuario.UsuarioDTO;
import Proyect_prueba.demo.Models.Usuario;
import Proyect_prueba.demo.Repository.UsuarioRepository;
import Proyect_prueba.demo.Security.JwtService;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public LoginResponseDTO login(LoginDTO loginDTO) {
        Usuario usuario = usuarioRepository.findByNombre(loginDTO.getNombre())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.isEstado()) {
            throw new RuntimeException("Usuario inactivo");
        }
 
        if (!passwordEncoder.matches(loginDTO.getPassword(),usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtService.generateToken(usuario);

        return new LoginResponseDTO(token, usuario.getNombre());
    }


    public Usuario obtenerPorNombre(String nombre)
    {
        return usuarioRepository.findByNombre(nombre).orElseThrow(
            () -> new RuntimeException("Usuario No encontrado"));
    }


    public List<UsuarioDTO> findAll() {
        
        List<Usuario> usuarios = usuarioRepository.findAll();

        return usuarios.stream().map(usuario -> {
            UsuarioDTO dto = new UsuarioDTO();
            dto.setId(usuario.getId());
            dto.setNombre(usuario.getNombre());
            dto.setApellido(usuario.getApellido());
            dto.setEstado(usuario.isEstado());
            return dto;
        }).toList();
    }

    public Usuario crearUsuario(CrearUsuarioDTO dto){
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        String passwordEncriptada = passwordEncoder.encode(dto.getPassword());
        usuario.setPassword(passwordEncriptada);
        usuario.setEstado(dto.isEstado());
        return usuarioRepository.save(usuario);
    }

}
