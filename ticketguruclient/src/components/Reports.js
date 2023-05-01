import { useRef } from 'react';
//import { useUser } from '../util/UserProvider';
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from "@mui/material";



export default function Reports(props) {

    //const user = useUser();
    const tickets = props.tickets;

    // Grid Configuration
    const gridRef = useRef();
    const gridOptions = {
     columnDefs : [
        { headerName: 'Id', field: 'ticket_id', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true, enableValue: true, aggFunc: 'sum'},
        { headerName: 'Sales event', field: 'salesEvent.salesevent_id', sortable: true, filter: true },
        { headerName: 'Sale date', field: 'salesEvent.sale_date', sortable: true, filter: 'agDateColumnFilter'},
        { headerName: 'Event', field: 'ticketType.eventRecord.eventrecord_name', sortable: true, filter: true },
        { headerName: 'Ticket type', field: 'ticketType.name', sortable: true, filter: true },
        
    ],

     defaultColDef : {
        cellStyle: () => ({ display: 'flex', alignItems: 'left', justifyContent: 'left' })
    },
}

   // function onExport() {
       // gridOptions.api.exportDataAsExcel();
    //  }
      
    return (
        <Box>
            <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>

                <AgGridReact
                    gridOptions={gridOptions}
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowData={tickets}
                    animateRows={true}
                    pagination={true}
                    paginationAutoPageSize={true}
                    groupIncludeTotalFooter={true}
                ></AgGridReact>
            </div>
        
        </Box>
    )
}
