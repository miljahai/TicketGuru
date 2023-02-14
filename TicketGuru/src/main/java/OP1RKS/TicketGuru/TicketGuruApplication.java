package OP1RKS.TicketGuru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalTime;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import OP1RKS.TicketGuru.domain.*;

@SpringBootApplication
public class TicketGuruApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketGuruApplication.class, args);
	}
	
	/*
	// DEMO DATA
	// Logger
	private static final Logger Log = LoggerFactory.getLogger(TicketGuruApplication.class);
	
	@Bean
	public CommandLineRunner demo(EventRecordRepository erepo, RoleRepository rrepo, SalesEventRepository srepo, TicketRepository trepo, TicketTypeRepository ttrepo, UserRepository urepo) {
		return (args) -> {
			// Fake Data for H2
			Log.info("create EventRecords");
			//erepo.save(new EventRecord(null, "Tapahtuma 1",new Date(2023,01,01),new LocalTime(12,0, 0, 0),new LocalTime(14,0,0,0),false));

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
	*/
	
}
