package Proyect_prueba.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import Proyect_prueba.demo.DTO.Usuario.CrearUsuarioDTO;
import Proyect_prueba.demo.DTO.Usuario.EditarUsuarioDTO;
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
            throw new RuntimeException("Usuario deshabilitado para el ingreso");
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String accessToken = jwtService.generateAccessToken(usuario);
        String refreshToken = jwtService.generateRefreshToken(usuario);

        return new LoginResponseDTO(accessToken, refreshToken, usuario.getNombre());
    }

    public List<UsuarioDTO> BuscarUsuario(String nombre, String apellido) {
        List<Usuario> usuarios = usuarioRepository
                .findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(nombre, apellido);
        if (usuarios.isEmpty()) {
            throw new RuntimeException("Usuario No encontrado");
        }
        return usuarios.stream().map(usuario -> {
            UsuarioDTO dto = new UsuarioDTO();
            dto.setId(usuario.getId());
            dto.setNombre(usuario.getNombre());
            dto.setApellido(usuario.getApellido());
            dto.setEstado(usuario.isEstado());
            return dto;
        }).toList();
    }

    public UsuarioDTO obtenerUsuarioPorId(long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setEstado(usuario.isEstado());
        return dto;
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

    public Usuario crearUsuario(CrearUsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        String passwordEncriptada = passwordEncoder.encode(dto.getPassword());
        usuario.setPassword(passwordEncriptada);
        usuario.setEstado(dto.isEstado());
        return usuarioRepository.save(usuario);
    }

    public Usuario EditarUsuario(Long id, EditarUsuarioDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setNombre(dto.getNombre());
        // verificacion del la contrasena nueva para editar si es nueva para encriptar
        // si no seguira igual
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return usuarioRepository.save(usuario);
    }

    public Usuario DesactivarUsuario(Long id, boolean estado) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setEstado(estado);

        return usuarioRepository.save(usuario);
    }

    public Usuario obtenerEntidadPorNombre(String nombre) {
        return usuarioRepository.findByNombre(nombre)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
