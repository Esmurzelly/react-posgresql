import React, {useState, useEffect} from 'react';
import { Box } from '@mui/system';
import {DataGrid} from '@mui/x-data-grid';
import '../App.css'

const Table = () => {
  const [merchants, setMerchants] = useState(false);

  const columns = [
    {
      field: 'id',
      headerName: 'id',
      width: 110,
      editable: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 150,
        editable: true,
    },
    {
        field: 'image',
        headerName: 'Image',
        width: 110,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'minamount',
        headerName: 'Minamount',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'packamount',
        headerName: 'Packamount',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'typelength',
        headerName: 'Typelength',
        width: 110,
        editable: true,
    },
];

  useEffect(() => {
    getMerchant();
  }, []);

  function getMerchant() {
      fetch('http://localhost:3001')
        .then(response => response.json())
        .then(data => {
          setMerchants(data)
        })
    }

  function createMerchant() {
    let id = prompt('Enter id');
    let name = prompt('Enter name');
    let type = prompt('Enter type');
    let image = prompt('Enter image');
    let price = prompt('Enter price');
    let amount = prompt('Enter amount');
    let minAmount = prompt('Enter minAmount');
    let packAmount = prompt('Enter packAmount');
    let typeLength = prompt('Enter typeLength');

    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, name, type, image, price, amount, minAmount, packAmount, typeLength}),
    })
    .then(response =>  response.json()
    )
    .then(data => {
      alert(data);
      getMerchant();
    })
  }

  function deleteMerchant() {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getMerchant();
      });
  }

  function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

    return ( 
    <div>
      {/* {merchants ? merchants : "There is no merchant data available"} */}

      {/* {Object.values(merchants).map((item, index) =>
          <ul key={index} className='ul-list'>
            <li className='li-list'>
              <span>{item.name}</span>
              <span>{item.type}</span>
              <span>{item.image}</span>
              <span>{item.price}</span>
              <span>{item.amount}</span>
              <span>{item.minamount}</span>
              <span>{item.packamount}</span>
              <span>{item.typelength}</span>             
            </li>
            
          </ul>
        )} */}

        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid
                rows={Object.values(merchants)}
                getRowId={(row) =>  generateRandom()}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
      <br/>

      {/* <button onClick={createMerchant}>Add merchant</button>
      <br/>
      <button onClick={deleteMerchant}>Delete merchant</button> */}
    </div>
    );
}
 
export default Table;