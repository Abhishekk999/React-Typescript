import React from 'react';
import './style.css';

type TColumn = {
    header: string;
    accessor: string;
};

type TProps = {
    data: any[];
    columns: TColumn[];
};

const DataTable: React.FC<TProps> = ({ data, columns }) => {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{row[column.accessor]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default DataTable;
