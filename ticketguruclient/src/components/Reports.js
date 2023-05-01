import { useState, useRef } from 'react'
import { useUser } from '../UserProvider'
import jwt_decode from "jwt-decode";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import { Box } from "@mui/material";


export default function Reports(props) {

    const user = useUser();
    const tickets = props.tickets;

    // Grid Configuration
    const gridRef = useRef();
    const columns = [
        { headerName: 'Id', field: 'ticket_id', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true },
        { headerName: 'Sales event', field: 'salesEvent.salesevent_id', sortable: true, filter: true },
        { headerName: 'Sale date', field: 'salesEvent.sale_date', sortable: true, filter: true },
        { headerName: 'Event', field: 'ticketType.eventRecord.eventrecord_name', sortable: true, filter: true },
        { headerName: 'Ticket type', field: 'ticketType.name', sortable: true, filter: true }



    ];
    const defaultColDef = {
        cellStyle: () => ({ display: 'flex', alignItems: 'left', justifyContent: 'left' })
    };
    return (
        <Box>
            <div className="ag-theme-alpine" style={{height: '700px', width: '100%', margin: 'auto'}}>

                <AgGridReact
                    ref={gridRef}
                    onGridkey={params => gridRef.current = params.api}
                    columnDefs={columns}
                    rowData={tickets}
                    animateRows={true}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationAutoPageSize={true}
                ></AgGridReact>

            </div>
        </Box>
    )
} 