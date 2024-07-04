import  DataTable  from "../ui/table";

function Table() {
  const data = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
  ];

  const columns = [
    { header: "Sr.no", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Age", accessor: "age" },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default Table;
