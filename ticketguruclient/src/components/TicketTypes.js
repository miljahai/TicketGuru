import { Box, Typography, Button } from "@mui/material";
import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import axios from "axios";
import { ArrowBack, Delete } from '@mui/icons-material';
import AddTicketTypes from './AddTicketTypes';
import { useUser } from '../UserProvider';
import jwt_decode from "jwt-decode";

function TicketTypes(props) {
    const user = useUser();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (user && user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            setRoles(decodedJwt.authorities);
        }
    }, [user, user.jwt]);


    const deleteTickettype = () => {
        // Delete selected TicketType
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
                    console.log(`TicketType ${selected[0].data.ticket_type_id} deleted: ` + response);
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


    const saveTickettype = (tickettype) => {
        // Save a new tickettype
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


    const editTickettype = (value) => {
        // Edit Tickettype
        // Editing eventrecord_name is not allowed. 
        // Build link and body for value update call
        const link = 'http://localhost:8080/tickettypes/' + value.data.ticket_type_id
        const body = JSON.stringify(value.data)

        // Call PUT to server
        Promise.all([
            axios.put(
                link,
                body,
                {
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
        ]).then((response) => {
            console.log('TicketType changed: ', response[0].data);
        }).catch(error => {
            console.log('Error updating TicketType: ', error)
        });
    }

    // Grid Configuration
    const gridRef = useRef();
    const columns = [
        { headerName: 'Tapahtuma', field: 'eventRecord.eventrecord_name', sortable: true, filter: true, checkboxSelection: true },
        { headerName: 'Lipputyyppi', field: 'name', sortable: true, filter: true, editable: true },
        {
            headerName: 'Hinta',
            field: 'price',
            sortable: true,
            editable: true,
            filter: 'agNumberColumnFilter'
        }
    ];
    const defaultColDef = {
        cellStyle: () => ({ display: 'flex', alignItems: 'left', justifyContent: 'left' })
    };


    return (
        <Box>
            <Typography variant='body2' sx={{ p: 0, textAlign: 'left' }}>
                {roles && roles.filter((role) => role === "ADMIN" || role === "EVENT").length > 0 ? (
                    <>
                        <AddTicketTypes saveTickettype={saveTickettype} user={props.user} />
                        <Button onClick={deleteTickettype} variant="contained" color='error' sx={{ m: 1 }}><Delete />Poista valittu</Button>
                    </>
                ) : (
                    <></>
                )}

            </Typography>

            <div className='ag-theme-material' style={{ height: '50vmin', width: '40rem' }}>
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
                    enableCellChangeFlash={true}
                    onCellValueChanged={(event) => editTickettype(event)}
                >
                </AgGridReact>
            </div>
        </Box>
    )
}

export default TicketTypes;