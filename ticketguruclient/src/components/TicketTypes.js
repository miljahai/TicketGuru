import { Box, Typography, Button } from "@mui/material";
import React, { useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import axios from "axios";
import { ArrowBack, Add, Delete } from '@mui/icons-material';
import AddTicketTypes from './AddTicketTypes';
import { useUser } from '../UserProvider';

function TicketTypes(props) {

    const user = useUser();

    // Delete selected TicketType
    const deleteTickettype = () => {

        const selected = gridRef.current.api.getSelectedNodes();
        const row = gridRef.current.api.getSelectedRows();

        if (selected.length > 0) {
            if (window.confirm("Vahvista lipputyyppin poisto?")) {
                // Make a delete call to backend and set tickettype matching row deleted in database 
                Promise.all([
                    axios.delete(`http://localhost:8080/tickettypes/` + selected[0].data.ticket_type_id, {
                        headers: {
                            'Authorization': `Bearer ${props.user.jwt}`
                        }
                    })
                ]).then((response) => {
                    console.log(`TicketType ${selected[0].data.ticket_type_id} deleted: ` + response.data);
                    // Hide row from view and update client:
                    gridRef.current.api.applyTransaction({ remove: row });
                }).catch(error => {
                    console.log('Error deleting TicketType: ', error);
                });
            };
        } else {
            alert('Valitse rivi ennen poistamista');
        };
    };

    // Save a new tickettype
    const saveTickettype = (tickettype) => {
        Promise.all([
            axios.post(
                `http://localhost:8080/tickettypes`,
                tickettype,
                {
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`
                    }
                })
        ]).then((response) => {
            console.log('TicketType created: ', response[0].data);
            if (gridRef.current) {
                console.log('refreshing grid')
                // Get updated data from server
                // TODO

                // Refresh grid with new data
                gridRef.current.api.refreshCells();
            }
        }).catch(error => {
            console.log('Error creating TicketType: ', error)
        });
    };

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
                <AddTicketTypes saveTickettype={saveTickettype} user={props.user} />
                <Button onClick={deleteTickettype} variant="contained" color='error' sx={{ m: 1 }}><Delete />Poista valittu</Button>
            </Typography>

            <div className='ag-theme-material' style={{ height: '60vmin', width: '140vmin' }}>
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
                    paginationAutoPageSize={true}
                >
                </AgGridReact>
            </div>
        </Box>
    )
}

export default TicketTypes;