package Proyect_prueba.demo;



import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import Proyect_prueba.demo.Models.Usuario;
import Proyect_prueba.demo.Repository.UsuarioRepository;


@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UsuarioRepository usuarioRepository,BCryptPasswordEncoder passwordEncoder)
	{
		return args -> 
		{

			if(usuarioRepository.findByNombre("admin").isEmpty()){
					Usuario usuario = new Usuario();
					usuario.setNombre("admin");
					usuario.setPassword(passwordEncoder.encode("admin"));
					usuario.setEstado(true);

					usuarioRepository.save(usuario);

					System.out.println("Usuario admin creado");
				}
				else{
					System.out.println("Usuario ya existe");
				}
		};
    }
}
