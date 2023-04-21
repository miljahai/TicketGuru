import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

function TicketTypes(props) {
    return (
        <Box>
            {
                props.tickettypes.map(tickettypes => {
                    return (
                        <Card key={tickettypes.ticket_type_id}>
                            <CardContent>
                                <Typography>Tapahtuma: {tickettypes.eventRecord.eventrecord_name}</Typography>
                                <Typography>Lipputyyppi: {tickettypes.name}</Typography>
                                <Typography>Hinta: {tickettypes.price}</Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Box>
    )
}
export default TicketTypes;