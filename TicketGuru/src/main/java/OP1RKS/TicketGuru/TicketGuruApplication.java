package OP1RKS.TicketGuru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
			
			Log.info("create SalesEvents");							
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 1, 1, 12, 1), 25.5, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 2, 2, 12, 2), 11.1, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 3, 3, 12, 3), 22.2, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 4, 4, 12, 4), 33.3, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 5, 5, 12, 5), 44.4, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 6, 6, 12, 6), 55.5, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 7, 7, 12, 7), 66.6, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 8, 8, 12, 8), 77.7, false));
						
			Log.info("create Tickets");
			//trepo.save("CODE1", false, 20.0, ttrepo.findById((long) 1).orElse(new TicketType()), erepo.findById((long) 1).orElse(new EventRecord()), srepo.findById((long) 1).orElse(new SalesEvent()) );
			// Tämä ei jostain syystä toimi.
			//trepo.save("CODE01", false, 200.0);
			

			Log.info("create Roles");
			
			Log.info("create Users");
			
			// Check Fake Data
			Log.info("fetch all eventrecords");
			for (EventRecord eventrecord: erepo.findAll()) {
				Log.info("Fetch eventrecord: " + eventrecord.toString());
			}
			Log.info("fetch all tickettypes");
			for (TicketType tickettype: ttrepo.findAll()) {
				Log.info("Fetch tickettype: " + tickettype.toString());
			}
			Log.info("fetch all salesevents");
			for (SalesEvent salesevent: srepo.findAll()) {
				Log.info("Fetch salesevent: " + salesevent.toString());
			}
		};
	}
	
	
}
