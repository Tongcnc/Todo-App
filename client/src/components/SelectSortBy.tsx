import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const StyledInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    width: "100px",
    borderRadius: "16px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    fontSize: 16,
    color: "#424C6B",
    fontWeight: 500,
    padding: "7.5px 14px 7.5px 14px",
  },
}));

const StyledMenuItem = styled(MenuItem)(() => ({
  "&[aria-selected='true']": {
    backgroundColor: "#585292",
    margin: 6,
    borderRadius: "12px",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#585292",
    },
  },
}));

interface SelectSortBy {
  onSortChange: (target: string) => void;
}
function SelectSortBy({ onSortChange }: SelectSortBy) {
  return (
    <div>
      <Select
        id="demo-customized-select"
        defaultValue={"All"}
        onChange={(e) => onSortChange(e.target.value)}
        input={<StyledInput />}
      >
        <StyledMenuItem value={"All"}>All</StyledMenuItem>
        <StyledMenuItem value={"Done"}>Done</StyledMenuItem>
        <StyledMenuItem value={"Undone"}>Undone</StyledMenuItem>
      </Select>
    </div>
  );
}

export default SelectSortBy;
