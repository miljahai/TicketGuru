package OP1RKS.TicketGuru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;  

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import OP1RKS.TicketGuru.domain.*;

@SpringBootApplication
public class TicketGuruApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketGuruApplication.class, args);
	}
	
    DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");  
	
	// DEMO DATA
	// Logger
	private static final Logger Log = LoggerFactory.getLogger(TicketGuruApplication.class);
	
	@Bean
	public CommandLineRunner demo(EventRecordRepository erepo, UserRoleRepository rrepo, SalesEventRepository srepo, TicketRepository trepo, TicketTypeRepository ttrepo, AppUserRepository urepo) {
		return (args) -> {
			// Fake Data for H2
			Log.info("create EventRecords");
			erepo.save(new EventRecord("Tapahtuma 1",LocalDateTime.of(2023,2,2,19,00),LocalDateTime.of(2023,2,2,23,30),false));
			erepo.save(new EventRecord("Tapahtuma 2",LocalDateTime.of(2023,3,3,16,00),LocalDateTime.of(2023,3,3,19,30),false));
			erepo.save(new EventRecord("Tapahtuma 3",LocalDateTime.of(2023,4,4,00,00),LocalDateTime.of(2023,4,5,23,55),false));

			Log.info("create Roles");
			
			

			Log.info("create SalesEvents");
			
			

			Log.info("create Tickets");
			
			

			Log.info("create TicketTypes");
			
			

			Log.info("create Users");
			
			// Check Fake Data
			Log.info("fetch all eventrecords");
			for (EventRecord eventrecord: erepo.findAll()) {
				Log.info("Fetch eventrecord: " + eventrecord.toString());
			}
		};
	}
	
	
}
