import React from 'react'

const TableBody = ({tableData, columns, materials}) => {
    return ( 
        <tbody>
            {materials.map((data) => {
                return (
                    <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.name}</td> 
                        <td>{data.type}</td>
                        <td>{data.image}</td>
                        <td>{data.price}</td>
                        <td>{data.amount}</td>
                        <td>{data.minamount}</td>
                        <td>{data.packamount}</td>
                        <td>{data.typelength}</td>
                    </tr>
                )
            })}
        </tbody>
     );
}
 
export default TableBody;