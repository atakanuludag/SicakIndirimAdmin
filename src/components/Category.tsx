import React, {useState, useEffect } from 'react';
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import CategoryService from "../services/CategoryService";
import CategoryItem from "../models/CategoryItem";
import MUIDataTableLang from "../utils/MUIDataTableLang";


const Category: React.FC = () => {


  const service = new CategoryService();
  const [items, setItems] = useState<CategoryItem[]>(new Array<CategoryItem>());

  useEffect(() => {
    const getItems = async () => {
      const result = await service.getItems();
      setItems(result);
    }
    getItems();
  }, []);

  console.log(items);
  

  const columns: MUIDataTableColumnDef[] = [
    {
     name: "title",
     label: "Kategori",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "description",
     label: "Açıklama",
     options: {
      filter: true,
      sort: false,
     }
    }
   ];
  

  return (
    <>
     <MUIDataTable
      title={"Kategori Listesi"}
      data={items}
      columns={columns}
      options={MUIDataTableLang()}
    />
    </>
  );


}


export default Category;