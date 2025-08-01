import { useSessionsFilterSort } from "../../dashboard/hooks/sessions/useSessionsFilterSort";
import SessionsList from "../components/SessionsList";
import { FilterSort } from "../../../shared/ui/FilterSort";



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

export default function SessionsPage() {
    const {sort, filter,handleSortChange} = useSessionsFilterSort();




    return (
        <>
        <FilterSort
            options={sortOptions}
            selectedOption={sort}
            onOptionChange={handleSortChange}
            label="Sort by"
           
        />
     <SessionsList  filter={filter} sort={sort}  />
        </>
    );
}
