import { useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Reports(props) {

    const tickets = props.tickets;

    // Grid Configuration
    const gridRef = useRef();

    const gridOptions = {
        columnDefs: [
            { headerName: 'Id', field: 'ticket_id', sortable: true, filter: true, width: 80 },
            { headerName: 'Price', field: 'price', sortable: true, filter: true, width: 100 },
            { headerName: 'Salesevent', field: 'salesEvent.salesevent_id', sortable: true, filter: true, width: 100 },
            {
                headerName: 'Date', field: 'salesEvent.sale_date', sortable: true, filter: 'agDateColumnFilter', width: 100,
                cellRenderer: (data) => {
                    return data.value ? (new Date(data.value)).toLocaleDateString() : '';
                }
            },
            { headerName: 'Final price', field: 'salesEvent.final_price', sortable: true, filter: true, width: 150 },
            { headerName: 'Event', field: 'ticketType.eventRecord.eventrecord_name', sortable: true, filter: true, width: 150 },
            { headerName: 'Ticket type', field: 'ticketType.name', sortable: true, filter: true, width: 150 },
            { headerName: 'Myyjä nimi', field: 'salesEvent.appUser.firstname', sortable: true, filter: true, width: 150 },
            { headerName: 'Myyjä ID', field: 'salesEvent.appUser.appuser_id', sortable: true, filter: true }
        ],

    }
    const defaultColDef = {
        cellStyle: () => ({ display: 'flex', alignItems: 'left', justifyContent: 'left' })
    }

    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);

    return (
        <Box>
            <div>
                <Button onClick={onBtExport}>Export AS CSV</Button>
            </div>
            <div className="ag-theme-material" style={{ height: '900px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    //onGridReady={params => gridRef.current = params.api
                    gridOptions={gridOptions}
                    defaultColDef={defaultColDef}
                    ref={gridRef}
                    rowData={tickets}
                    animateRows={true}
                    pagination={true}
                    paginationAutoPageSize={true}
                ></AgGridReact>
            </div>
        </Box>
    )
}

