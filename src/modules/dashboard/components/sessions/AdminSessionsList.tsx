import EmptyContent from "../../../../shared/ui/EmptyContent";
import Spinner from "../../../../shared/ui/Spinner";
import { useGetSessions } from "../../../sessions/hooks/useGetSessions";
import ManageSessionsTable from "../tables/manageSessionsTable";
import { FilterSort } from "../../../../shared/ui/FilterSort";
import Button from "../../../../shared/ui/Button";
import { FaPlus } from "react-icons/fa";
import { useSessionsFilterSort } from "../../hooks/sessions/useSessionsFilterSort";
import { MultiCheckBoxFilter } from "../../../../shared/ui/MultiCheckBoxFilter";
import { DropDownMenu } from "../../../../shared/ui/DropDownMenu";
import { AppRoute } from "../../../../app/enums/routes";



const filterOptions= ["beginner", "intermediate", "advanced"];

const sortOptions = [
  { label: "Newest", value: "date_desc" },
  { label: "Oldest", value: "date_asc" },
  { label: "Title A-Z", value: "title_asc" },
  { label: "Title Z-A", value: "title_desc" },
  { label: "Duration ↑", value: "duration_asc" },
  { label: "Duration ↓", value: "duration_desc" }
];




export default function AdminSessionsList (){
  const {filters,sort,handleFilterChange,handleSortChange} = useSessionsFilterSort();
  const {data: sessionsList, isLoading, error} = useGetSessions(filters, sort)


  if(isLoading) return <Spinner/>

  if(error) return <EmptyContent message="error loading session"  />

  return (
      <>
      <div>
        <h2>Available Sessions</h2>
      </div>

  <div className="flex-between">

   <div className="flex-between  flex-between__margin">
  
      
       <MultiCheckBoxFilter
        options={filterOptions}
        selectedOptions={filters.level}
        onOptionChange={handleFilterChange}
        label="Filter by Level"
        />
  

        <FilterSort
        options={sortOptions}
        selectedOption={sort}
        onOptionChange={handleSortChange}
        />
    </div>
         <Button to={AppRoute.AddSession} >
                  Create <FaPlus />
                </Button>
        
      </div>
      <ManageSessionsTable  sessions={sessionsList ?? []}/>
      </>
      
       
  )

}