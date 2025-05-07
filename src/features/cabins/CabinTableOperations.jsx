import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No-discount" },
          { value: "with-discount", label: "With-discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Name A-Z" },
          { value: "name-desc", label: "Name Z-A" },
          { value: "regularPrice-asc", label: "Lowest Price" },
          { value: "regularPrice-desc", label: "Highest Price" },
          { value: "maxCapacity-asc", label: "Lowest Capacity" },
          { value: "maxCapacity-desc", label: "Highest Capacity" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
