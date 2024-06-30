import React, { useState } from 'react';
import { Table, Pagination } from '@mantine/core';

const AgricultureTable = ({ data, headers }) => {
  const rowsPerPage = 12;
  const [activePage, setPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <>
      <Table highlightOnHover withTableBorder withColumnBorders >
        <Table.Thead>
          <Table.Tr>
            {headers.map((header, index) => (
              <Table.Th key={index} fz="md" style={{ textAlign: 'center' }}>{header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedData.map((row, index) => (
            <Table.Tr key={index}>
              {row.map((cell, cellIndex) => (
                <Table.Td key={cellIndex} fz="md" style={{ textAlign: 'center' }}>{cell}</Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Pagination
        value={activePage}
        onChange={setPage}
        total={totalPages}
        position="center"
        mt="md"
        mb="md"
        style={{display:"flex", justifyContent:"center", alignItems:"center"}}
      />
    </>
  );
};

export default AgricultureTable;
