import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Pagination from './Pagination';

const TableSecond = () => {
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [materialsPerPage] = useState(10);

    const columns = [
        {label: 'id', accessor: 'id'},
        {label: 'name', accessor: 'name'},
        {label: 'type', accessor: 'type'},
        {label: 'image', accessor: 'image'},
        {label: 'price', accessor: 'price'},
        {label: 'amount', accessor: 'amount'},
        {label: 'minamount', accessor: 'minamount'},
        {label: 'packamount', accessor: 'packamount'},
        {label: 'typelength', accessor: 'typelength'},
    ]

    const BASE_URL = 'http://localhost:3001';

    const fetchAllItems = async () => {
        const response = await fetch(BASE_URL);
        return await response.json();
    }

    useEffect(() => {
        fetchAllItems().then(res => setTableData(res));
    }, []);

    const handleSorting = (sortField, sortOrder) => {
        if(sortField) {
            const sorted = [...tableData].sort((a,b) => {
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === 'asc' ? 1 : -1)
                )
            })
            setTableData(sorted)
        }
    };

    const lastMaterialIndex = currentPage * materialsPerPage;
    const firstMaterialIndex = lastMaterialIndex - materialsPerPage;
    const currentMaterial = tableData.slice(firstMaterialIndex, lastMaterialIndex);

    const paginate = pageNumber => {setCurrentPage(pageNumber)}
    
    const nextPage = () => setCurrentPage(prev => prev + 1);
    const prevPage = () => setCurrentPage(prev => prev - 1)

    return ( 
        <>
            <table className='table'>
                <TableHead columns={columns} handleSorting={handleSorting}/>
                <TableBody columns={columns} tableData={tableData} materials={currentMaterial}/>
            </table>
            
            <Pagination
                materialsPerPage={materialsPerPage}
                totalMaterials={tableData.length}
                paginate={paginate}
            />

            <button className='btn btn-primary' onClick={prevPage}>Prev Page</button>
            <button className='btn btn-primary ms-2' onClick={nextPage}>Next Page</button>
        </>
     );
}
 
export default TableSecond;