import { TextField, InputAdornment,  } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ReactNode } from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  rows?: number;
};

export default function InputField({
  label,
  value,
  onChange,
  multiline = false,
  rows = 1,
}: InputFieldProps) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      multiline={multiline}
      rows={rows}
      sx={{ mb: 3, width: "83vw"}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
             <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
