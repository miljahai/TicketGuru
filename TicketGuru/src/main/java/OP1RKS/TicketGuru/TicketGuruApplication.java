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
			erepo.save(new EventRecord("Tapahtuma 1","Paikka 1","Kaupunki 1",100,LocalDateTime.of(2023,1,1,11,11),LocalDateTime.of(2023,1,1,23,23),false));
			erepo.save(new EventRecord("Tapahtuma 2","Paikka 2","Kaupunki 2",200,LocalDateTime.of(2023,2,2,12,22),LocalDateTime.of(2023,2,2,00,24),false));
			erepo.save(new EventRecord("Tapahtuma 3","Paikka 3","Kaupunki 3",300,LocalDateTime.of(2023,3,3,13,33),LocalDateTime.of(2023,3,4,02,06),false));
			erepo.save(new EventRecord("Tapahtuma 4","Paikka 4","Kaupunki 4",400,LocalDateTime.of(2023,4,4,14,44),LocalDateTime.of(2023,4,5,03,28),false));

			Log.info("create TicketTypes");
			ttrepo.save(new TicketType("Aikuinen",20.0,false,erepo.findById((long) 1).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Lapsi",20.0,false,erepo.findById((long) 1).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Eläkeläinen",20.0,false,erepo.findById((long) 1).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Aikuinen",20.0,false,erepo.findById((long) 2).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Lapsi",20.0,false,erepo.findById((long) 2).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Eläkeläinen",20.0,false,erepo.findById((long) 2).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Aikuinen",20.0,false,erepo.findById((long) 3).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Lapsi",20.0,false,erepo.findById((long) 3).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Aikuinen",20.0,false,erepo.findById((long) 3).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Eläkeläinen",20.0,false,erepo.findById((long) 3).orElse(new EventRecord()) ));
			
			Log.info("create Tickets");
			//trepo.save(new Ticket("CODE01",false,20.0,ttrepo.findById((long) 1).orElse(new TicketType()),erepo.findById(1).orElse(new EventRecord()));

			Log.info("create SalesEvents");							
			//srepo.save(new SalesEvent());

			Log.info("create Roles");
			
			Log.info("create Users");
			
			// Check Fake Data
			Log.info("fetch all eventrecords");
			for (EventRecord eventrecord: erepo.findAll()) {
				Log.info("Fetch eventrecord: " + eventrecord.toString());
			}
		};
	}
	
	
}
