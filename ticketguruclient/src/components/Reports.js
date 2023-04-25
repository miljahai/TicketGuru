import { useState, useRef } from 'react'
import { useUser } from '../UserProvider'
import jwt_decode from "jwt-decode";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import { Box } from "@mui/material";

export default function Reports(props) {

    const user = useUser();

    // Grid Configuration
    const gridRef = useRef();
    const columns = [
        { headerName: 'Id', field: 'ticket_id', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true }
    ];
    const defaultColDef = {
        cellStyle: () => ({ display: 'flex', alignItems: 'left', justifyContent: 'left' })
    };

    return (
        <Box>
            <AgGridReact
                ref={gridRef}
                onGridkey={params => gridRef.current = params.api}
                columnDefs={columns}
                rowData={props.tickets}
                animateRows={true}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationAutoPageSize={true}
            ></AgGridReact>

        </Box>
    )
} 