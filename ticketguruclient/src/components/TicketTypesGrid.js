import { Box, Button } from "@mui/material";
import React, { useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import axios from "axios";
import { useUser } from '../util/UserProvider';
import { Delete } from '@mui/icons-material';
import jwt_decode from "jwt-decode";

export default function TicketTypesGrid(props) {
    const user = useUser();
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        if (user && user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            setRoles(decodedJwt.authorities);
        }
    }, [user, user.jwt]);

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

    /*const refreshGrid = () => {
        gridRef.current.api.refreshCells();
    }*/

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
                    console.log(`TicketType ${selected[0].data.ticket_type_id} deleted: ` + response[0]);
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

    // Grid Configuration
    const gridRef = useRef();
    const columns = [
        { headerName: 'Tapahtuma', field: 'eventRecord.eventrecord_name', sortable: true, filter: true, checkboxSelection: true, sort: 'asc', resizable: true, minWidth: 400 },
        { headerName: 'Lipputyyppi', field: 'name', sortable: true, filter: true, editable: true, resizable: true, minWidth: 300 },
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
            {roles && roles.filter((role) => role === "ADMIN" || role === "EVENTS").length > 0 ? (
                <>
                    <Button onClick={deleteTickettype} variant="contained" color='error' sx={{ m: 1 }}><Delete />Poista valittu</Button>
                </>
            ) : (
                <></>
            )}
            <div className='ag-theme-material' style={{ height: '50vmin', width: '60rem' }}>
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