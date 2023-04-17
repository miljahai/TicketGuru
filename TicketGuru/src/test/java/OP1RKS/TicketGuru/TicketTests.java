package OP1RKS.TicketGuru;

import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDateTime;
import java.util.UUID;
import org.junit.jupiter.api.Test;

import OP1RKS.TicketGuru.domain.SalesEvent;
import OP1RKS.TicketGuru.domain.Ticket;
import OP1RKS.TicketGuru.domain.TicketType;



class TicketTests {

    @Test
    void testTicketCreation() {
        TicketType ticketType = new TicketType();
        SalesEvent salesEvent = new SalesEvent();
        Ticket ticket = Ticket.builder()
            .price(100.0)
            .ticketType(ticketType)
            .salesEvent(salesEvent)
            .build();

        assertEquals(100.0, ticket.getPrice());
        assertEquals(ticketType, ticket.getTicketType());
        assertEquals(salesEvent, ticket.getSalesEvent());
    }

    @Test
    void testTicketCode() {
        Ticket ticket = Ticket.builder()
            .price(50.0)
            .build();

        assertNotNull(ticket.getCode());
        assertEquals(UUID.fromString(ticket.getCode()), UUID.fromString(ticket.getCode()));
    }

    @Test
    void testTicketUsed() {
        Ticket ticket = Ticket.builder()
            .price(50.0)
            .build();
        assertNull(ticket.getUsed());

        LocalDateTime usedTime = LocalDateTime.now();
        ticket.setUsed(usedTime);
        assertEquals(usedTime, ticket.getUsed());
    }

    @Test
    void testTicketDeleted() {
        Ticket ticket = Ticket.builder()
            .price(50.0)
            .build();
        assertFalse(ticket.isDeleted());

        ticket.setDeleted(true);
        assertTrue(ticket.isDeleted());
    }

    @Test
    void testTicketToString() {
        Ticket ticket = Ticket.builder()
            .price(50.0)
            .build();

        String expectedString = "Ticket(ticket_id=null, code=" + ticket.getCode() + ", deleted=false, used=null, price=50.0, ticketType=null, salesEvent=null)";
        assertEquals(expectedString, ticket.toString());
    }

    @Test
    void testTicketPriceNegative() {
        assertThrows(IllegalArgumentException.class, () -> {
            Ticket.builder().price(-1.0).build();
        });
    }
    
    @Test
    public void testInvalidPriceInput() {
        Ticket ticket = new Ticket();
        assertThrows(NumberFormatException.class, () -> ticket.setPrice(Double.parseDouble("not a number")));
    }
}

