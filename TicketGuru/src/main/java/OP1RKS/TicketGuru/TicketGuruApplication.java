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
	public CommandLineRunner demo(EventRecordRepository erepo, UserRoleRepository rrepo, SalesEventRepository srepo, TicketRepository tickets, TicketTypeRepository ttrepo, AppUserRepository urepo) {
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
			ttrepo.save(new TicketType("Aikuinen",20.0,false,erepo.findById((long) 4).orElse(new EventRecord()) ));
			ttrepo.save(new TicketType("Eläkeläinen",20.0,false,erepo.findById((long) 4).orElse(new EventRecord()) ));
			
			Log.info("create SalesEvents");							
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 1, 1, 12, 1), 25.5, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 2, 2, 12, 2), 11.1, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 3, 3, 12, 3), 22.2, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 4, 4, 12, 4), 33.3, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 5, 5, 12, 5), 44.4, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 6, 6, 12, 6), 55.5, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 7, 7, 12, 7), 66.6, false));
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 8, 8, 12, 8), 77.7, false));			
			srepo.save(new SalesEvent(LocalDateTime.of(2023, 9, 9, 12, 9), 88.8, false));
						
			Log.info("create Tickets");
			// Tämä ei jostain syystä toimi:
			//tickets.save("CODE1", false, 20.0, ttrepo.findById((long) 1).orElse(new TicketType()), erepo.findById((long) 1).orElse(new EventRecord()), srepo.findById((long) 1).orElse(new SalesEvent()) );
			//tickets.save("CODE01", false, 200.0);

			// Mutta tämä toimii:
			// (Muutin trepo ticketsiksi testaillessa. Sen voi muuttaa takaisin.)			
			Ticket newTicket1 = new Ticket();
			newTicket1.setTicket_code("CODE01");
			newTicket1.setDeleted(false);
			newTicket1.setPrice(200.0);
			newTicket1.setTicketType(ttrepo.findById((long) 1).orElse(new TicketType()));
			newTicket1.setEventRecord(erepo.findById((long) 1).orElse(new EventRecord()));
			newTicket1.setSalesEvent(srepo.findById((long) 1).orElse(new SalesEvent()));
			tickets.save(newTicket1);
			Ticket newTicket2 = new Ticket();
			newTicket2.setTicket_code("CODE02");
			newTicket2.setDeleted(false);
			newTicket2.setPrice(250.0);
			newTicket2.setTicketType(ttrepo.findById((long) 2).orElse(new TicketType()));
			newTicket2.setEventRecord(erepo.findById((long) 1).orElse(new EventRecord()));
			newTicket2.setSalesEvent(srepo.findById((long) 2).orElse(new SalesEvent()));
			tickets.save(newTicket2);
			Ticket newTicket3 = new Ticket();
			newTicket3.setTicket_code("CODE01");
			newTicket3.setDeleted(false);
			newTicket3.setPrice(200.0);
			newTicket3.setTicketType(ttrepo.findById((long) 1).orElse(new TicketType()));
			newTicket3.setEventRecord(erepo.findById((long) 1).orElse(new EventRecord()));
			newTicket3.setSalesEvent(srepo.findById((long) 3).orElse(new SalesEvent()));
			tickets.save(newTicket3);
			Ticket newTicket4 = new Ticket();
			newTicket4.setTicket_code("CODE03");
			newTicket4.setDeleted(false);
			newTicket4.setPrice(50.70);
			newTicket4.setTicketType(ttrepo.findById((long) 6).orElse(new TicketType()));
			newTicket4.setEventRecord(erepo.findById((long) 2).orElse(new EventRecord()));
			newTicket4.setSalesEvent(srepo.findById((long) 4).orElse(new SalesEvent()));
			tickets.save(newTicket4);
			Ticket newTicket5 = new Ticket();
			newTicket5.setTicket_code("CODE03");
			newTicket5.setDeleted(false);
			newTicket5.setPrice(50.70);
			newTicket5.setTicketType(ttrepo.findById((long) 4).orElse(new TicketType()));
			newTicket5.setEventRecord(erepo.findById((long) 2).orElse(new EventRecord()));
			newTicket5.setSalesEvent(srepo.findById((long) 5).orElse(new SalesEvent()));
			tickets.save(newTicket5);
			Ticket newTicket6 = new Ticket();
			newTicket6.setTicket_code("CODE03");
			newTicket6.setDeleted(false);
			newTicket6.setPrice(50.70);
			newTicket6.setTicketType(ttrepo.findById((long) 9).orElse(new TicketType()));
			newTicket6.setEventRecord(erepo.findById((long) 4).orElse(new EventRecord()));
			newTicket6.setSalesEvent(srepo.findById((long) 6).orElse(new SalesEvent()));
			tickets.save(newTicket6);

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
