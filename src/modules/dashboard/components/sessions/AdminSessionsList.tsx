import EmptyContent from "../../../../shared/ui/EmptyContent";
import Spinner from "../../../../shared/ui/Spinner";
import { useGetSessions } from "../../../sessions/hooks/useGetSessions";
import ManageSessionsTable from "../tables/manageSessionsTable";
import { FilterSort } from "../../../../shared/ui/FilterSort";
import { useState } from "react";
import Button from "../../../../shared/ui/Button";
import { FaPlus } from "react-icons/fa";


const filterOptions= [
    { label: "All", value: "all" },
    { label: "Beginner", value: "beginner" },
    { label: "Advanced", value: "advanced" }
  ];

const sortOptions = [
  { label: "Newest", value: "date_desc" },
  { label: "Oldest", value: "date_asc" },
  { label: "Title A-Z", value: "title_asc" },
  { label: "Title Z-A", value: "title_desc" },
  { label: "Duration ↑", value: "duration_asc" },
  { label: "Duration ↓", value: "duration_desc" }
];




export default function AdminSessionsList (){
  
  
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date_desc");
  const {data: sessionsList, isLoading, error} = useGetSessions(filter, sort)

    const handleFilterChange = (value: string) => {
        setFilter(value);
        console.log("Filter changed to:", value);
    }

    const handleSortChange = (value: string) => {
        setSort(value);
        console.log("Sort changed to:", value);
    }

  if(isLoading) return <Spinner/>

  if(error) return <EmptyContent message="error loading session"  />

  return (
      <>
      <div>
        <h2>Available Sessions</h2>
      </div>

  <div className="flex-between">

   <div className="flex-between  flex-between__margin">

      <FilterSort
        options={filterOptions}
        selectedOption={filter}
        onOptionChange={handleFilterChange}
        />
        <FilterSort
        options={sortOptions}
        selectedOption={sort}
        onOptionChange={handleSortChange}
        />
    </div>
         <Button to="/dashboard/sessions/add-session">
                  Create <FaPlus />
                </Button>
        
      </div>
      <ManageSessionsTable  sessions={sessionsList ?? []}/>
      </>
      
       
  )

}