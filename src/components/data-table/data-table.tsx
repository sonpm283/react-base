import React from "react";

interface IDataTableProps {
  children: React.ReactNode;
}

const DataTable: React.FC<IDataTableProps> = ({ children }) => {
  return <table className="data-table">{children}</table>;
};

export default DataTable;
