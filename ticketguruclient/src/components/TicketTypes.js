import { Box, } from "@mui/material";
import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TicketTypes(props) {

    const gridRef = useRef();
    const columns = [
        { headerName: 'Tapahtuma', field: 'eventRecord.eventrecord_name', sortable: true, filter: true, floatingFilter: true, checkboxSelection: true },
        { headerName: 'Lipputyyppi', field: 'name', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Hinta', field: 'price', sortable: true, filter: true, floatingFilter: true }
    ];
    const defaultColDef = {
        cellStyle: () => ({ display: 'flex', alignItems: 'left', justifyContent: 'left' })
    };

    const saveTickettype = (tickettype) => {
        console.log('not yet implemented')
    }

    const editTicketype = (link, tickettype) => {
        console.log('not yet implemented')
    }

    const deleteTickettype = () => {
        console.log('not yet implemented')
    }


    return (

        <Box>
            <div className='ag-theme-material' style={{ height: '80vmin', width: '80vmin' }}>
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
                >
                </AgGridReact>
            </div>
        </Box>
    )
}
export default TicketTypes;