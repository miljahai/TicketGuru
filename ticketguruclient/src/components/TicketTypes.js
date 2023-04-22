import { Box, Typography, Button } from "@mui/material";
import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import axios from "axios";
import { ArrowBack, Add, Delete } from '@mui/icons-material';

function TicketTypes(props) {

    // Delete selected TicketType
    const deleteTickettype = () => {

        const selected = gridRef.current.api.getSelectedNodes();
        const row = gridRef.current.api.getSelectedRows();

        if (selected.length > 0) {
            if (window.confirm("Vahvista lipputyyppin poisto?")) {
                gridRef.current.api.applyTransaction({ remove: row });
                Promise.all([
                    axios.delete(`http://localhost:8080/tickettypes/` + selected[0].data.ticket_type_id, {
                        headers: {
                            'Authorization': `Bearer ${props.user.jwt}`
                        }
                    })
                ]).then(([res]) => {
                    console.log(`TicketType ${selected[0].data.ticket_type_id} deleted: ` + res.data);
                }).catch(error => {
                    console.log('Error deleting TicketType: ', error);
                });
            };
        } else {
            alert('Valitse rivi ennen poistamista');
        };
    };

    // Todo: Add Tickettype
    const saveTickettype = (tickettype) => {
        console.log('not yet implemented')
    }

    // Todo: Edit Tickettype
    const editTicketype = (tickettype) => {
        console.log('not yet implemented')
    }

    // Grid Configuration
    const gridRef = useRef();
    const columns = [
        { headerName: 'Tapahtuma', field: 'eventRecord.eventrecord_name', sortable: true, filter: true, editable: true, checkboxSelection: true },
        { headerName: 'Id', field: 'ticket_type_id', sortable: true, filter: true },
        { headerName: 'Lipputyyppi', field: 'name', sortable: true, filter: true, editable: true },
        { headerName: 'Hinta', field: 'price', sortable: true, filter: true, editable: true },
        { headerName: 'Muokkaa' }
    ];
    const defaultColDef = {
        cellStyle: () => ({ display: 'flex', alignItems: 'left', justifyContent: 'left' })
    };


    return (

        <Box>

            <Typography variant='body2' sx={{ p: 0, textAlign: 'left' }}>
                <Button href='../tapahtumat' variant="outlined" sx={{ m: 1 }}><ArrowBack />Tapahtumat</Button>
                <Button href='#' variant="contained" sx={{ m: 1 }}><Add />Lisää lipputyyppi</Button>
                <Button onClick={deleteTickettype} variant="contained" color='error' sx={{ m: 1 }}><Delete />Poista valittu</Button>
            </Typography>

            <div className='ag-theme-material' style={{ height: '80vmin', width: '140vmin' }}>
                <div style={{ display: 'flex' }}>

                </div>
                <AgGridReact
                    ref={gridRef}
                    onGridkey={params => gridRef.current = params.api}
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={props.tickettypes}
                    animateRows={true}
                    defaultColDef={defaultColDef}
                    pagination={true}
                >
                </AgGridReact>
            </div>
        </Box>
    )
}

export default TicketTypes;